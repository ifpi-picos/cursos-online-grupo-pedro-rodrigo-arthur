import { StatusCurso } from "../ENUM/StatusCurso";

export class Curso {
  private id: number;
  private nome: string;
  private cargaHoraria: number;
  private status: StatusCurso;
  private notas: number[];

  constructor(
    nome: string,
    cargaHoraria: number,
    status: StatusCurso,
    notas: number[],
    id?: number
  ) {
    this.nome = nome;
    this.cargaHoraria = cargaHoraria;
    this.status = status;
    this.notas = notas;
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

  getNotas(): number[] {
    return this.notas;
  }

  setNotas(notas: number[]): void {
    this.notas = notas;
  }

  public toString(): string {
    return `Nome: ${this.nome} | Carga Horaria: ${this.cargaHoraria} | Status: ${this.status}`;
  }
}
