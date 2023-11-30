import "reflect-metadata";
import { Aluno } from "../entity/Aluno";
import { RepositoryMetods } from "./RepositoryMetods";
import { AppDataSource } from "../AppDataSource";
import { UpdateResult } from "typeorm";

export abstract class AlunoRepository extends RepositoryMetods<Aluno> {
  constructor() {
    super(Aluno);
  }

  async buscarTodos(): Promise<Aluno[]> {
    return super.buscarTodos();
  }

  async buscarPorId(id: number): Promise<Aluno> {
    return super.buscarPorId(id);
  }

  async deletar(id: number): Promise<Aluno> {
    return super.deletar(id);
  }

  async salvar(aluno: Aluno): Promise<Aluno> {
    return super.salvar(aluno);
  }

  async atualizar(id: number, objeto: Aluno): Promise<UpdateResult> {
    return super.atualizar(id, objeto);
  }

  async buscarPorEmail(email: string): Promise<Aluno> {
    return AppDataSource.getRepository(Aluno)
      .createQueryBuilder("aluno")
      .where("aluno.email = :email", { email: email })
      .getOne();
  }
}
