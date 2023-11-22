"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoDAO = void 0;
const StatusAluno_1 = require("../ENUM/StatusAluno");
const StatusMatricula_1 = require("../ENUM/StatusMatricula");
const Aluno_1 = require("../Entidades/Aluno");
const Conexao_1 = __importDefault(require("./Conexao"));
class AlunoDAO {
    conexao;
    constructor(conexao) {
        this.conexao = conexao;
    }
    async buscarPorId(id) {
        const select = "SELECT * FROM aluno WHERE id = $1";
        try {
            const values = [id];
            const res = await this.conexao.query(select, values);
            return res && res[0]
                ? new Aluno_1.Aluno(res[0].nome, res[0].telefone, res[0].email, res[0].status, res[0].senha, res[0].statusMatricula, res[0].id)
                : null;
        }
        catch (err) {
            console.log("Erro na consulta de aluno por id", err);
            return null;
        }
    }
    async cadastrar(t) {
        const alunoCadastrado = await this.retornaPorEmail(t);
        if (alunoCadastrado?.getId()) {
            return alunoCadastrado;
        }
        const insert = "INSERT INTO aluno (nome, telefone, email,status,senha) VALUES ($1, $2, $3,$4,$5) RETURNING *";
        try {
            const client = await Conexao_1.default.getConexao();
            if (!client) {
                throw new Error("Não foi possível conectar ao banco de dados");
            }
            const status = t.getStatus() === 1 ? "ATIVO" : "INATIVO";
            const values = [
                t.getNome(),
                t.getTelefone(),
                t.getEmail(),
                status,
                t.getSenha(),
            ];
            const res = await this.conexao.query(insert, values);
            if (res && res[0]) {
                return new Aluno_1.Aluno(res[0].nome, res[0].telefone, res[0].email, res[0].status, res[0].senha, res[0].statusMatricula, res[0].id);
            }
            else {
                throw new Error("Não foi possível cadastrar o aluno");
            }
        }
        catch (err) {
            console.log(err);
            return t;
        }
    }
    async buscarTodos() {
        const select = "SELECT * FROM aluno";
        try {
            const client = await this.conexao.query(select, []);
            if (client) {
                return client.map((p) => {
                    const status = p.status === "ATIVO" ? StatusAluno_1.StatusAluno.ATIVO : StatusAluno_1.StatusAluno.INATIVO;
                    const statsMat = p.statusMatricula === "MATRICULADO"
                        ? StatusMatricula_1.StatusMatricula.MATRICULADO
                        : StatusMatricula_1.StatusMatricula.CANCELADO;
                    return new Aluno_1.Aluno(p.nome, p.telefone, p.email, status, p.senha, statsMat, p.id);
                });
            }
            else {
                return [];
            }
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }
    async atualizar(id, dados) {
        const update = "UPDATE aluno SET email = $1, nome = $2, telefone = $3, status = $4, senha=$5,statusMatricula = $6 RETURNING *";
        try {
            const status = dados.getStatus() === 1 ? "ATIVO" : "INATIVO";
            const statusMat = dados.getStatusMatricula() === 1 ? "MATRICULADO" : "CANCELADO";
            const values = [
                dados.getEmail(),
                dados.getNome(),
                dados.getTelefone(),
                status,
                dados.getSenha(),
                statusMat,
                id,
            ];
            const res = await this.conexao.query(update, values);
            return res && res[0] ? res[0] : dados;
        }
        catch (err) {
            console.log("Erro na atualização do aluno", err);
            return dados;
        }
    }
    async deletar(id) {
        const deletar = "DELETE FROM aluno WHERE id = $1 RETURNING *";
        try {
            const values = [id];
            const res = await this.conexao.query(deletar, values);
            return res && res[0] ? res[0] : null;
        }
        catch (err) {
            console.log("Erro ao deletar aluno", err);
            return null;
        }
    }
    async retornaPorEmail(aluno) {
        const select = "SELECT * FROM aluno WHERE email = $1";
        try {
            const values = [aluno.getEmail()];
            const res = await this.conexao.query(select, values);
            return res && res[0]
                ? new Aluno_1.Aluno(res[0].nome, res[0].telefone, res[0].email, res[0].status, res[0].senha, res[0].statusMatricula, res[0].id)
                : aluno;
        }
        catch (err) {
            console.log("Erro na consulta de aluno por email", err);
            return aluno;
        }
    }
}
exports.AlunoDAO = AlunoDAO;
