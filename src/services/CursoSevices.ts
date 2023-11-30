import "reflect-metadata";
import { CursoRepository } from "../repositories/CursoRepository";
import { Curso } from "../entity/Curso";
import { UpdateResult } from "typeorm";
export class CursoServices extends CursoRepository {
  constructor() {
    super();
  }

  async buscarPorId(id: number): Promise<Curso> {
    const buscarID = await super.buscarPorId(id);

    if (!buscarID) throw new Error("Curso não encontrado");

    const buscaId = super.buscarPorId(buscarID.id);

    return buscaId;
  }

  async buscarTodos(): Promise<Curso[]> {
    const buscaTodos = await super.buscarTodos();
    if (!buscaTodos) throw new Error("Nenhum curso cadastrado");
    return buscaTodos;
  }

  async deletar(id: number): Promise<Curso> {
    const buscarIdd = await this.buscarPorId(id);

    const cursoDeletado = super.deletar(buscarIdd.id);
    return cursoDeletado;
  }

  async atualizar(id: number, objeto: Curso): Promise<UpdateResult> {
    const buscaIdCurso = await this.buscarPorId(id);

    const cursoAtualizado = super.atualizar(buscaIdCurso.id, objeto);
    return cursoAtualizado;
  }

  async cadastrar(curso: Curso): Promise<Curso> {
    const cursoSalvo = super.salvar(curso);
    return cursoSalvo;
  }
}
