import { StatusAluno } from "../ENUM/StatusAluno";
import { Aluno } from "../Entidades/Aluno";
import Conexao from "./Conexao";
import { IDAO } from "./IDAO";

export class AlunoDAO implements IDAO<Aluno> {
  private conexao: Conexao;

  constructor(conexao: Conexao) {
    this.conexao = conexao;
  }
  async buscarPorId(id: number): Promise<Aluno | null> {
    const select = "SELECT * FROM aluno WHERE id = $1";

    try {
      const values = [id];
      const res = await this.conexao.query(select, values);
      return res && res[0]
        ? new Aluno(
            res[0].nome,
            res[0].telefone,
            res[0].email,
            res[0].status,
            res[0].senha,
            res[0].id
          )
        : null;
    } catch (err) {
      console.log("Erro na consulta de aluno por id", err);
      return null;
    }
  }
  async cadastrar(t: Aluno): Promise<Aluno> {
    const alunoCadastrado = await this.retornaPorEmail(t);
    if (alunoCadastrado?.getId()) {
      return alunoCadastrado;
    }

    const insert =
      "INSERT INTO aluno (nome, telefone, email,status,senha) VALUES ($1, $2, $3,$4,$5) RETURNING *";

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
        t.getStatusAsString(),
        t.getSenha(),
      ];
      // Executar a query
      const res = await this.conexao.query(insert, values);

      if (res && res[0]) {
        return new Aluno(
          res[0].nome,
          res[0].telefone,
          res[0].email,
          res[0].status,
          res[0].senha,
          res[0].id
        );
      } else {
        throw new Error("Não foi possível cadastrar o aluno");
      }
    } catch (err) {
      console.log(err);
      return t;
    }
  }
  async buscarTodos(): Promise<Aluno[]> {
    const select = "SELECT * FROM aluno";

    try {
      const client = await this.conexao.query(select, []);

      if (client) {
        return client.map((p) => {
          const status =
            p.status === "ATIVO" ? StatusAluno.ATIVO : StatusAluno.INATIVO;
          return new Aluno(p.nome, p.telefone, p.email, status, p.senha, p.id);
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
    const update =
      "UPDATE aluno SET email = $1, nome = $2, telefone = $3, status = $4, senha=$5 RETURNING *";

    try {
      const values = [
        dados.getEmail(),
        dados.getNome(),
        dados.getTelefone(),
        dados.getStatusAsString(),
        dados.getSenha(),
      ];

      const res = await this.conexao.query(update, values);
      return res && res[0] ? (res[0] as Aluno) : dados;
    } catch (err) {
      console.log("Erro na atualização do aluno", err);
      return dados;
    }
  }
  async deletar(id: number): Promise<Aluno | null> {
    const deletar = "DELETE FROM aluno WHERE id = $1 RETURNING *";

    try {
      const values = [id];
      const res = await this.conexao.query(deletar, values);

      return res && res[0] ? (res[0] as Aluno) : null;
    } catch (err) {
      console.log("Erro ao deletar aluno", err);
      return null;
    }
  }

  async retornaPorEmail(aluno: Aluno): Promise<Aluno> {
    const select = "SELECT * FROM aluno WHERE email = $1";

    try {
      const values = [aluno.getEmail()];
      const res = await this.conexao.query(select, values);
      return res && res[0]
        ? new Aluno(
            res[0].nome,
            res[0].telefone,
            res[0].email,
            res[0].status,
            res[0].senha,
            res[0].id
          )
        : aluno;
    } catch (err) {
      console.log("Erro na consulta de aluno por email", err);
      return aluno;
    }
  }
}
