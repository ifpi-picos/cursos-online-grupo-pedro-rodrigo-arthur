"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AlunoDAO_1 = require("./DAO/AlunoDAO");
const Conexao_1 = __importDefault(require("./DAO/Conexao"));
const CursoDAO_1 = require("./DAO/CursoDAO");
const ProfessorDAO_1 = require("./DAO/ProfessorDAO");
const Aluno_1 = require("./Entidades/Aluno");
const Curso_1 = require("./Entidades/Curso");
const Professor_1 = require("./Entidades/Professor");
const prompt = require("prompt-sync")();
async function main() {
    try {
        const conexao = new Conexao_1.default();
        const cursoDAO = new CursoDAO_1.CursoDAO(conexao);
        const professorDAO = new ProfessorDAO_1.ProfessorDAO(conexao);
        const alunoDAO = new AlunoDAO_1.AlunoDAO(conexao);
        let opcao;
        do {
            console.log("******************************");
            console.log("Sistema de Gerenciamento de Cursos");
            console.log("1 - Cadastrar Professor");
            console.log("2 - Cadastrar Curso");
            console.log("3 - Cadastrar Aluno");
            console.log("4 - Matricular Aluno");
            console.log("5 - Atualizar dados do Professor");
            console.log("6 - Alterar dados do Aluno");
            console.log("7 - Listar Alunos");
            console.log("8 - Listar Cursos");
            console.log("9 - Listar Professores");
            console.log("10 - Vizualizar infomações da tabela CursoAluno");
            console.log("11 - Vizualizar infomações do Professor");
            console.log("12 - Vizualizar infomações do Aluno");
            console.log("13 - Vizualizar cursos que o Aluno está matriculado");
            console.log("14 - Delete Professor");
            opcao = Number(prompt("Digite a opção desejada: "));
            console.log("******************************");
            switch (opcao) {
                case 1:
                    console.log("******* CADASTRANDO PROFESSOR *******");
                    const nomeProfessor = prompt("Digite o nome do professor: ");
                    const telefoneProfessor = prompt("Digite o telefone do professor: ");
                    const emailProfessor = prompt("Digite o email do professor: ");
                    const senhaProfessor = prompt("Digite a senha do professor: ");
                    const professor = new Professor_1.Professor(nomeProfessor, telefoneProfessor, emailProfessor, senhaProfessor);
                    const professorCadastrado = await professorDAO.cadastrar(professor);
                    if (professorCadastrado) {
                        console.log("Professor cadastrado com sucesso!");
                    }
                    else {
                        console.log("Erro ao cadastrar professor");
                    }
                    break;
                case 2:
                    console.log("******* CADASTRANDO CURSO *******");
                    const nomeCurso = prompt("Digite o nome do curso: ");
                    const cargaHorariaCurso = prompt("Digite a carga horária do curso: ");
                    const statusCurso = Number(prompt("Digite o status do curso (1:ABERTO || 0: FECHADO): "));
                    const idProfessorCad = prompt("Digite o id do professor: ");
                    statusCurso.toString();
                    const curso = new Curso_1.Curso(nomeCurso, cargaHorariaCurso, statusCurso, idProfessorCad);
                    const cursoCadastrado = await cursoDAO.cadastrar(curso);
                    if (cursoCadastrado) {
                        console.log("Curso cadastrado com sucesso!");
                    }
                    else {
                        console.log("Erro ao cadastrar curso");
                    }
                    break;
                case 3:
                    console.log("******* CADASTRANDO ALUNO *******");
                    const nomeAluno = prompt("Digite o nome do aluno: ");
                    const telefoneAluno = prompt("Digite o telefone do aluno: ");
                    const emailAluno = prompt("Digite o email do aluno: ");
                    const statusAluno = Number(prompt("Digite o status do aluno (1:ATIVO || 0:INATIVO): "));
                    const statusMatricula = Number(prompt("Digite o status da matricula (1:MATRICULADO || 0:CANCELADO): "));
                    const senhaAluno = prompt("Digite a senha do aluno: ");
                    const aluno = new Aluno_1.Aluno(nomeAluno, emailAluno, telefoneAluno, statusAluno, senhaAluno, statusMatricula);
                    const alunoCadastrado = await alunoDAO.cadastrar(aluno);
                    if (alunoCadastrado) {
                        console.log("Aluno cadastrado com sucesso!");
                    }
                    else {
                        console.log("Erro ao cadastrar aluno");
                    }
                    break;
                case 4:
                    console.log("******* MATRICULANDO ALUNO *******");
                    const idAluno = Number(prompt("Digite o id do aluno: "));
                    const idCurso = Number(prompt("Digite o id do curso: "));
                    const notas = [];
                    const encontrarAluno = await alunoDAO.buscarPorId(idAluno);
                    const encontrarCurso = await cursoDAO.buscarPorId(idCurso);
                    if (!encontrarAluno || !encontrarCurso) {
                        console.log("Aluno ou curso não encontrado");
                        break;
                    }
                    for (let i = 0; i < 3; i++) {
                        notas.push(Number(prompt(`Digite a ${i + 1}ª nota do aluno: `)));
                    }
                    const alunoMatriculado = await cursoDAO.criarTabelaCursoAluno(encontrarCurso, encontrarAluno, notas);
                    if (alunoMatriculado) {
                        console.log("Aluno matriculado com sucesso!");
                    }
                    break;
                case 5:
                    console.log("******* ALTERANDO PROFESSOR *******");
                    const idProfessor = Number(prompt("Digite o id do professor: "));
                    const encontrarProfessor = await professorDAO.buscarPorId(idProfessor);
                    if (!encontrarProfessor) {
                        console.log("Professor não encontrado");
                        break;
                    }
                    const nomeProfessorAtualizado = prompt("Digite o nome do professor: ");
                    const telefoneProfessorAtualizado = prompt("Digite o telefone do professor: ");
                    const emailProfessorAtualizado = prompt("Digite o email do professor: ");
                    const senhaProfessorAtualizado = prompt("Digite a senha do professor: ");
                    const professorAtualizado = new Professor_1.Professor(nomeProfessorAtualizado, telefoneProfessorAtualizado, emailProfessorAtualizado, senhaProfessorAtualizado, idProfessor);
                    const professorAlterado = await professorDAO.atualizar(idProfessor, professorAtualizado);
                    if (professorAlterado) {
                        console.log("Professor alterado com sucesso!");
                    }
                    else {
                        console.log("Erro ao alterar professor");
                    }
                    break;
                case 6:
                    console.log("******* ALTERANDO ALUNO *******");
                    const idAlunoAtualizado = Number(prompt("Digite o id do aluno: "));
                    const encontrarAlunoAtualizado = await alunoDAO.buscarPorId(idAlunoAtualizado);
                    if (!encontrarAlunoAtualizado) {
                        console.log("Aluno não encontrado");
                        break;
                    }
                    const nomeAlunoAtualizado = prompt("Digite o nome do aluno: ");
                    const telefoneAlunoAtualizado = prompt("Digite o telefone do aluno: ");
                    const emailAlunoAtualizado = prompt("Digite o email do aluno: ");
                    const statusAlunoAtualizado = Number(prompt("Digite o status do aluno: "));
                    const senhaAlunoAtualizado = prompt("Digite a senha do aluno: ");
                    const alunoAtualizado = new Aluno_1.Aluno(nomeAlunoAtualizado, emailAlunoAtualizado, telefoneAlunoAtualizado, statusAlunoAtualizado, senhaAlunoAtualizado, idAlunoAtualizado);
                    const alunoAlterado = await alunoDAO.atualizar(idAlunoAtualizado, alunoAtualizado);
                    if (alunoAlterado) {
                        console.log("Aluno alterado com sucesso!");
                    }
                    else {
                        console.log("Erro ao alterar aluno");
                    }
                    break;
                case 7:
                    const alunos = await alunoDAO.buscarTodos();
                    console.log("*******ALUNOS CADASTRADOS ******");
                    if (alunos.length === 0) {
                        console.log("Não há alunos cadastrados");
                        break;
                    }
                    console.log(alunos);
                    break;
                case 8:
                    const cursos = await cursoDAO.buscarTodos();
                    console.log("*******CURSOS CADASTRADOS ******");
                    if (cursos.length === 0) {
                        console.log("Não há cursos cadastrados");
                        break;
                    }
                    console.log(cursos);
                    break;
                case 9:
                    const professores = await professorDAO.buscarTodos();
                    console.log("*******PROFESSORES CADASTRADOS ******");
                    if (professores.length === 0) {
                        console.log("Não há professores cadastrados");
                        break;
                    }
                    console.log(professores);
                    break;
                case 10:
                    const cursoAluno = await cursoDAO.buscarCursoAluno();
                    console.log("******* ALUNOS MATRICULADOS ******");
                    if (cursoAluno.length === 0) {
                        console.log("Não há alunos matriculados");
                        break;
                    }
                    console.log(cursoAluno);
                    break;
                case 11:
                    const idProfessorVizualizar = Number(prompt("Digite o id do professor: "));
                    const encontrarProfessorVizualizar = await professorDAO.buscarPorId(idProfessorVizualizar);
                    if (!encontrarProfessorVizualizar) {
                        console.log("Professor não encontrado");
                        break;
                    }
                    const senhaProfessorVizualizar = prompt("Digite a senha do professor: ");
                    if (encontrarProfessorVizualizar.getSenha() !== senhaProfessorVizualizar) {
                        console.log("Senha incorreta");
                        break;
                    }
                    console.log("*******PROFESSOR ******");
                    console.log(encontrarProfessorVizualizar);
                    console.log("*******CURSOS DO PROFESSOR ******");
                    const cursosProfessorVizualizar = await cursoDAO.buscarCursoProfessor(encontrarProfessorVizualizar);
                    console.log(cursosProfessorVizualizar);
                    break;
                case 12:
                    const idAlunoVizualizar = Number(prompt("Digite o id do aluno: "));
                    const encontrarAlunoVizualizar = await alunoDAO.buscarPorId(idAlunoVizualizar);
                    if (!encontrarAlunoVizualizar) {
                        console.log("Aluno não encontrado");
                        break;
                    }
                    const senhaAlunoVizualizar = prompt("Digite a senha do aluno: ");
                    if (encontrarAlunoVizualizar.getSenha() !== senhaAlunoVizualizar) {
                        console.log("Senha incorreta");
                        break;
                    }
                    console.log("*******ALUNO ******");
                    console.log(encontrarAlunoVizualizar);
                    break;
                case 13:
                    const idAlunoMatriculado = Number(prompt("Digite o id do aluno: "));
                    const encontrarAlunoMatriculado = await alunoDAO.buscarPorId(idAlunoMatriculado);
                    if (!encontrarAlunoMatriculado) {
                        console.log("Aluno não encontrado");
                        break;
                    }
                    const senhaAlunoMatriculado = prompt("Digite a senha do aluno: ");
                    if (encontrarAlunoMatriculado.getSenha() !== senhaAlunoMatriculado) {
                        console.log("Senha incorreta");
                        break;
                    }
                    const cursosDoAluno = await cursoDAO.buscarCursoAlunoPorId(encontrarAlunoMatriculado.getId());
                    console.log("*******CURSOS DO ALUNO ******");
                    console.log(cursosDoAluno);
                    console.log("**************************");
                    break;
                case 14:
                    const idProfessorDeletar = Number(prompt("Digite o id do professor que deseja deletar: "));
                    const encontrarProfessorDeletar = await professorDAO.buscarPorId(idProfessorDeletar);
                    if (!encontrarProfessorDeletar) {
                        console.log("Professor não encontrado");
                        break;
                    }
                    const senhaProfessorDeletar = prompt("Digite a senha do professor: ");
                    if (encontrarProfessorDeletar.getSenha() !== senhaProfessorDeletar) {
                        console.log("Senha incorreta");
                        break;
                    }
                    const cursosDoProfessor = await cursoDAO.buscarCursoProfessor(encontrarProfessorDeletar);
                    for (const curso of cursosDoProfessor) {
                        await cursoDAO.deletar(curso.getId());
                    }
                    const professorDeletado = await professorDAO.deletar(idProfessorDeletar);
                    if (professorDeletado) {
                        console.log("Professor deletado com sucesso!");
                    }
                    else {
                        console.log("Erro ao deletar professor");
                    }
                    break;
                default:
                    console.log("Opção inválida");
            }
        } while (opcao != 0);
    }
    catch (err) {
        console.log(err);
    }
}
main();
