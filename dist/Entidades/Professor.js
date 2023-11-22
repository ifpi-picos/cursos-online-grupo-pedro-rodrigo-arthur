"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
class Professor {
    nome;
    id;
    telefone;
    email;
    senha;
    cursos;
    constructor(nome, telefone, email, senha, id) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.cursos = [];
        this.senha = senha;
        this.id = id || 0;
    }
    addCurso(curso) {
        this.cursos.push(curso);
    }
    getSenha() {
        return this.senha;
    }
    setSenha(senha) {
        this.senha = senha;
    }
    getCursos() {
        return this.cursos;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        nome.trim() !== "" ? (this.nome = nome) : (this.nome = "Nome Inválido");
        return (this.nome = nome);
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getTelefone() {
        return this.telefone;
    }
    setTelefone(telefone) {
        return (this.telefone = telefone);
    }
    setEmail(email) {
        return (this.email = email);
    }
    toString() {
        return `Nome: ${this.nome} | Email: ${this.email} | Telefone: ${this.telefone}`;
    }
}
exports.Professor = Professor;
