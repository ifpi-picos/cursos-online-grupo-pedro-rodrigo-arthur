"use strict";
class Curso {
    nome;
    cargaHoraria;
    status;
    constructor(nome, cargaHoraria, status) {
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.status = status;
    }
    getNome() {
        return this.nome;
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
    informaoesCurso() {
        return `Nome: ${this.nome} \nCarga Horária: ${this.cargaHoraria} \nStatus: ${this.status}`;
    }
}
const curso = new Curso("Curso de TypeScript", 40, true);
console.log(curso.informaoesCurso());
