import "reflect-metadata";
import { CursoAluno } from "../entity/CursoAluno";
import { RepositoryMetods } from "./RepositoryMetods";
import { UpdateResult } from "typeorm";
import { AppDataSource } from "../AppDataSource";
import { StatusMatricula } from "../ENUM/StatusMatricula";

export class CursoAlunoRepository extends RepositoryMetods<CursoAluno> {
  constructor() {
    super(CursoAluno);
  }

  async buscarPorId(id: number): Promise<CursoAluno> {
    const cursoAluno = await this.buscarTodos();
    return cursoAluno.find((curso) => curso.id_curso === id);
  }

  async buscarTodos(): Promise<CursoAluno[]> {
    return AppDataSource.getRepository(CursoAluno)
      .createQueryBuilder("curso_aluno")
      .getMany();
  }

  async deletarCursoAluno(idCurso: number, idAluno: number): Promise<void> {
    const cursoAlunoToDelete = await AppDataSource.getRepository(
      CursoAluno
    ).findOne({ where: { id_aluno: idAluno, id_curso: idCurso } });

    if (!cursoAlunoToDelete) {
      throw new Error("CursoAluno não encontrado");
    }

    await AppDataSource.getRepository(CursoAluno).delete(cursoAlunoToDelete);
  }

  async salvar(objeto: CursoAluno): Promise<CursoAluno> {
    const {
      nota1,
      nota2,
      nota3,
      id_aluno,
      id_curso,
      media,
      situacao,
      statusmatricula,
    } = objeto;

    const cadastro = new CursoAluno();
    cadastro.id_aluno = id_aluno;
    cadastro.id_curso = id_curso;
    cadastro.nota1 = nota1;
    cadastro.nota2 = nota2;
    cadastro.nota3 = nota3;
    cadastro.media = ((nota1 + nota2 + nota3) / 3).toFixed(2) as any;
    cadastro.situacao = cadastro.media >= 7 ? "Aprovado" : "Reprovado";
    cadastro.statusmatricula = statusmatricula;
    return super.salvar(cadastro);
  }

  async atualizarCursoAlunoMatricula(
    { id_curso, id_aluno }: { id_curso: number; id_aluno: number},
    cursoAluno: CursoAluno
  ): Promise<any> {
    const cursoAlunoAtualizado = await this.buscarPorId(id_curso);
    if (!cursoAlunoAtualizado) {
      throw new Error("Curso não encontrado");
    }
    if (cursoAlunoAtualizado.id_aluno !== id_aluno) {
      throw new Error("Aluno não matriculado no curso");
    }

    const { nota1, nota2, nota3, media, situacao, statusmatricula } = cursoAluno;

    cursoAlunoAtualizado.nota1 = nota1;
    cursoAlunoAtualizado.nota2 = nota2;
    cursoAlunoAtualizado.nota3 = nota3;
    cursoAlunoAtualizado.media = media;
    cursoAlunoAtualizado.situacao = situacao;
    cursoAlunoAtualizado.statusmatricula = statusmatricula;
    cursoAlunoAtualizado.id_curso = id_curso;
    cursoAlunoAtualizado.id_aluno = id_aluno;

    return this.salvar(cursoAlunoAtualizado);
  }

  async buscarIdAluno(idAluno: number): Promise<CursoAluno[]> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    return cursos.filter((curso) => curso.id_aluno === idAluno);
  }

  async quantidadeDeAlunosPorCurso(id: number): Promise<number> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    return cursos.filter((curso) => curso.id_aluno).length;
  }

  async porcentagemDeAlunosAprovadosPorCurso(id: number): Promise<string> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    const alunos = cursos.filter((curso) => curso.id_curso === id);
    const alunosAprovados = alunos.filter((aluno) => aluno.situacao === "Aprovado");
    const porcentagem =  (alunosAprovados.length / alunos.length) * 100;

    return porcentagem.toFixed(2) + "%";
  }

  async porcentagemDeAlunosReprovadosPorCurso(id: number): Promise<string> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    const alunos = cursos.filter((curso) => curso.id_curso === id);
    const alunosReprovados = alunos.filter((aluno) => aluno.situacao === "Reprovado");
    const porcentagem = (alunosReprovados.length / alunos.length) * 100;
    return porcentagem.toFixed(2) + "%";
  }

  async mediaGeralDeAlunosPorCurso(id: number): Promise<number> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    const alunos = cursos.filter((curso) => curso.id_curso === id);
    const mediaGeral = alunos.reduce((acc, aluno) => acc + Number(aluno.media), 0);
    return mediaGeral / alunos.length;
  }

  async cursosConcluidosPorAluno(id: number): Promise<CursoAluno[]> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    return cursos.filter((curso) => curso.id_aluno === id && curso.situacao === "Aprovado");
  }

  async cursosAlunoMatriculado(id: number): Promise<CursoAluno[]> {
    const cursos = await this.buscarTodos();
    if (cursos.length === 0) {
      throw new Error("Nenhum curso cadastrado");
    }
    return cursos.filter((curso) => curso.id_aluno === id && curso.statusmatricula === "MATRICULADO");
  }

  async desmatricular(idCurso: number, idAluno: number): Promise<UpdateResult> {
    try{
    const cursoAluno = await this.buscarTodos();
    if (!cursoAluno) {
      throw new Error("Curso não encontrado");
    }
    const alunoMatriculado = cursoAluno.filter((curso) => curso.id_curso === idCurso && curso.id_aluno === idAluno);
    if (alunoMatriculado.length === 0) {
      throw new Error("Aluno não matriculado no curso");
    }
    alunoMatriculado[0].statusmatricula = StatusMatricula.CANCELADO;
    return this.atualizarCursoAlunoMatricula({id_curso: idCurso, id_aluno: idAluno}, alunoMatriculado[0]);
  }catch(error){
      throw new Error(error);
    }
    
  }
}
