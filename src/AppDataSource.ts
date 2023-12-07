import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { Aluno } from "./entity/Aluno";
import { RepositoryMetods } from "./repositories/RepositoryMetods";
import { AlunoRepository } from "./repositories/AlunoRepository";
import { ProfessoRepository } from "./repositories/ProfessorRepository";
import { Professor } from "./entity/Professor";
import { CursoAlunoRepository } from "./repositories/CursoAlunoRepository";
import { CursoAluno } from "./entity/CursoAluno";
import { Curso } from "./entity/Curso";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "typeorm",
  synchronize: true,
  logging: false,
  entities: [Aluno, Professor, CursoAluno, Curso],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
  extra: {
    repositories: [
      RepositoryMetods,
      Repository,
      AlunoRepository,
      ProfessoRepository,
      CursoAlunoRepository,
    ],
    services: [
      "AlunoServices",
      "ProfessorServices",
      "CursoServices",
      "CursoAlunoServices",
    ],
  },
});
