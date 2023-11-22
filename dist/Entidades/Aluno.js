"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
const StatusMatricula_1 = require("../ENUM/StatusMatricula");
class Aluno {
    id;
    nome;
    email;
    telefone;
    status;
    senha;
    statusMatricula;
    constructor(nome, email, telefone, status, senha, statusMatricula, id) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.status = status;
        this.senha = senha;
        this.statusMatricula = statusMatricula || StatusMatricula_1.StatusMatricula.MATRICULADO;
        this.id = id || 0;
    }
    getStatusMatricula() {
        return this.statusMatricula;
    }
    setStatusMatricula(statusMatricula) {
        this.statusMatricula = statusMatricula;
    }
    getSenha() {
        return this.senha;
    }
    setSenha(senha) {
        this.senha = senha;
    }
    getNome() {
        return this.nome;
    }
    getTelefone() {
        return this.telefone;
    }
    getEmail() {
        return this.email;
    }
    getId() {
        return this.id;
    }
    setNome(nome) {
        nome.trim() !== "" ? (this.nome = nome) : (this.nome = "Nome Inválido");
    }
    setTelefone(telefone) {
        this.telefone = telefone;
    }
    setEmail(email) {
        this.email = email;
    }
    toString() {
        return `Nome: ${this.nome} | Email: ${this.email} | Telefone: ${this.telefone}`;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
}
exports.Aluno = Aluno;
