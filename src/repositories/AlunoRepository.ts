import "reflect-metadata";
import { Aluno } from "../entity/Aluno";
import { RepositoryMetods } from "./RepositoryMetods";
import { AppDataSource } from "../AppDataSource";

export class AlunoRepository extends RepositoryMetods<Aluno> {
  constructor() {
    super(Aluno);
  }

  async buscarPorEmail(email: string): Promise<Aluno> {
    return AppDataSource.getRepository(Aluno)
      .createQueryBuilder("aluno")
      .where("aluno.email = :email", { email: email })
      .getOne();
  }
}
