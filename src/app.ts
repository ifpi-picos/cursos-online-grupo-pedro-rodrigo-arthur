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
      console.log("1 - Cadastrar Professor");
      console.log("2 - Cadastrar Curso");
      console.log("3 - Cadastrar Aluno");
      console.log("4 - Matricular Aluno");
      console.log("5 - Alterar Status do Curso");
      console.log("6 - Alterar Status do Aluno");
      console.log("7 - Listar Alunos");
      console.log("8 - Listar Cursos");
      console.log("9 - Listar Professores");
      console.log("10 - Sair");
      opcao = Number(prompt("Digite a opção desejada: "));

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
          const statusCurso: StatusCurso = prompt("Digite o status do curso: ");
          const professorCad: number = prompt("Digite o id do professor: ");
          statusCurso.toString();
          const curso = new Curso(
            nomeCurso,
            cargaHorariaCurso,
            statusCurso,
            professorCad
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
          const statusAluno: StatusAluno = prompt("Digite o status do aluno: ");
          const senhaAluno: string = prompt("Digite a senha do aluno: ");
          senhaAluno.toString();
          const aluno = new Aluno(
            nomeAluno,
            emailAluno,
            telefoneAluno,
            statusAluno,
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
          const idAluno: number = prompt("Digite o id do aluno: ");
          const idCurso: number = prompt("Digite o id do curso: ");
          const notas: number[] = [];
          for (let i = 0; i < 3; i++) {
            notas.push(prompt(`Digite a ${i + 1}ª nota do aluno: `));
          }
          const encontrarAluno = await alunoDAO.buscarPorId(idAluno);
          const encontrarCurso = await cursoDAO.buscarPorId(idCurso);

          if (!encontrarAluno || !encontrarCurso) {
            console.log("Aluno ou curso não encontrado");
            break;
          }

          const [cursoAluno, alunoMatriculado] =
            await cursoDAO.criarTabelaCursoAluno(
              encontrarCurso,
              encontrarAluno,
              notas
            );
          break;
      }
    } while (opcao != 0);
  } catch (err) {
    console.log(err);
  }
}

main();
