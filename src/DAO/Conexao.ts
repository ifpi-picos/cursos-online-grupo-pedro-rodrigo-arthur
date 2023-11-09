import { Client, ClientConfig } from "pg";

class Conexao {
  private static config: ClientConfig = {
    host: "localhost",
    port: 5432,
    database: "cursosoline",
    user: "postgres",
    password: "1234",
  };

  private static async getConexao(): Promise<Client | null> {
    try {
      const client = new Client(Conexao.config);
      await client.connect();
      return client;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      console.log("Conexão finalizada");
    }
  }
}

export default Conexao;
