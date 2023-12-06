import "reflect-metadata";
import { RepositoryMetods } from "./RepositoryMetods";
import { Professor } from "../entity/Professor";
import { AppDataSource } from "../AppDataSource";

export class ProfessoRepository extends RepositoryMetods<Professor> {
  constructor() {
    super(Professor);
  }

  async buscarPorEmail(email: string): Promise<Professor> {
    return AppDataSource.getRepository(Professor)
      .createQueryBuilder("professor")
      .where({ email: email })
      .getOne();
  }
}

