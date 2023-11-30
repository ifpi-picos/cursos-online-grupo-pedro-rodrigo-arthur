import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { StatusMatricula } from "../ENUM/StatusMatricula";
import { Aluno } from "./Aluno";
import { Curso } from "./Curso";

@Entity()
export class CursoAluno {
  @PrimaryColumn({ name: "id_curso" })
  id_curso: number;

  @PrimaryColumn({ name: "id_aluno" })
  id_aluno: number;

  @ManyToOne(() => Curso, (curso) => curso.id)
  @JoinColumn({ name: "id_curso" })
  curso: Curso;

  @ManyToOne(() => Aluno, (aluno) => aluno.id)
  @JoinColumn({ name: "id_aluno" })
  aluno: Aluno;

  @Column()
  nota1: number;

  @Column()
  nota2: number;

  @Column()
  nota3: number;

  @Column({ nullable: true, type: "float" })
  media?: number;

  @Column({ nullable: true })
  situacao?: string;

  @Column()
  statusmatricula: StatusMatricula;
}
