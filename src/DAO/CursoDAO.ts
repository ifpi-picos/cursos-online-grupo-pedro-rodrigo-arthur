import { Curso } from "../Entidades/Curso";
import { IDAO } from "./IDAO";
import Conexao from "./Conexao";
import { StatusCurso } from "../ENUM/StatusCurso";
import { Aluno } from "../Entidades/Aluno";
import { ProfessorDAO } from "./ProfessorDAO";
import { AlunoDAO } from "./AlunoDAO";
import { Professor } from "../Entidades/Professor";

export class CursoDAO implements IDAO<Curso> {
  private conexao: Conexao;

  constructor(conexao: Conexao) {
    this.conexao = conexao;
  }
  async cadastrar(t: Curso): Promise<Curso | null> {
    const insert =
      "INSERT INTO curso (nome, carga_horaria, status, id_professor) VALUES ($1, $2, $3,$4) RETURNING *";

    try {
      const status = t.getStatus() === 1 ? "ABERTO" : "FECHADO";
      const values = [
        t.getNome(),
        t.getCargaHoraria(),
        status,
        t.getProfessor(),
      ];
      const res = await this.conexao.query(insert, values);
      if (res && res[0]) {
        const curso = new Curso(
          res[0].nome,
          res[0].carga_horaria,
          res[0].status,
          res[0].idProfessor,
          res[0].id
        );
        return curso;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Erro ao cadastrar curso", err);
      return null;
    }
  }
  async buscarTodos(): Promise<Curso[]> {
    const select = "SELECT * FROM curso";

    try {
      const client = await this.conexao.query(select, []);

      if (client) {
        const cursos: Curso[] = client.map((p) => {
          const status =
            p.status === "ABERTO" ? StatusCurso.ABERTO : StatusCurso.FECHADO;

          return new Curso(
            p.nome,
            p.carga_horaria,
            status,
            p.id_professor,
            p.id
          );
        });
        return cursos;
      } else {
        return [];
      }
    } catch (err) {
      console.log("Erro na consulta de todos os cursos", err);

      return [];
    }
  }
  async atualizar(id: number, dados: Curso): Promise<Curso> {
    const update =
      "UPDATE curso SET nome = $1, carga_horaria = $2, status = $3 WHERE id = $4 RETURNING *";

    try {
      const values = [
        dados.getNome(),
        dados.getCargaHoraria(),
        dados.getStatus(),
        id,
      ];
      const res = await this.conexao.query(update, values);
      return res && res[0] ? (res[0] as Curso) : dados;
    } catch (err) {
      console.log("Erro na atualização do curso", err);
      return dados;
    }
  }
  async deletar(id: number): Promise<Curso | null> {
    const deletar = "DELETE FROM curso WHERE id = $1 RETURNING *";

    try {
      const values = [id];
      const res = await this.conexao.query(deletar, values);

      return res && res[0] ? (res[0] as Curso) : null;
    } catch (err) {
      console.log("Erro ao deletar curso", err);
      return null;
    }
  }
  async buscarPorId(id: number): Promise<Curso | null> {
    const select = "SELECT * FROM curso WHERE id = $1";

    try {
      const values = [id];
      const res = await this.conexao.query(select, values);

      return res && res[0]
        ? new Curso(
            res[0].nome,
            res[0].carga_horaria,
            res[0].status,
            res[0].id_professor,
            res[0].id
          )
        : null;
    } catch (err) {
      console.log("Erro na consulta do curso por id", err);
      return null;
    }
  }

  async criarTabelaCursoAluno(
    Curs: Curso,
    Alun: Aluno,
    notas: number[]
  ): Promise<[Curso, Aluno]> {
    if (!Curs || !Alun) {
      throw new Error("Curso ou Aluno não cadastrados");
    }
    const insert = `INSERT INTO curso_aluno (id_curso,id_aluno,nota1,nota2,nota3,media,situacao) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *`;

    try {
      const media = (notas[0] + notas[1] + notas[2]) / 3;
      let situação: string =
        media >= 7 ? "Aprovado" : media >= 5 ? "Recuperacao" : "Reprovado";
      const values = [
        Curs.getId(),
        Alun.getId(),
        notas[0],
        notas[1],
        notas[2],
        media,
        situação,
      ];
      const res = await this.conexao.query(insert, values);
      if (!res || !res[0]) {
        return [Curs, Alun];
      }
      const curso = new Curso(
        res[0].nome,
        res[0].carga_horaria,
        res[0].status,
        res[0].id_professor
      );
      const aluno = new Aluno(
        res[0].nome,
        res[0].email,
        res[0].telefone,
        res[0].status,
        res[0].senha,
        res[0].id
      );
      return [curso, aluno] as [Curso, Aluno];
    } catch (err) {
      console.log("Erro ao criar tabela curso_aluno", err);
      return [Curs, Alun];
    }
  }

  async buscarCursoProfessor(idProfessor: Professor): Promise<Curso[]> {
    const select = `SELECT * FROM curso WHERE id_professor = $1`;

    try {
      const values = [idProfessor.getId()];
      const res = await this.conexao.query(select, values);
      return res && res.length > 0
        ? res.map(
            (curso: any) =>
              new Curso(
                curso.nome,
                curso.carga_horaria,
                curso.status,
                curso.id_professor,
                curso.id
              )
          )
        : [];
    } catch (err) {
      console.log("Erro na consulta do curso por id do professor", err);
      return [];
    }
  }
}
