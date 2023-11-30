import { DataSource } from "typeorm";
import { AppDataSource } from "./AppDataSource";
import { Aluno } from "./entity/Aluno";
import { AlunoRepository } from "./repositories/AlunoRepository";
import { StatusAluno } from "./ENUM/StatusAluno";
import { Professor } from "./entity/Professor";
import { ProfessoRepository } from "./repositories/ProfessorRepository";
import { AlunoServices } from "./services/AlunoServices";
import { ProfessorServices } from "./services/ProfessorServices";
import { CursoServices } from "./services/CursoSevices";
import { Curso } from "./entity/Curso";
import { StatusCurso } from "./ENUM/StatusCurso";
import { CursoAlunoServices } from "./services/CursoAlunoServices";
import { CursoAluno } from "./entity/CursoAluno";
import { StatusMatricula } from "./ENUM/StatusMatricula";

AppDataSource.initialize()
  .then(async () => {
    const cursoServices = new CursoServices();
    const alunoServices = new AlunoServices();
    const cursoAlunoServices = new CursoAlunoServices();

    const aluno = new Aluno();
    aluno.nome = "Aluno 2";
    aluno.email = "aluno2@gmail.com";
    aluno.status = StatusAluno.ATIVO;
    aluno.telefone = "444444";
    aluno.senha = "123";
    await alunoServices.cadastrar(aluno);

    const curso = new Curso();
    curso.nome = "Curso de java";
    curso.carga_horaria = 200;
    curso.status = StatusCurso.ABERTO;
    curso.idProfessor = 1;
    // await cursoServices.cadastar(curso);

    const cursoAluno = new CursoAluno();
    cursoAluno.id_aluno = 2;
    cursoAluno.id_curso = 1;
    cursoAluno.nota1 = 8;
    cursoAluno.nota2 = 7;
    cursoAluno.nota3 = 10;
    cursoAluno.statusmatricula = StatusMatricula.MATRICULADO;
  })
  .catch((error) => console.log(error));
