import { StatusCurso } from "../ENUM/StatusCurso";

export class Curso {
  private id: number;
  private nome: string;
  private cargaHoraria: number;
  private status: StatusCurso = StatusCurso.ATIVO;

  constructor(
    nome: string,
    cargaHoraria: number,
    status: StatusCurso,
    id?: number
  ) {
    this.nome = nome;
    this.cargaHoraria = cargaHoraria;
    this.status = status;
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

  public getStatus(): StatusCurso {
    return this.status;
  }

  public setStatus(status: StatusCurso): void {
    this.status = status;
  }

  public toString(): string {
    return `Nome: ${this.nome} | Carga Horaria: ${this.cargaHoraria} | Status: ${this.status}`;
  }
}
