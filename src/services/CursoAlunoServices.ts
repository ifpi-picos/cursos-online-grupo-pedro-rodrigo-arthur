import "reflect-metadata";
import { CursoAlunoRepository } from "../repositories/CursoAlunoRepository";
import { CursoAluno } from "../entity/CursoAluno";
import { UpdateResult } from "typeorm";
export class CursoAlunoServices {

  private cursoAlunoRepository : CursoAlunoRepository;
  
  constructor(cursoAlunoRepository: CursoAlunoRepository) {
    this.cursoAlunoRepository = cursoAlunoRepository;
  }

  async buscarPorId(id: number) {
    const cursosAlunos = await this.buscarTodos();
    const cursoAluno = cursosAlunos.filter((curso) => curso.id_curso === id);
    if (cursoAluno.length === 0) {
      throw new Error("Curso não encontrado");
    }
    return cursoAluno;
  }

  async buscarTodos() {
    const busccarTodos = await this.cursoAlunoRepository.buscarTodos();

    if (!busccarTodos) {
      throw new Error("Nenhum curso cadastrado");
    }
    return busccarTodos;
  }

  async cadastro(objeto: CursoAluno) {
    const cadastroCursoAluno = await this.cursoAlunoRepository.salvar(objeto);
    if (!cadastroCursoAluno) throw new Error("Curso não cadastrado");

    return cadastroCursoAluno;
  }

  async desmatricularAluno(idCurso: number, idAluno: number) {
    const desmatricular = await this.cursoAlunoRepository.desmatricular(idCurso, idAluno);
    if (!desmatricular) throw new Error("Curso não encontrado");

    return desmatricular;
  }

  async buscarIdAluno(id: number): Promise<CursoAluno[]> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    return cursos.filter((curso) => curso.id_aluno === id);
  }

  async atualizarCursoAluno({ idCurso, idAluno }: { idCurso: number, idAluno: number }, cursoAluno: CursoAluno) {
    return this.cursoAlunoRepository.atualizarCursoAlunoMatricula({ id_curso: idCurso, id_aluno: idAluno }, cursoAluno);
  }

  async quantidadeDeAlunosPorCurso(idCurso: number): Promise<number> {
    const quantidade = await this.cursoAlunoRepository.quantidadeDeAlunosPorCurso(idCurso);
    return parseInt(quantidade.toString());
  }

  async desmatricular(idCurso: number, idAluno: number): Promise<UpdateResult> {
    return this.cursoAlunoRepository.desmatricular(idCurso, idAluno);
  }
   
}
