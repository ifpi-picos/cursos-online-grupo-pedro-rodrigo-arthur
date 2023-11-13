import { Curso } from "../Entidades/Curso";
import { IDAO } from "./IDAO";
import Conexao from "./Conexao";
import { Aluno } from "../Entidades/Aluno";

export class CursoDAO implements IDAO<Curso> {
  conexao: any;
  async cadastrar(t: Curso): Promise<Curso | null> {
    const insert =
      "INSERT INTO alunos (nome, telefone, email, matricula) VALUES ($1, $2, $3, $4) RETURNING *";
    try {
      const client = await Conexao.getConexao();
      if (!client) {
        throw new Error("Não foi possível conectar ao banco de dados");
      }
      const values = [
        t.getNome(),
        t.getTelefone(),
        t.getEmail(),
        t.getNumeromatricula(),
      ];
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
        return client.map((p:any) => {
          return new Aluno(
            p.nome,
            p.telefone,
            p.email,
            p.numeromatricula,
            p.id
          );
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
      "UPDATE curso SET nome = $1, telefone = $2, email = $3 WHERE id = $4 RETURNING *";

    try {
      const values = [
        dados.getNome(),
        dados.getTelefone(),
        dados.getEmail(),
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
