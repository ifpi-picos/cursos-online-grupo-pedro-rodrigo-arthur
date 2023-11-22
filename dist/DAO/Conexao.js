"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conexao = void 0;
const pg_1 = require("pg");
class Conexao {
    static config = {
        host: "localhost",
        port: 5432,
        database: "teste",
        user: "postgres",
        password: "1234",
    };
    static async getConexao() {
        try {
            const client = new pg_1.Client(Conexao.config);
            await client.connect();
            return client;
        }
        catch (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            return null;
        }
        finally {
            console.log("Conexão finalizada");
        }
    }
    async query(sql, valores) {
        const client = await Conexao.getConexao();
        if (!client) {
            throw new Error("Não foi possível conectar ao banco de dados");
        }
        try {
            const res = await client.query(sql, valores);
            return res.rows;
        }
        catch (err) {
            console.error("Erro na conexao da consulta:", err);
        }
        finally {
            await client.end();
        }
    }
}
exports.Conexao = Conexao;
exports.default = Conexao;
