import { Curso } from "../Entidades/Curso";
import { IDAO } from "./IDAO";
import Conexao from "./Conexao";

export class CursoDAO implements IDAO<Curso> {
  private conexao: Conexao;

  constructor(conexao: Conexao) {
    this.conexao = conexao;
  }
  async cadastrar(t: Curso): Promise<Curso | null> {
    const insert =
      "INSERT INTO alunos (nome,carga_horaria,status) VALUES ($1, $2, $3) RETURNING *";
    try {
      const client = await Conexao.getConexao();
      if (!client) {
        throw new Error("Não foi possível conectar ao banco de dados");
      }
      const values = [t.getNome(), t.getCargaHoraria(), t.getStatus()];
      const res = await this.conexao.query(insert, values);
      return res && res[0] ? (res[0] as Curso) : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async buscarTodos(): Promise<Curso[]> {
    const select = "SELECT * FROM cursos";

    try {
      const client = await this.conexao.query(select, []);

      if (client) {
        return client.map((p: any) => {
          return new Curso(p.nome, p.carga_horaria, p.status, p.id);
        });
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
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
}
