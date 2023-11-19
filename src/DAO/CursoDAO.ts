import { Curso } from "../Entidades/Curso";
import { IDAO } from "./IDAO";
import Conexao from "./Conexao";
import { StatusCurso } from "../ENUM/StatusCurso";
import { Professor } from "../Entidades/Professor";
import { Aluno } from "../Entidades/Aluno";
import { ProfessorDAO } from "./ProfessorDAO";
import { AlunoDAO } from "./AlunoDAO";

export class CursoDAO implements IDAO<Curso> {
  private conexao: Conexao;

  constructor(conexao: Conexao) {
    this.conexao = conexao;
  }
  async cadastrar(t: Curso): Promise<Curso> {
    const professorDAO = new ProfessorDAO(this.conexao);
    const professorCadastrado = await professorDAO.retonrnaPorEmail(
      t.getProfessor()
    );

    let professor;
    if (professorCadastrado?.getId()) {
      professor = professorCadastrado;
    } else {
      professor = await professorDAO.cadastrar(t.getProfessor());
    }

    const porfExistente = await professorDAO.buscarPorId(professor.getId());
    const insert = `INSERT INTO curso (nome, carga_horaria, status, id_professor) VALUES ($1, $2, $3, $4) RETURNING *`;

    try {
      const client = await Conexao.getConexao();
      if (!client) {
        throw new Error("Não foi possível conectar ao banco de dados");
      }

      const values = [
        t.getNome(),
        t.getCargaHoraria(),
        t.getStatusAsString(),
        professor.getId(),
      ];
      const res = await this.conexao.query(insert, values);

      if (res && res[0]) {
        return new Curso(
          res[0].nome,
          res[0].carga_horaria,
          res[0].status,
          res[0].id_professor,
          res[0].id
        );
      } else {
        throw new Error("Não foi possível cadastrar o curso");
      }
    } catch (err) {
      console.log("Erro ao cadastrar curso", err);
      throw err;
    }
  }
  async buscarTodos(): Promise<Curso[]> {
    const select = "SELECT * FROM curso";

    try {
      const client = await this.conexao.query(select, []);

      if (client) {
        const cursos: Curso[] = client.map((p: any) => {
          const status =
            p.status === "ATIVO" ? StatusCurso.ATIVO : StatusCurso.INATIVO;

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
      "UPDATE curso SET nome = $1, carga_horaria = $2, status = $3, id_professor = $4 WHERE id = $5 RETURNING *";

    try {
      const values = [
        dados.getNome(),
        dados.getCargaHoraria(),
        dados.getStatusAsString(),
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
  ): Promise<[Curso | null, Aluno | null]> {
    if (!Curs || !Alun) {
      throw new Error("Curso ou Aluno não cadastrados");
    }
    const alunoDAO = new AlunoDAO(this.conexao);
    const insert = `INSERT INTO curso_aluno (id_curso,id_aluno,nota1,nota2,nota3,media,situacao) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *`;

    try {
      const alunoCadastrado = await alunoDAO.cadastrar(Alun);
      const media = (notas[0] + notas[1] + notas[2]) / 3;
      let situação: string =
        media >= 7 ? "Aprovado" : media >= 5 ? "Recuperacao" : "Reprovado";
      const values = [
        Curs.getId(),
        alunoCadastrado.getId(),
        notas[0],
        notas[1],
        notas[2],
        media,
        situação,
      ];
      const res = await this.conexao.query(insert, values);
      if (!res || !res[0]) {
        return [null, null];
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
        res[0].formacao,
        res[0].id
      );
      return [curso, aluno];
    } catch (err) {
      console.log("Erro ao criar tabela curso_aluno", err);
      return [null, null];
    }
  }
}
