import "reflect-metadata";
import { RepositoryMetods } from "./RepositoryMetods";
import { Professor } from "../entity/Professor";
import { AppDataSource } from "../AppDataSource";
import { UpdateResult } from "typeorm";

export abstract class ProfessoRepository extends RepositoryMetods<Professor> {
  constructor() {
    super(Professor);
  }

  async buscarPorId(id: number): Promise<Professor> {
    return super.buscarPorId(id);
  }

  async buscarTodos(): Promise<Professor[]> {
    return super.buscarTodos();
  }

  async deletar(id: number): Promise<Professor> {
    return super.deletar(id);
  }

  async salvar(objeto: Professor): Promise<Professor> {
    return super.salvar(objeto);
  }

  async buscarPorEmail(email: string): Promise<Professor> {
    return AppDataSource.getRepository(Professor)
      .createQueryBuilder("professor")
      .where({ email: email })
      .getOne();
  }

  async atualizar(id: number, objeto: Professor): Promise<UpdateResult> {
    return super.atualizar(id, objeto);
  }
}

