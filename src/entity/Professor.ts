import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./Curso";

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  senha: string;

  @OneToMany(() => Curso, (curso) => curso.id_professor)
  cursos: Curso[];
}
