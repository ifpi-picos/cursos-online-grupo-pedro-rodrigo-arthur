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
      "INSERT INTO professores (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *";

    try {
      const client = await Conexao.getConexao();
      if (!client) {
        throw new Error("Não foi possível conectar ao banco de dados");
      }
      // Armazenar os valores a serem inseridos
      const values = [t.getNome(), t.getTelefone(), t.getEmail()];
      // Executar a query
      const res = await this.conexao.query(insert, values);

      return res && res[0] ? (res[0] as Professor) : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async buscarTodos(): Promise<Professor[]> {
    const select = "SELECT * FROM professores";

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
      console.log(err);
      return [];
    }
  }
  atualizar(id: number, dados: Professor): Promise<Professor> {
    throw new Error("Method not implemented");
  }
  deletar(id: number): Promise<Professor | null> {
    throw new Error("Method not implemented");
  }
}
