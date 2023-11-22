"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacaoProfessor = void 0;
const Conexao_1 = __importDefault(require("../DAO/Conexao"));
const ProfessorDAO_1 = require("../DAO/ProfessorDAO");
class AutenticacaoProfessor {
    email;
    senha;
    constructor(email, senha) {
        this.email = email;
        this.senha = senha;
    }
    getEmail() {
        return this.email;
    }
    getSenha() {
        return this.senha;
    }
    async autenticar(professor) {
        const conexao = new Conexao_1.default();
        const professorDAO = new ProfessorDAO_1.ProfessorDAO(conexao);
        const professorEncontrado = await professorDAO.retornaPorEmail(professor);
        if (professorEncontrado) {
            return professorEncontrado.getSenha() === this.senha;
        }
        return false;
    }
}
exports.AutenticacaoProfessor = AutenticacaoProfessor;
