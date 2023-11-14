import Conexao from "./DAO/Conexao";
import { CursoDAO } from "./DAO/CursoDAO";
import { ProfessorDAO } from "./DAO/ProfessorDAO";
import { Curso } from "./Entidades/Curso";
import { Professor } from "./Entidades/Professor";

async function cadastrarProfessor() {
  try {
    const conexao = new Conexao();
    const professorDAO = new ProfessorDAO(conexao);

    // Cadastrar um professor
    const professor = new Professor("João", "999999999", "Joao@gmail.com");

    // const cadastrarProfessor = await professorDAO.cadastrar(professor);
    // const deletar = await professorDAO.deletar(4);
    // const professores = await professorDAO.buscarTodos();
    // console.log(professores);

    const cursoDAO = new CursoDAO(conexao);
    const curso = new Curso("Curso de Python", 40, "fechado");

    // const cadastrarCurso = await cursoDAO.cadastrar(curso);

    // const deletar = await cursoDAO.deletar(1);

    const atualizar = await cursoDAO.atualizar(2, curso);
    const cursos = await cursoDAO.buscarTodos();
    console.log(cursos);
  } catch (err) {
    console.log(err);
  }
}

cadastrarProfessor();
