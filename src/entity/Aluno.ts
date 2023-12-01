import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { StatusAluno } from "../ENUM/StatusAluno";

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  status: StatusAluno;

  @Column()
  senha: string;
}
