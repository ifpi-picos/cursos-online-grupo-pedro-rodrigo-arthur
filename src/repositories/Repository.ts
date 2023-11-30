import "reflect-metadata";
import { UpdateResult } from "typeorm";
export interface Repository<T> {
  salvar(objeto: T): Promise<T>;
  atualizar(id: number, objeto: T): Promise<UpdateResult>;
  deletar(id: number): Promise<T>;
  buscarTodos(): Promise<T[]>;
  buscarPorId(id: number): Promise<T>;
}
