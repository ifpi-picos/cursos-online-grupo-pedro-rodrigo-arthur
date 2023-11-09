export class Curso {
  private id: number;
  private nome: string;
  private cargaHoraria: number;
  private status: string;

  constructor(nome: string, cargaHoraria: number, status: string, id?: number) {
    this.nome = nome;
    this.cargaHoraria = cargaHoraria;
    this.status = status;
    this.id = id || 0;
  }

  getNome(): string {
    return this.nome;
  }

  getId(): number {
    return this.id;
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  getCargaHoraria(): number {
    return this.cargaHoraria;
  }

  setCargaHoraria(cargaHoraria: number): void {
    this.cargaHoraria = cargaHoraria;
  }

  getStatus(): string {
    return this.status;
  }

  setStatus(status: string): void {
    this.status = status;
  }
}
