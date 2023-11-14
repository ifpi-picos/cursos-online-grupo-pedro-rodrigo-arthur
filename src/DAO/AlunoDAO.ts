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
      "INSERT INTO alunos (nome, telefone, email, matricula) VALUES ($1, $2, $3, $4) RETURNING *";

    try {
      const client = await Conexao.getConexao();
      if (!client) {
        throw new Error("Não foi possível conectar ao banco de dados");
      }
      // Armazenar os valores a serem inseridos
      const values = [
        t.getNome(),
        t.getTelefone(),
        t.getEmail(),
        t.getNumeromatricula(),
      ];
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
        return client.map((p) => {
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
  async atualizar(id: number, dados: Aluno): Promise<Aluno> {
    const update = "UPDATE alunos SET email = 1$, nome = 2$, telefone = 3$, numeromatricula = 4$ RETURNING *";
   
    try {
      const values = [
       dados.getEmail,
       dados.getNome,
       dados.getTelefone,
       dados.getNumeromatricula,
       id,     
      ];

      const res = await this.conexao.query(update, values);
      return res && res[0] ? (res[0] as Aluno) : dados;
    } catch (err) {
      console.log("Erro na atualização do aluno", err);
      return dados;
    }
  } 
  async deletar(id: number): Promise<Aluno | null> {
    const deletar = "DELETE FROM alunos WHERE id = 1$ RETURNING *";

    try {
      const values = [id];
      const res = await this.conexao.query(deletar, values);

      return res && res[0] ? (res[0] as Aluno) : null;
    } catch(err) {
      console.log("Erro ao deletar aluno", err);
      return null;
    
    }
  }
}
