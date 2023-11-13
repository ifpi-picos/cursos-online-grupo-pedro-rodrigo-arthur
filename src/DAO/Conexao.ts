import { Client, ClientConfig } from "pg";

export class Conexao {
  private static config: ClientConfig = {
    host: "localhost",
    port: 5432,
    database: "cursosonline",
    user: "postgres",
    password: "1234",
  };

  static async getConexao(): Promise<Client | null> {
    try {
      const client = new Client(Conexao.config);
      await client.connect();
      return client;
    } catch (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return null;
    } finally {
      console.log("Conexão finalizada");
    }
  }

  async query(sql: string, valores: any[]) {
    const client = await Conexao.getConexao();
    if (!client) {
      throw new Error("Não foi possível conectar ao banco de dados");
    }
    try {
      const res = await client.query(sql, valores);
      return res.rows;
    } catch (err) {
      console.error("Erro na conexao da consulta:", err);
    } finally {
      await client.end();
    }
  }
}

export default Conexao;
