import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { Aluno } from "./entity/Aluno";
import { RepositoryMetods } from "./repositories/RepositoryMetods";
import { AlunoRepository } from "./repositories/AlunoRepository";
import { Professor } from "./entity/Professor";
import { Curso } from "./entity/Curso";
import { CursoAluno } from "./entity/CursoAluno";
import { ProfessoRepository } from "./repositories/ProfessorRepository";
import { CursoAlunoRepository } from "./repositories/CursoAlunoRepository";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "typeorm",
  synchronize: true,
  logging: false,
  entities: [Aluno, Professor,Curso,CursoAluno],
  migrations: [],
  subscribers: [],
  extra: {
    repositories: [RepositoryMetods, Repository, AlunoRepository,ProfessoRepository,CursoAlunoRepository],
  },
});
