import "reflect-metadata";
import { AppDataSource } from "../AppDataSource";
import { Repository } from "./Repository";

export abstract class RepositoryMetods<T> implements Repository<T> {
  private entityClass: { new (): T };

  constructor(entityClass: { new (): T }) {
    this.entityClass = entityClass;
  }

  async salvar(objeto: T): Promise<T> {
    try{
    return AppDataSource.getRepository(this.entityClass)
      .save(objeto)
      .then((objeto) => {
        return objeto as T;
      })
      .catch((error) => {
        throw new Error(error);
      });
    }catch(error){
      throw new Error(error);
    }
  }

  async atualizar(id: number, objeto: T) {
    try{
      const update = await AppDataSource.getRepository(this.entityClass).update(id,objeto as any);
      return update;
    }catch(error){
      throw new Error(error);
    }
    }

  async deletar(id: number): Promise<T> {
    try{
    await AppDataSource.getRepository(this.entityClass).delete(id);
    return {} as T;
    }catch(error){
      throw new Error(error);
    }
  }

  async buscarTodos(): Promise<T[]> {
    try{
    return AppDataSource.getRepository(this.entityClass)
      .createQueryBuilder("entity")
      .getMany();
    }catch(error){
      throw new Error(error);
    }
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
