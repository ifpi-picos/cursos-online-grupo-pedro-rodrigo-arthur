import { Curso } from "../Entidades/Curso";
import { IDAO } from "./IDAO";
import Conexao from "./Conexao";
import { StatusCurso } from "../ENUM/StatusCurso";
import { Aluno } from "../Entidades/Aluno";
import { ProfessorDAO } from "./ProfessorDAO";
import { AlunoDAO } from "./AlunoDAO";
import { Professor } from "../Entidades/Professor";
import { StatusMatricula } from "../ENUM/StatusMatricula";
import test from "node:test";

export class CursoDAO implements IDAO<Curso> {
  private conexao: Conexao;

  constructor(conexao: Conexao) {
    this.conexao = conexao;
  }
  async cadastrar(t: Curso): Promise<Curso | null> {
    const insert =
      "INSERT INTO curso (nome, carga_horaria, status, id_professor) VALUES ($1, $2, $3,$4) RETURNING *";

    try {
      const status = t.getStatus() === 1 ? "ABERTO" : "FECHADO";
      const values = [
        t.getNome(),
        t.getCargaHoraria(),
        status,
        t.getProfessor(),
      ];
      const res = await this.conexao.query(insert, values);
      if (res && res[0]) {
        const curso = new Curso(
          res[0].nome,
          res[0].carga_horaria,
          res[0].status,
          res[0].idProfessor,
          res[0].id
        );
        return curso;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Erro ao cadastrar curso", err);
      return null;
    }
  }
  async buscarTodos(): Promise<Curso[]> {
    const select = "SELECT * FROM curso";

    try {
      const client = await this.conexao.query(select, []);

      if (client) {
        const cursos: Curso[] = client.map((p) => {
          return new Curso(
            p.nome,
            p.carga_horaria,
            p.status,
            p.id_professor,
            p.id
          );
        });
        return cursos;
      } else {
        return [];
      }
    } catch (err) {
      console.log("Erro na consulta de todos os cursos", err);

      return [];
    }
  }
  async atualizar(id: number, dados: Curso): Promise<Curso> {
    const update =
      "UPDATE curso SET nome = $1, carga_horaria = $2, status = $3 WHERE id = $4 RETURNING *";

    try {
      const values = [
        dados.getNome(),
        dados.getCargaHoraria(),
        dados.getStatus(),
        id,
      ];
      const res = await this.conexao.query(update, values);
      return res && res[0] ? (res[0] as Curso) : dados;
    } catch (err) {
      console.log("Erro na atualização do curso", err);
      return dados;
    }
  }
  async deletar(id: number): Promise<Curso | null> {
    const deletar = "DELETE FROM curso WHERE id = $1 RETURNING *";

    try {
      const values = [id];
      const res = await this.conexao.query(deletar, values);

      return res && res[0] ? (res[0] as Curso) : null;
    } catch (err) {
      console.log("Erro ao deletar curso", err);
      return null;
    }
  }
  async buscarPorId(id: number): Promise<Curso | null> {
    const select = "SELECT * FROM curso WHERE id = $1";

    try {
      const values = [id];
      const res = await this.conexao.query(select, values);

      return res && res[0]
        ? new Curso(
            res[0].nome,
            res[0].carga_horaria,
            res[0].status,
            res[0].id_professor,
            res[0].id
          )
        : null;
    } catch (err) {
      console.log("Erro na consulta do curso por id", err);
      return null;
    }
  }

  async matricularAluno(
    Curs: Curso,
    Alun: Aluno,
    notas: number[]
  ): Promise<[Curso, Aluno]> {
    if (!Curs || !Alun) {
      throw new Error("Curso ou Aluno não cadastrados");
    }
    const insert = `INSERT INTO curso_aluno (id_curso,id_aluno,nota1,nota2,nota3,media,situacao,statusmatricula) VALUES ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING *`;

    try {
      const media = (notas[0] + notas[1] + notas[2]) / 3;
      let situação: string =
        media >= 7 ? "Aprovado" : media >= 5 ? "Recuperacao" : "Reprovado";
      const statusMatricula =
        Alun.getStatusMatricula() === "NAO_MATRICULADO"
          ? "CANCELADO"
          : "MATRICULADO";
      const values = [
        Curs.getId(),
        Alun.getId(),
        notas[0],
        notas[1],
        notas[2],
        media,
        situação,
        statusMatricula,
      ];
      const res = await this.conexao.query(insert, values);
      if (!res || !res[0]) {
        return [Curs, Alun];
      }
      const curso = new Curso(
        res[0].nome,
        res[0].carga_horaria,
        res[0].status,
        res[0].id_professor
      );
      const aluno = new Aluno(
        res[0].nome,
        res[0].email,
        res[0].telefone,
        res[0].status,
        res[0].senha,
        res[0].statusMatricula,
        res[0].id
      );
      return [curso, aluno] as [Curso, Aluno];
    } catch (err) {
      console.log("Erro ao criar tabela curso_aluno", err);
      return [Curs, Alun];
    }
  }

  async buscarCursoProfessor(idProfessor: Professor): Promise<Curso[]> {
    const select = `SELECT * FROM curso WHERE id_professor = $1`;

    try {
      const values = [idProfessor.getId()];
      const res = await this.conexao.query(select, values);
      return res && res.length > 0
        ? res.map(
            (curso: any) =>
              new Curso(
                curso.nome,
                curso.carga_horaria,
                curso.status,
                curso.id_professor,
                curso.id
              )
          )
        : [];
    } catch (err) {
      console.log("Erro na consulta do curso por id do professor", err);
      return [];
    }
  }

  async buscarCursoAluno(): Promise<any[]> {
    const select = `SELECT * FROM curso_aluno`;

    try {
      const res = await this.conexao.query(select, []);
      return res && res.length > 0
        ? res.map((row: any) => ({
            id_curso: row.id_curso,
            id_aluno: row.id_aluno,
            nota1: row.nota1,
            nota2: row.nota2,
            nota3: row.nota3,
            media: row.media,
            situacao: row.situacao,
            statusmatricula: row.statusmatricula,
          }))
        : [];
    } catch (err) {
      console.log("Erro na consulta do curso", err);
      return [];
    }
  }
  async buscarCursoAlunoPorId(id: number): Promise<any[]> {
    const select = `SELECT * FROM curso_aluno WHERE id_aluno = $1`;

    try {
      const values = [id];
      const res = await this.conexao.query(select, values);
      return res && res.length > 0
        ? res.map((row: any) => ({
            id_curso: row.id_curso,
            id_aluno: row.id_aluno,
            nota1: row.nota1,
            nota2: row.nota2,
            nota3: row.nota3,
            media: row.media,
            situacao: row.situacao,
            statusmatricula: row.statusmatricula,
          }))
        : [];
    } catch (err) {
      console.log("Erro na consulta do curso", err);
      return [];
    }
  }

  async quantidadeAlunosPorCurso(id_curso: number): Promise<number> {
    const select = `
      SELECT COUNT(id_aluno) AS quantidade_de_alunos
      FROM curso_aluno
      WHERE id_curso = $1
      GROUP BY id_curso
    `;

    try {
      const res = await this.conexao.query(select, [id_curso]);
      const curso = res && res.length > 0 ? res[0] : null;
      return curso ? curso.quantidade_de_alunos : 0;
    } catch (err) {
      console.log("Erro na consulta do curso", err);
      return 0;
    }
  }
  async cursosConcluidosAluno(idAluno: number): Promise<string[]> {
    const select = `SELECT * FROM curso_aluno WHERE id_aluno = $1 AND situacao = 'Aprovado'`;

    try {
      const res = await this.conexao.query(select, [idAluno]);
      if (res && res.length > 0) {
        return res.map((row: any) => row.id_curso);
      } else {
        return [];
      }
    } catch (err) {
      console.log("Erro na consulta do curso", err);
      return [];
    }
  }

  async calcularMediaGeral(curso_id: number): Promise<number> {
    const select = `
      SELECT AVG(media) AS media_geral
      FROM curso_aluno
      WHERE id_curso = $1
    `;

    try {
      const res = await this.conexao.query(select, [curso_id]);
      const turma = res && res.length > 0 ? res[0] : null;
      return turma ? turma.media_geral : 0;
    } catch (err) {
      console.log("Erro na consulta do curso", err);
      return 0;
    }
  }

  async porcentagemAprovadosEReprovados(
    curso_id: number
  ): Promise<{ percentualAprovados: number; percentualReprovados: number }> {
    const select = `
      SELECT
        COUNT(CASE WHEN media >= 7 THEN 1 END) AS aprovados,
        COUNT(CASE WHEN media < 7 THEN 1 END) AS reprovados,
        COUNT(*) AS total_alunos,
        (COUNT(CASE WHEN media >= 7 THEN 1 END) * 100.0 / COUNT(*)) AS percentual_aprovados,
        (COUNT(CASE WHEN media < 7 THEN 1 END) * 100.0 / COUNT(*)) AS percentual_reprovados
      FROM curso_aluno
      WHERE id_curso = $1
    `;

    try {
      const res = await this.conexao.query(select, [curso_id]);
      const turma = res && res.length > 0 ? res[0] : null;

      if (turma) {
        return {
          percentualAprovados: turma.percentual_aprovados || 0,
          percentualReprovados: turma.percentual_reprovados || 0,
        };
      } else {
        return { percentualAprovados: 0, percentualReprovados: 0 };
      }
    } catch (err) {
      console.log("Erro na consulta do curso", err);
      return { percentualAprovados: 0, percentualReprovados: 0 };
    }
  }

  async estatisticasCurso(id_curso: number): Promise<any> {
    const qtdAlunoCurso = await this.quantidadeAlunosPorCurso(id_curso);

    const mediaGeral = await this.calcularMediaGeral(id_curso);

    const { percentualAprovados, percentualReprovados } =
      await this.porcentagemAprovadosEReprovados(id_curso);

    return {
      qtdAlunoCurso,
      mediaGeral,
      percentualAprovados,
      percentualReprovados,
    };
  }

  async porcentagemAproveitamentoAluno(aluno_id: number): Promise<number> {
    const select = `
      SELECT
        COUNT(CASE WHEN media >= 7 THEN 1 END) AS aprovados,
        COUNT(*) AS total_alunos,
        (COUNT(CASE WHEN media >= 7 THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0)) AS percentual_aproveitamento
      FROM curso_aluno
      WHERE id_aluno = $1
    `;

    try {
      const res = await this.conexao.query(select, [aluno_id]);
      const resultados = res && res.length > 0 ? res[0] : null;

      if (resultados) {
        return resultados.percentual_aproveitamento || 0;
      } else {
        return 0;
      }
    } catch (err) {
      console.log("Erro na consulta do aproveitamento do aluno", err);
      return 0;
    }
  }

  async desmatricularAluno(
    id_curso: number,
    id_aluno: number
  ): Promise<boolean> {
    const update = `
      UPDATE curso_aluno
      SET statusmatricula = $1
      WHERE id_curso = $2 AND id_aluno = $3
    `;

    try {
      const values = [StatusMatricula.CANCELADO, id_curso, id_aluno];
      await this.conexao.query(update, values);
      return true;
    } catch (err) {
      console.log("Erro na consulta do aproveitamento do aluno", err);
      return false;
    }
  }
}
