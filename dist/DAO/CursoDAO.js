"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoDAO = void 0;
const Curso_1 = require("../Entidades/Curso");
const StatusCurso_1 = require("../ENUM/StatusCurso");
const Aluno_1 = require("../Entidades/Aluno");
class CursoDAO {
    conexao;
    constructor(conexao) {
        this.conexao = conexao;
    }
    async cadastrar(t) {
        const insert = "INSERT INTO curso (nome, carga_horaria, status, id_professor) VALUES ($1, $2, $3,$4) RETURNING *";
        try {
            const status = t.getStatus() === 1 ? "ABERTO" : "FECHADO";
            const values = [
                t.getNome(),
                t.getCargaHoraria(),
                status,
                t.getProfessor(),
            ];
            const res = await this.conexao.query(insert, values);
            if (res && res[0]) {
                const curso = new Curso_1.Curso(res[0].nome, res[0].carga_horaria, res[0].status, res[0].idProfessor, res[0].id);
                return curso;
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log("Erro ao cadastrar curso", err);
            return null;
        }
    }
    async buscarTodos() {
        const select = "SELECT * FROM curso";
        try {
            const client = await this.conexao.query(select, []);
            if (client) {
                const cursos = client.map((p) => {
                    const status = p.status === "ABERTO" ? StatusCurso_1.StatusCurso.ABERTO : StatusCurso_1.StatusCurso.FECHADO;
                    return new Curso_1.Curso(p.nome, p.carga_horaria, status, p.id_professor, p.id);
                });
                return cursos;
            }
            else {
                return [];
            }
        }
        catch (err) {
            console.log("Erro na consulta de todos os cursos", err);
            return [];
        }
    }
    async atualizar(id, dados) {
        const update = "UPDATE curso SET nome = $1, carga_horaria = $2, status = $3 WHERE id = $4 RETURNING *";
        try {
            const values = [
                dados.getNome(),
                dados.getCargaHoraria(),
                dados.getStatus(),
                id,
            ];
            const res = await this.conexao.query(update, values);
            return res && res[0] ? res[0] : dados;
        }
        catch (err) {
            console.log("Erro na atualização do curso", err);
            return dados;
        }
    }
    async deletar(id) {
        const deletar = "DELETE FROM curso WHERE id = $1 RETURNING *";
        try {
            const values = [id];
            const res = await this.conexao.query(deletar, values);
            return res && res[0] ? res[0] : null;
        }
        catch (err) {
            console.log("Erro ao deletar curso", err);
            return null;
        }
    }
    async buscarPorId(id) {
        const select = "SELECT * FROM curso WHERE id = $1";
        try {
            const values = [id];
            const res = await this.conexao.query(select, values);
            return res && res[0]
                ? new Curso_1.Curso(res[0].nome, res[0].carga_horaria, res[0].status, res[0].id_professor, res[0].id)
                : null;
        }
        catch (err) {
            console.log("Erro na consulta do curso por id", err);
            return null;
        }
    }
    async criarTabelaCursoAluno(Curs, Alun, notas) {
        if (!Curs || !Alun) {
            throw new Error("Curso ou Aluno não cadastrados");
        }
        const insert = `INSERT INTO curso_aluno (id_curso,id_aluno,nota1,nota2,nota3,media,situacao,statusMatricula) VALUES ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING *`;
        try {
            const media = (notas[0] + notas[1] + notas[2]) / 3;
            let situação = media >= 7 ? "Aprovado" : media >= 5 ? "Recuperacao" : "Reprovado";
            const statusMatricula = Alun.getStatusMatricula() === 1 ? "MATRICULADO" : "CANCELADO";
            const values = [
                Curs.getId(),
                Alun.getId(),
                notas[0],
                notas[1],
                notas[2],
                media,
                situação,
                statusMatricula,
            ];
            const res = await this.conexao.query(insert, values);
            if (!res || !res[0]) {
                return [Curs, Alun];
            }
            const curso = new Curso_1.Curso(res[0].nome, res[0].carga_horaria, res[0].status, res[0].id_professor);
            const aluno = new Aluno_1.Aluno(res[0].nome, res[0].email, res[0].telefone, res[0].status, res[0].senha, res[0].statusMatricula, res[0].id);
            return [curso, aluno];
        }
        catch (err) {
            console.log("Erro ao criar tabela curso_aluno", err);
            return [Curs, Alun];
        }
    }
    async buscarCursoProfessor(idProfessor) {
        const select = `SELECT * FROM curso WHERE id_professor = $1`;
        try {
            const values = [idProfessor.getId()];
            const res = await this.conexao.query(select, values);
            return res && res.length > 0
                ? res.map((curso) => new Curso_1.Curso(curso.nome, curso.carga_horaria, curso.status, curso.id_professor, curso.id))
                : [];
        }
        catch (err) {
            console.log("Erro na consulta do curso por id do professor", err);
            return [];
        }
    }
    async buscarCursoAluno() {
        const select = `SELECT * FROM curso_aluno`;
        try {
            const res = await this.conexao.query(select, []);
            return res && res.length > 0
                ? res.map((row) => ({
                    id_curso: row.id_curso,
                    id_aluno: row.id_aluno,
                    nota1: row.nota1,
                    nota2: row.nota2,
                    nota3: row.nota3,
                    media: row.media,
                    situacao: row.situacao,
                    statusMatricula: row.statusMatricula,
                }))
                : [];
        }
        catch (err) {
            console.log("Erro na consulta do curso", err);
            return [];
        }
    }
    async buscarCursoAlunoPorId(id) {
        const select = `SELECT * FROM curso_aluno WHERE id_aluno = $1`;
        try {
            const values = [id];
            const res = await this.conexao.query(select, values);
            return res && res.length > 0
                ? res.map((row) => ({
                    id_curso: row.id_curso,
                    id_aluno: row.id_aluno,
                    nota1: row.nota1,
                    nota2: row.nota2,
                    nota3: row.nota3,
                    media: row.media,
                    situacao: row.situacao,
                    statusMatricula: row.statusMatricula,
                }))
                : [];
        }
        catch (err) {
            console.log("Erro na consulta do curso", err);
            return [];
        }
    }
}
exports.CursoDAO = CursoDAO;
