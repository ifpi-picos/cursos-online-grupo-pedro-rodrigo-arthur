import { AlunoDAO } from "./DAO/AlunoDAO";
import Conexao from "./DAO/Conexao";
import { CursoAlunoDAO } from "./DAO/CursoAlunoDAO";
import { CursoDAO } from "./DAO/CursoDAO";
import { ProfessorDAO } from "./DAO/ProfessorDAO";
import { StatusAluno } from "./ENUM/StatusAluno";
import { StatusCurso } from "./ENUM/StatusCurso";
import { Aluno } from "./Entidades/Aluno";
import { Curso } from "./Entidades/Curso";

import { Professor } from "./Entidades/Professor";

async function cadastrarProfessor() {
  try {
    const conexao = new Conexao();
    const cursoAlunoDAO = new CursoAlunoDAO(conexao);
    const alunoDAO = new AlunoDAO(conexao);
    const cursoDAO = new CursoDAO(conexao);
    const professorDAO = new ProfessorDAO(conexao);

    const professor3 = new Professor("Pedro", "333333", "pedro@gmail.com");

    // const professorCadastrado = await professorDAO.cadastrar(professor3);

    const curso1 = new Curso("Biaologia", 100, StatusCurso.INATIVO);

    // if (professorCadastrado) {
    //   console.log("Professor cadastrado com sucesso!");
    // } else {
    //   console.log("Erro ao cadastrar professor");
    // }

    const cursoCadastrado = await cursoDAO.cadastrar(curso1);

    const aluno1 = new Aluno("João", "123456789", 9999999, StatusAluno.ATIVO);
    // const cadastrarAluno = await alunoDAO.cadastrar(aluno1);

    // const deletarProfessor = await professorDAO.deletar(2);
    const mostrarAluno = await alunoDAO.buscarTodos();
    const mostrarCursos = await cursoDAO.buscarTodos();
    const mostrarProfessores = await professorDAO.buscarTodos();

    console.log(mostrarCursos);
    console.log(mostrarProfessores);
    console.log(mostrarAluno);
  } catch (err) {
    console.log(err);
  }
}

cadastrarProfessor();
