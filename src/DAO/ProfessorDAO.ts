import { Professor } from "../Entidades/Professor";
import Conexao from "./Conexao";
import { IDAO } from "./IDAO";

class ProfessorDAO implements IDAO<Professor> {
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
      const values = [t.getNome(), t.getTelefone(), t.getEmail()];
      const res = await this.conexao.query(insert, values);

      return res && res[0] ? (res[0] as Professor) : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  buscarTodos(): Promise<Professor[]> {
    throw new Error("Method not implemented.");
  }
  atualizar(id: number, dados: Professor): Promise<Professor> {
    throw new Error("Method not implemented.");
  }
  deletar(id: number): Promise<Professor | null> {
    throw new Error("Method not implemented.");
  }
}
