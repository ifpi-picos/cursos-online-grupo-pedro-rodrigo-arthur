import { Curso } from "../Entidades/Curso";
import { IDAO } from "./IDAO";
import Conexao from "./Conexao";
import { StatusCurso } from "../ENUM/StatusCurso";

export class CursoDAO implements IDAO<Curso> {
  private conexao: Conexao;

  constructor(conexao: Conexao) {
    this.conexao = conexao;
  }
  async cadastrar(t: Curso): Promise<Curso | null> {
    const insert = `INSERT INTO curso (nome,carga_horaria,status,id_professor) VALUES ($1, $2, $3,$4) RETURNING *`;
    try {
      const client = await Conexao.getConexao();
      if (!client) {
        throw new Error("Não foi possível conectar ao banco de dados");
      }

      const values = [
        t.getNome(),
        t.getCargaHoraria(),
        t.getStatusAsString(),
        t.getIdProfessor(),
      ];
      const res = await this.conexao.query(insert, values);
      return res && res[0] ? (res[0] as Curso) : null;
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
        return client.map((p: any) => {
          const status =
            p.status === "ATIVO" ? StatusCurso.ATIVO : StatusCurso.INATIVO;
          return new Curso(
            p.nome,
            p.carga_horaria,
            status,
            p.id,
            p.id_professor
          );
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
      "UPDATE cursos SET nome = $1, carga_horaria = $2, status = $3,id_professor = $4 WHERE id = $5 RETURNING *";

    try {
      const values = [
        dados.getNome(),
        dados.getCargaHoraria(),
        dados.getStatusAsString(),
        dados.getIdProfessor(),
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
}
