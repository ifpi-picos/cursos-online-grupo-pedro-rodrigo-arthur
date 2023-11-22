import { AlunoDAO } from "./DAO/AlunoDAO";
import Conexao from "./DAO/Conexao";
import { CursoDAO } from "./DAO/CursoDAO";
import { ProfessorDAO } from "./DAO/ProfessorDAO";
import { StatusAluno } from "./ENUM/StatusAluno";
import { StatusCurso } from "./ENUM/StatusCurso";
import { Aluno } from "./Entidades/Aluno";
import { Curso } from "./Entidades/Curso";

import { Professor } from "./Entidades/Professor";
const prompt = require("prompt-sync")();
async function main() {
  try {
    const conexao = new Conexao();
    const cursoDAO = new CursoDAO(conexao);
    const professorDAO = new ProfessorDAO(conexao);
    const alunoDAO = new AlunoDAO(conexao);

    let opcao: number;
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
      console.log("10 - Listar cursos por professor");
      opcao = Number(prompt("Digite a opção desejada: "));
      console.log("******************************");

      switch (opcao) {
        case 1:
          const nomeProfessor: string = prompt("Digite o nome do professor: ");
          const telefoneProfessor: string = prompt(
            "Digite o telefone do professor: "
          );
          const emailProfessor: string = prompt(
            "Digite o email do professor: "
          );
          const senhaProfessor: string = prompt(
            "Digite a senha do professor: "
          );
          const professor = new Professor(
            nomeProfessor,
            telefoneProfessor,
            emailProfessor,
            senhaProfessor
          );
          const professorCadastrado = await professorDAO.cadastrar(professor);
          if (professorCadastrado) {
            console.log("Professor cadastrado com sucesso!");
          } else {
            console.log("Erro ao cadastrar professor");
          }
          break;
        case 2:
          const nomeCurso: string = prompt("Digite o nome do curso: ");
          const cargaHorariaCurso: number = prompt(
            "Digite a carga horária do curso: "
          );
          const statusCurso: StatusCurso = Number(
            prompt("Digite o status do curso (1:ABERTO || 0: FECHADO): ")
          );
          const idProfessorCad: number = prompt("Digite o id do professor: ");
          statusCurso.toString();
          const curso = new Curso(
            nomeCurso,
            cargaHorariaCurso,
            statusCurso,
            idProfessorCad
          );
          const cursoCadastrado = await cursoDAO.cadastrar(curso);
          if (cursoCadastrado) {
            console.log("Curso cadastrado com sucesso!");
          } else {
            console.log("Erro ao cadastrar curso");
          }
          break;
        case 3:
          const nomeAluno: string = prompt("Digite o nome do aluno: ");
          const telefoneAluno: string = prompt("Digite o telefone do aluno: ");
          const emailAluno: string = prompt("Digite o email do aluno: ");
          const statusAluno: string | number = Number(
            prompt("Digite o status do aluno (1:ATIVO || 0:INATIVO): ")
          );
          const senhaAluno: string = prompt("Digite a senha do aluno: ");
          const aluno = new Aluno(
            nomeAluno,
            emailAluno,
            telefoneAluno,
            statusAluno as StatusAluno,
            senhaAluno
          );
          const alunoCadastrado = await alunoDAO.cadastrar(aluno);
          if (alunoCadastrado) {
            console.log("Aluno cadastrado com sucesso!");
          } else {
            console.log("Erro ao cadastrar aluno");
          }
          break;
        case 4:
          const idAluno: number = Number(prompt("Digite o id do aluno: "));
          const idCurso: number = Number(prompt("Digite o id do curso: "));
          const notas: number[] = [];

          const encontrarAluno = await alunoDAO.buscarPorId(idAluno);
          const encontrarCurso = await cursoDAO.buscarPorId(idCurso);

          if (!encontrarAluno || !encontrarCurso) {
            console.log("Aluno ou curso não encontrado");
            break;
          }
          for (let i = 0; i < 3; i++) {
            notas.push(Number(prompt(`Digite a ${i + 1}ª nota do aluno: `)));
          }

          const alunoMatriculado = await cursoDAO.criarTabelaCursoAluno(
            encontrarCurso,
            encontrarAluno,
            notas
          );
          if (alunoMatriculado) {
            console.log("Aluno matriculado com sucesso!");
          }
          break;
        case 5:
          const idProfessor: number = Number(
            prompt("Digite o id do professor: ")
          );
          const encontrarProfessor = await professorDAO.buscarPorId(
            idProfessor
          );
          if (!encontrarProfessor) {
            console.log("Professor não encontrado");
            break;
          }

          const nomeProfessorAtualizado: string = prompt(
            "Digite o nome do professor: "
          );
          const telefoneProfessorAtualizado: string = prompt(
            "Digite o telefone do professor: "
          );
          const emailProfessorAtualizado: string = prompt(
            "Digite o email do professor: "
          );
          const senhaProfessorAtualizado: string = prompt(
            "Digite a senha do professor: "
          );
          const professorAtualizado = new Professor(
            nomeProfessorAtualizado,
            telefoneProfessorAtualizado,
            emailProfessorAtualizado,
            senhaProfessorAtualizado,
            idProfessor
          );
          const professorAlterado = await professorDAO.atualizar(
            idProfessor,
            professorAtualizado
          );
          if (professorAlterado) {
            console.log("Professor alterado com sucesso!");
          } else {
            console.log("Erro ao alterar professor");
          }
          break;
        case 6:
          const idAlunoAtualizado: number = Number(
            prompt("Digite o id do aluno: ")
          );
          const encontrarAlunoAtualizado = await alunoDAO.buscarPorId(
            idAlunoAtualizado
          );
          if (!encontrarAlunoAtualizado) {
            console.log("Aluno não encontrado");
            break;
          }
          const nomeAlunoAtualizado: string = prompt(
            "Digite o nome do aluno: "
          );
          const telefoneAlunoAtualizado: string = prompt(
            "Digite o telefone do aluno: "
          );
          const emailAlunoAtualizado: string = prompt(
            "Digite o email do aluno: "
          );
          const statusAlunoAtualizado: StatusAluno | number = Number(
            prompt("Digite o status do aluno: ")
          );
          const senhaAlunoAtualizado: string = prompt(
            "Digite a senha do aluno: "
          );
          const alunoAtualizado = new Aluno(
            nomeAlunoAtualizado,
            emailAlunoAtualizado,
            telefoneAlunoAtualizado,
            statusAlunoAtualizado,
            senhaAlunoAtualizado,
            idAlunoAtualizado
          );
          const alunoAlterado = await alunoDAO.atualizar(
            idAlunoAtualizado,
            alunoAtualizado
          );
          if (alunoAlterado) {
            console.log("Aluno alterado com sucesso!");
          } else {
            console.log("Erro ao alterar aluno");
          }
          break;
        case 7:
          const alunos = await alunoDAO.buscarTodos();
          console.log("*******ALUNOS CADASTRADOS ******");
          console.log(alunos);
          break;
        case 8:
          const cursos = await cursoDAO.buscarTodos();
          console.log("*******CURSOS CADASTRADOS ******");
          console.log(cursos);
          break;
        case 9:
          const professores = await professorDAO.buscarTodos();
          console.log("*******PROFESSORES CADASTRADOS ******");
          console.log(professores);
          break;
        case 10:
          const idProfessorCurso: number = Number(
            prompt("Digite o id do professor: ")
          );
          const encontrarProfessorCurso = await professorDAO.buscarPorId(
            idProfessorCurso
          );
          if (!encontrarProfessorCurso) {
            console.log("Professor não encontrado");
            break;
          }
          const cursosProfessor = await cursoDAO.buscarCursoProfessor(
            encontrarProfessorCurso
          );
          console.log("*******CURSOS DO PROFESSOR ******");
          console.log(cursosProfessor);
          break;
      }
    } while (opcao != 0);
  } catch (err) {
    console.log(err);
  }
}

main();
