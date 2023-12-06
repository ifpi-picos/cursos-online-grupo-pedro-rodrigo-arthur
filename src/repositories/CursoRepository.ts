import { UpdateResult } from "typeorm";
import { Curso } from "../entity/Curso";
import { RepositoryMetods } from "./RepositoryMetods";

export class CursoRepository extends RepositoryMetods<Curso> {
  constructor() {
    super(Curso);
  }

  async buscarCursosIdProfessor(idProfessor: number): Promise<Curso[]> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    return cursos.filter((curso) => curso.id_professor === idProfessor);
  }
}
