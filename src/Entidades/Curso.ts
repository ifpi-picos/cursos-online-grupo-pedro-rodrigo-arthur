import { StatusCurso } from "../ENUM/StatusCurso";
import { Professor } from "./Professor";

export class Curso {
  private id: number;
  private nome: string;
  private cargaHoraria: number;
  private status: StatusCurso;
  private idProfessor: number;

  constructor(
    nome: string,
    cargaHoraria: number,
    status: StatusCurso,
    idProfessor: number,
    id?: number
  ) {
    this.nome = nome;
    this.cargaHoraria = cargaHoraria;
    this.status = status;
    this.idProfessor = idProfessor;
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
    return this.status === StatusCurso.ATIVO ? "ATIVO" : "INATIVO";
  }

  public setStatus(status: StatusCurso): void {
    this.status = status;
  }

  public getIdProfessor(): number {
    return this.idProfessor;
  }

  public setIdProfessor(idProfessor: number): void {
    this.idProfessor = idProfessor;
  }

  public toString(): string {
    return `Nome: ${this.nome} | Carga Horaria: ${this.cargaHoraria} | Status: ${this.status}`;
  }
}
