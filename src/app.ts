import { AlunoDAO } from "./DAO/AlunoDAO";
import Conexao from "./DAO/Conexao";
import { CursoDAO } from "./DAO/CursoDAO";
import { ProfessorDAO } from "./DAO/ProfessorDAO";
import { StatusAluno } from "./ENUM/StatusAluno";
import { StatusCurso } from "./ENUM/StatusCurso";
import { Aluno } from "./Entidades/Aluno";
import { Curso } from "./Entidades/Curso";

import { Professor } from "./Entidades/Professor";

async function main() {
  try {
    const conexao = new Conexao();
    const cursoDAO = new CursoDAO(conexao);
    const professorDAO = new ProfessorDAO(conexao);
    const alunoDAO = new AlunoDAO(conexao);

    const professor = new Professor(
      "Jose",
      "8888888",
      "Jose@gmail.com",
      "admin1"
    );
    const professorCadastrado = await professorDAO.cadastrar(professor);

    const curso = new Curso(
      "Curso de POO",
      100,
      StatusCurso.ABERTO,
      professorCadastrado
    );

    const cursoCadastrado = await cursoDAO.cadastrar(curso);

    console.log(cursoCadastrado.getProfessor());
  } catch (err) {
    console.log(err);
  }
}

main();
