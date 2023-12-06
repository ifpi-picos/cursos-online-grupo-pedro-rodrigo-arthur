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

  async atualizarCursoAlunoService(id: number, objeto: CursoAluno): Promise<UpdateResult> {
    return super.atualizar(id, objeto);
  }

  async buscarIdAluno(id: number): Promise<CursoAluno[]> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    return cursos.filter((curso) => curso.id_aluno === id);
  }

  async desmatricular(idCurso:number,idAluno:number){
    const cursoAluno = await this.buscarPorId(idCurso);
    if(!cursoAluno){
      throw new Error("Curso não encontrado");
    }
    if(cursoAluno.id_aluno !== idAluno){
      throw new Error("Aluno não matriculado no curso");
    }

    return await this.atualizar(idCurso,cursoAluno);
  }


  async atualizarCursoAluno({idCurso, idAluno}: {idCurso: number, idAluno: number}, cursoAluno: CursoAluno) {
    const cursoAlunoAtualizado = await this.buscarPorId(idCurso);
    if (!cursoAlunoAtualizado) {
      throw new Error("Curso não encontrado");
    }
    if (cursoAlunoAtualizado.id_aluno !== idAluno) {
      throw new Error("Aluno não matriculado no curso");
    }

    const { nota1, nota2, nota3, media, situacao, statusmatricula } = cursoAluno;

    cursoAlunoAtualizado.nota1 = nota1;
    cursoAlunoAtualizado.nota2 = nota2;
    cursoAlunoAtualizado.nota3 = nota3;
    cursoAlunoAtualizado.media = media;
    cursoAlunoAtualizado.situacao = situacao;
    cursoAlunoAtualizado.statusmatricula = statusmatricula;
    cursoAlunoAtualizado.id_curso = idCurso;
    cursoAlunoAtualizado.id_aluno = idAluno;

    return cursoAlunoAtualizado;
  }

  async quantidadeDeAlunosPorCurso(id: number): Promise<number> {
    const quantidade = await super.quantidadeDeAlunosPorCurso(id);
    return parseInt(quantidade.toString());
  }
   
}
