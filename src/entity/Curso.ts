import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusCurso } from "../ENUM/StatusCurso";
import { Professor } from "./Professor";

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome: string;

  @Column()
  carga_horaria: number;

  @Column()
  status: StatusCurso;

  @Column()
  @ManyToOne(() => Professor, (professor) => professor.cursos)
  id_professor: number;
}
