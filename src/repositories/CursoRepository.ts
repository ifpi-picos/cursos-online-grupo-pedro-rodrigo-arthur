import { UpdateResult } from "typeorm";
import { Curso } from "../entity/Curso";
import { RepositoryMetods } from "./RepositoryMetods";

export abstract class CursoRepository extends RepositoryMetods<Curso> {
  constructor() {
    super(Curso);
  }

  async buscarPorId(id: number): Promise<Curso> {
    return super.buscarPorId(id);
  }

  async buscarTodos(): Promise<Curso[]> {
    return super.buscarTodos();
  }

  async deletar(id: number): Promise<Curso> {
    return super.deletar(id);
  }

  async salvar(objeto: Curso): Promise<Curso> {
    return super.salvar(objeto);
  }

  async atualizar(id: number, objeto: Curso): Promise<UpdateResult> {
    return super.atualizar(id, objeto);
  }

  async buscarCursosIdProfessor(id: number): Promise<Curso[]> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    return cursos.filter((curso) => curso.id_professor === id);
  }
}
