import { Aluno } from "../Entidades/Aluno";
import Conexao from "./Conexao";
import { IDAO } from "./IDAO";

export class AlunoDAO implements IDAO<Aluno> {
private conexao: Conexao; 

constructor(conexao: Conexao) {
  this.conexao = conexao;
}
async cadastrar(t: Aluno): Promise<Aluno | null> {
  const insert =
    "INSERT INTO alunos (nome, telefone, email, numero da matricula) VALUES ($1, $2, $3) RETURNING *";

  try {
    const client = await Conexao.getConexao();
    if (!client) {
      throw new Error("Não foi possível conectar ao banco de dados");
    }
    // Armazenar os valores a serem inseridos
    const values = [t.getNome(), t.getTelefone(), t.getEmail(), t.getNumeromatricula()];
    // Executar a query
    const res = await this.conexao.query(insert, values);

    return res && res[0] ? (res[0] as Aluno) : null;
  } catch (err) {
    console.log(err);
    return null;
  }
  }
  async buscarTodos(): Promise<Aluno[]> {
    const select = "SELECT * FROM alunos";

    try {
      const client = await this.conexao.query(select, []);

      if (client) {
        // Mapear os resutados do banco de dados para objetos da classe Professor
        return client.map((p: { nome: string; telefone: string; email: number; id: string; }) => {
          return new Aluno(p.nome, p.telefone, p.email, p.id);
        });
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  atualizar(id: number, dados: Aluno): Promise<Aluno> {
    throw new Error("Method not implemented.");
  }
  deletar(id: number): Promise<Aluno | null> {
    throw new Error("Method not implemented.");
  }
}
