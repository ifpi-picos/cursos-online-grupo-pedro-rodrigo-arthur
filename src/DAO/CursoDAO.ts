import { Curso } from "../Entidades/Curso";
import { IDAO } from "./IDAO";
import Conexao from "./Conexao";
import { StatusCurso } from "../ENUM/StatusCurso";
import { Professor } from "../Entidades/Professor";
import { Aluno } from "../Entidades/Aluno";

export class CursoDAO implements IDAO<Curso> {
  private conexao: Conexao;

  constructor(conexao: Conexao) {
    this.conexao = conexao;
  }
  async cadastrar(t: Curso): Promise<Curso> {
    const insert = `INSERT INTO curso (nome,carga_horaria,status) VALUES ($1, $2, $3) RETURNING *`;
    try {
      const client = await Conexao.getConexao();
      if (!client) {
        throw new Error("Não foi possível conectar ao banco de dados");
      }

      const values = [t.getNome(), t.getCargaHoraria(), t.getStatusAsString()];
      const res = await this.conexao.query(insert, values);

      if (res && res[0]) {
        return new Curso(
          res[0].nome,
          res[0].carga_horaria,
          res[0].status,
          res[0].id
        );
      } else {
        throw new Error("Não foi possível cadastrar o curso");
      }
    } catch (err) {
      console.log("Erro ao cadastrar curso", err);
      return t;
    }
  }
  async buscarTodos(): Promise<Curso[]> {
    const select = "SELECT * FROM curso";

    try {
      const client = await this.conexao.query(select, []);

      if (client) {
        return client.map((p: any) => {
          const status =
            p.status === "ATIVO" ? StatusCurso.ATIVO : StatusCurso.INATIVO;
          return new Curso(p.nome, p.carga_horaria, status, p.id);
        });
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
      "UPDATE cursos SET nome = $1, carga_horaria = $2, status = $3 WHERE id = $4 RETURNING *";

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
    const deletar = "DELETE FROM cursos WHERE id = $1 RETURNING *";

    try {
      const values = [id];
      const res = await this.conexao.query(deletar, values);

      return res && res[0] ? (res[0] as Curso) : null;
    } catch (err) {
      console.log("Erro ao deletar curso", err);
      return null;
    }
  }

  async criarTabelaCursoProfessor(
    idCur: number,
    idProf: number
  ): Promise<[Curso | null, Professor | null]> {
    if (!idCur || !idProf) {
      throw new Error("Id do curso ou Id do professor não informado");
    }
    const insert = `INSERT INTO curso_professor (id_curso,id_professor) VALUES ($1, $2) RETURNING *`;
    try {
      const values = [idCur, idProf];
      const res = await this.conexao.query(insert, values);
      if (!res || !res[0]) {
        return [null, null];
      }
      const curso = new Curso(res[0].nome, res[0].carga_horaria, res[0].status);
      const professor = new Professor(
        res[0].nome,
        res[0].email,
        res[0].formacao,
        res[0].id
      );
      return [curso, professor];
    } catch (err) {
      console.log("Erro ao criar tabela curso_professor", err);
      return [null, null];
    }
  }

  async criarTabelaCursoAluno(
    idCur: number,
    idAlu: number,
    notas: number[]
  ): Promise<[Curso | null, Aluno | null]> {
    if (!idCur || !idAlu) {
      throw new Error("Id do curso ou Id do aluno não informado");
    }
    const insert = `INSERT INTO curso_aluno (id_curso,id_aluno,nota1,nota2,nota3,media) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *`;

    try {
      const media = (notas[0] + notas[1] + notas[2]) / 3;
      const values = [idCur, idAlu, notas[0], notas[1], notas[2], media];
      const res = await this.conexao.query(insert, values);
      if (!res || !res[0]) {
        return [null, null];
      }
      const curso = new Curso(res[0].nome, res[0].carga_horaria, res[0].status);
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
