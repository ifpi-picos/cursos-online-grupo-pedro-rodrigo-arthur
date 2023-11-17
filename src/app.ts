import { AlunoDAO } from "./DAO/AlunoDAO";
import Conexao from "./DAO/Conexao";
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
    const alunoDAO = new AlunoDAO(conexao);
    const cursoDAO = new CursoDAO(conexao);
    const professorDAO = new ProfessorDAO(conexao);

    const professor3 = new Professor("Pedro", "77777", "jesiell@gmail.com");

    const professorCadastrado = await professorDAO.cadastrar(professor3);

    if (professorCadastrado) {
      console.log("Professor cadastrado com sucesso!");
      console.log(professorCadastrado.getEmail());
      console.log(professorCadastrado.getTelefone());
      console.log(professorCadastrado.getNome());

      // verificar se o id é nulo
      if (professorCadastrado?.getId()) {
        console.log(professorCadastrado.getId());
      } else {
        console.log("O id do professor é nulo.");
      }
    } else {
      console.log("Erro ao cadastrar professor");
    }

    const curso1 = new Curso("Curso 3", 100, StatusCurso.INATIVO);
    const cursoCadastrado = await cursoDAO.cadastrar(curso1);
    // console.log(cadastrado?.getId());

    const cadastarCursoProfessor = await cursoDAO.criarTabelaCursoProfessor(
      cursoCadastrado.getId(),
      professorCadastrado.getId()
    );
  } catch (err) {
    console.log(err);
  }
}

cadastrarProfessor();
