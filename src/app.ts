import { AlunoDAO } from "./DAO/AlunoDAO";
import Conexao from "./DAO/Conexao";
import { CursoDAO } from "./DAO/CursoDAO";
import { StatusAluno } from "./ENUM/StatusAluno";
import { StatusCurso } from "./ENUM/StatusCurso";
import { Aluno } from "./Entidades/Aluno";
import { Curso } from "./Entidades/Curso";

import { Professor } from "./Entidades/Professor";

async function cadastrarProfessor() {
  try {
    const conexao = new Conexao();
    const cursoDAO = new CursoDAO(conexao);
    const cursoCadastrado = await cursoDAO.cadastrar(
      new Curso(
        "Curso de Programação",
        200,
        StatusCurso.INATIVO,
        new Professor("Joao", "3333333", "joao@gmail.com")
      )
    );
  } catch (err) {
    console.log(err);
  }
}

cadastrarProfessor();
