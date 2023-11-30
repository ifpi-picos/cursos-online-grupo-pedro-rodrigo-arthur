import "reflect-metadata";
import { CursoAlunoRepository } from "../repositories/CursoAlunoRepository";
import { CursoAluno } from "../entity/CursoAluno";
import { UpdateResult } from "typeorm";
export class CursoAlunoServices extends CursoAlunoRepository {
  constructor() {
    super();
  }

  async buscarPorId(id: number) {
    return super.buscarPorId(id);
  }

  async buscarTodos() {
    return super.buscarTodos();
  }

  async deletar(id: number) {
    return super.deletar(id);
  }

  async cadastro(objeto: CursoAluno) {
    const cadastroCursoAluno = await super.salvar(objeto);
    if (!cadastroCursoAluno) throw new Error("Curso não cadastrado");

    return cadastroCursoAluno;
  }

  async atualizar(id: number, objeto: CursoAluno): Promise<UpdateResult> {
    return super.atualizar(id, objeto);
  }

  async buscarIdAluno(id: number): Promise<CursoAluno[]> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    return cursos.filter((curso) => curso.id_aluno === id);
  }
}
