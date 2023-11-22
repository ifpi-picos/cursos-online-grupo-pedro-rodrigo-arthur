"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorDAO = void 0;
const Professor_1 = require("../Entidades/Professor");
const Conexao_1 = __importDefault(require("./Conexao"));
class ProfessorDAO {
    conexao;
    constructor(conexao) {
        this.conexao = conexao;
    }
    async buscarPorId(id) {
        const select = "SELECT * FROM professor WHERE id = $1";
        try {
            const values = [id];
            const res = await this.conexao.query(select, values);
            return res && res[0]
                ? new Professor_1.Professor(res[0].nome, res[0].telefone, res[0].email, res[0].senha, res[0].id)
                : null;
        }
        catch (err) {
            console.log("Erro na consulta de professor por id", err);
            return null;
        }
    }
    async retornaPorEmail(prof) {
        const select = "SELECT * FROM professor WHERE email = $1";
        try {
            const values = [prof.getEmail()];
            const res = await this.conexao.query(select, values);
            return res && res[0]
                ? new Professor_1.Professor(res[0].nome, res[0].telefone, res[0].email, res[0].senha, res[0].id)
                : null;
        }
        catch (err) {
            console.log("Erro na consulta de professor por email", err);
            return null;
        }
    }
    async cadastrar(t) {
        const insert = "INSERT INTO professor (nome, telefone, email,senha) VALUES ($1, $2, $3,$4) RETURNING *";
        const professorCadastrado = await this.retornaPorEmail(t);
        if (professorCadastrado?.getId()) {
            return professorCadastrado;
        }
        try {
            const client = await Conexao_1.default.getConexao();
            if (!client) {
                throw new Error("Não foi possível conectar ao banco de dados");
            }
            const values = [t.getNome(), t.getTelefone(), t.getEmail(), t.getSenha()];
            const res = await this.conexao.query(insert, values);
            if (res && res[0]) {
                return new Professor_1.Professor(res[0].nome, res[0].telefone, res[0].email, res[0].senha, res[0].id);
            }
            else {
                throw new Error("Não foi possível cadastrar o professor");
            }
        }
        catch (err) {
            console.log(err);
            return t;
        }
    }
    async buscarTodos() {
        const select = "SELECT * FROM professor";
        try {
            const client = await this.conexao.query(select, []);
            if (client) {
                return client.map((p) => {
                    return new Professor_1.Professor(p.nome, p.telefone, p.email, p.senha, p.id);
                });
            }
            else {
                return [];
            }
        }
        catch (err) {
            console.log("Erro na consulta de todos os professores", err);
            return [];
        }
    }
    async atualizar(id, dados) {
        const update = "UPDATE professor SET nome = $1, telefone = $2, email = $3,senha = $4 WHERE id = $5 RETURNING *";
        try {
            const values = [
                dados.getNome(),
                dados.getTelefone(),
                dados.getEmail(),
                dados.getSenha(),
                id,
            ];
            const res = await this.conexao.query(update, values);
            return res && res[0]
                ? new Professor_1.Professor(res[0].nome, res[0].telefone, res[0].email, res[0].senha)
                : dados;
        }
        catch (err) {
            console.log("Erro na atualização do professor", err);
            return dados;
        }
    }
    async deletar(id) {
        const deletar = "DELETE FROM professor WHERE id = $1 RETURNING *";
        const deletarCurso = "DELETE FROM curso WHERE id_professor = $1 RETURNING *";
        try {
            const res = await this.conexao.query(deletar, [id]);
            const curso = await this.conexao.query(deletarCurso, [id]);
            return res && res[0] ? res[0] : null;
        }
        catch (err) {
            console.log("Erro ao deletar professor", err);
            return null;
        }
    }
}
exports.ProfessorDAO = ProfessorDAO;
