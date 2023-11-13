import { Disciplina } from "../Entidades/Disciplina";
import Conexao from "./Conexao";
import { IDAO } from "./IDAO";

export class DisciplinaDAO implements IDAO<Disciplina> {
  private conexao: Conexao;
  constructor(conexao: Conexao) {
    this.conexao = conexao;
  }
  async cadastrar(t: Disciplina): Promise<Disciplina | null> {
    const insert =
      "INSERT INTO disciplinas (nome, ementa, carga_horaria) VALUES ($1, $2,$3) RETURNING *";

    try {
      const client = await Conexao.getConexao();
      if (!client) {
        throw new Error("Não foi possível conectar ao banco de dados");
      }
      const values = [t.getNome(), t.getEmenta(), t.getCargaHoraria()];

      const res = await client.query(insert, values);

      if (res && res.rows && res.rows[0]) {
        return res.rows[0] as Disciplina;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Erro ao cadastrar disciplina", err);
      return null;
    }
  }
  async buscarTodos(): Promise<Disciplina[]> {
    const select = "SELECT * FROM  disciplinas";

    try {
      const client = await this.conexao.query(select, []);
      if (client) {
        return client.map(
          (p: {
            nome: string;
            ementa: string;
            carga_horaria: number;
            id: number | undefined;
          }) => {
            return new Disciplina(p.nome, p.ementa, p.carga_horaria, p.id);
          }
        );
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  atualizar(id: number, dados: Disciplina): Promise<Disciplina> {
    throw new Error("Method not implemented.");
  }
  deletar(id: number): Promise<Disciplina | null> {
    throw new Error("Method not implemented.");
  }
}
