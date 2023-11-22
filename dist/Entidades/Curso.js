"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curso = void 0;
class Curso {
    id;
    nome;
    cargaHoraria;
    status;
    professor;
    constructor(nome, cargaHoraria, status, professor, id) {
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.status = status;
        this.professor = professor;
        this.id = id || 0;
    }
    getNome() {
        return this.nome;
    }
    getId() {
        return this.id;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getCargaHoraria() {
        return this.cargaHoraria;
    }
    setCargaHoraria(cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getProfessor() {
        return this.professor;
    }
    setProfessor(professor) {
        this.professor = professor;
    }
    toString() {
        return `Nome: ${this.nome} | Carga Horaria: ${this.cargaHoraria} | Status: ${this.status}`;
    }
}
exports.Curso = Curso;
