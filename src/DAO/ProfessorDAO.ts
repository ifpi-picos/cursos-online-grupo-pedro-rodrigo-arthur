import { Professor } from "../Entidades/Professor";
import Conexao from "./Conexao";
import { IDAO } from "./IDAO";
export class ProfessorDAO implements IDAO<Professor> {
  private conexao: Conexao;

  constructor(conexao: Conexao) {
    this.conexao = conexao;
  }

  async cadastrar(t: Professor): Promise<Professor | null> {
    const insert =
      "INSERT INTO professor (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *";

    try {
      const client = await Conexao.getConexao();
      if (!client) {
        throw new Error("Não foi possível conectar ao banco de dados");
      }
      // Armazenar os valores a serem inseridos
      const values = [t.getNome(), t.getTelefone(), t.getEmail()];
      // Executar a query
      const res = await this.conexao.query(insert, values);

      return res && res[0]
        ? new Professor(res[0].nome, res[0].telefone, res[0].email, res[0].id)
        : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async buscarTodos(): Promise<Professor[]> {
    const select = "SELECT * FROM professor";

    try {
      const client = await this.conexao.query(select, []);

      if (client) {
        // Mapear os resutados do banco de dados para objetos da class Professor
        return client.map((p) => {
          return new Professor(p.nome, p.telefone, p.email, p.id);
        });
      } else {
        return [];
      }
    } catch (err) {
      console.log("Erro na consulta de todos os professores", err);
      return [];
    }
  }

  async atualizar(id: number, dados: Professor): Promise<Professor> {
    const update =
      "UPDATE professor SET nome = $1, telefone = $2, email = $3 WHERE id = $4 RETURNING *";

    try {
      const values = [
        dados.getNome(),
        dados.getTelefone(),
        dados.getEmail(),
        id,
      ];
      const res = await this.conexao.query(update, values);
      return res && res[0] ? (res[0] as Professor) : dados;
    } catch (err) {
      console.log("Erro na atualização do professor", err);
      return dados;
    }
  }

  async deletar(id: number): Promise<Professor | null> {
    const deletar = "DELETE FROM professor WHERE id = $1 RETURNING *";

    try {
      const checagem = "DELETE * FROM curso WHERE id_professor = $1";
      const res = await this.conexao.query(deletar, [id]);

      if (res && res.length > 0) {
        await this.conexao.query(checagem, [id]);
      }

      return res && res[0] ? (res[0] as Professor) : null;
    } catch (err) {
      console.log("Erro ao deletar professor", err);
      return null;
    }
  }
}
