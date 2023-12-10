import "reflect-metadata";
import { CursoRepository } from "../repositories/CursoRepository";
import { Curso } from "../entity/Curso";
import { UpdateResult } from "typeorm";

export class CursoServices {
  private cursoRepository: CursoRepository;
  constructor(cursoRepository: CursoRepository) {
    this.cursoRepository = cursoRepository;
  }

  async buscarPorId(id: number): Promise<Curso> {
    const buscarID = await this.cursoRepository.buscarPorId(id);
    if (!buscarID) throw new Error("Curso não encontrado");
    return buscarID;
  }

  async buscarTodos(): Promise<Curso[]> {
    const buscaTodos = await this.cursoRepository.buscarTodos();
    if (!buscaTodos) throw new Error("Nenhum curso cadastrado");
    return buscaTodos;
  }

  async deletar(id: number): Promise<Curso> {
    const buscarIdd = await this.buscarPorId(id);

    return await this.cursoRepository.deletar(buscarIdd.id);
  }

  async atualizar(id: number, objeto: Curso): Promise<UpdateResult> {
    const buscaIdCurso = await this.buscarPorId(id);

    return await this.cursoRepository.atualizar(buscaIdCurso.id, objeto);
  }

  async cadastrar(curso: Curso): Promise<Curso> {
    const cursoCadastrar = await this.buscarTodos();
    // if (cursoCadastrar.some((curso) => curso.id_professor === curso.id_professor)) {
    //   throw new Error("Curso já cadastrado");
    // }
    const cursoSalvo = this.cursoRepository.salvar(curso);
    return cursoSalvo;
  }

  buscarCursosDoProfessor(id: number): Promise<Curso[]> {
    return this.cursoRepository.buscarCursosIdProfessor(id);
  }
}
