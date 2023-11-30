import "reflect-metadata";
import { AppDataSource } from "../AppDataSource";
import { Repository } from "./Repository";

export abstract class RepositoryMetods<T> implements Repository<T> {
  private entityClass: { new (): T };

  constructor(entityClass: { new (): T }) {
    this.entityClass = entityClass;
  }

  async salvar(objeto: T): Promise<T> {
    return AppDataSource.getRepository(this.entityClass)
      .save(objeto)
      .then((objeto) => {
        return objeto as T;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async atualizar(id: number, objeto: T) {
    return await AppDataSource.getRepository(this.entityClass)
      .update(id, objeto as any)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async deletar(id: number): Promise<T> {
    await AppDataSource.getRepository(this.entityClass).delete(id);
    return {} as T;
  }

  async buscarTodos(): Promise<T[]> {
    return AppDataSource.getRepository(this.entityClass)
      .createQueryBuilder("entity")
      .getMany();
  }

  async buscarPorId(id: number): Promise<T> {
    return AppDataSource.getRepository(this.entityClass)
      .createQueryBuilder("entity")
      .where("entity.id = :id", { id: id })
      .getOne()
      .then((objeto) => {
        return objeto as T;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
