import { StatusCurso } from "../ENUM/StatusCurso";
import { Professor } from "./Professor";

export class Curso {
  private id: number;
  private nome: string;
  private cargaHoraria: number;
  private status: StatusCurso;
  private professor: Professor;

  constructor(
    nome: string,
    cargaHoraria: number,
    status: StatusCurso,
    professor: Professor,
    id?: number
  ) {
    this.nome = nome;
    this.cargaHoraria = cargaHoraria;
    this.status = status;
    this.professor = professor;
    this.id = id || 0;
  }

  public getNome(): string {
    return this.nome;
  }

  public getId(): number {
    return this.id;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getCargaHoraria(): number {
    return this.cargaHoraria;
  }

  public setCargaHoraria(cargaHoraria: number): void {
    this.cargaHoraria = cargaHoraria;
  }

  public getStatusAsString(): string {
    return this.status === StatusCurso.ABERTO ? "ABERTO" : "FECHADO";
  }

  public setStatus(status: StatusCurso): void {
    this.status = status;
  }

  public getProfessor(): Professor | null {
    return this.professor;
  }

  public setProfessor(professor: Professor): void {
    this.professor = professor;
  }

  public toString(): string {
    return `Nome: ${this.nome} | Carga Horaria: ${this.cargaHoraria} | Status: ${this.status}`;
  }
}
