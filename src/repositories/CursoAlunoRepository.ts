import "reflect-metadata";
import { CursoAluno } from "../entity/CursoAluno";
import { RepositoryMetods } from "./RepositoryMetods";
import { UpdateResult } from "typeorm";
import { AppDataSource } from "../AppDataSource";

export abstract class CursoAlunoRepository extends RepositoryMetods<CursoAluno> {
  constructor() {
    super(CursoAluno);
  }

  async buscarPorId(id: number): Promise<CursoAluno> {
    return super.buscarPorId(id);
  }

  async buscarTodos(): Promise<CursoAluno[]> {
    return AppDataSource.getRepository(CursoAluno)
      .createQueryBuilder("curso_aluno")
      .getMany()
      .then((objeto) => {
        return objeto as CursoAluno[];
      });
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
