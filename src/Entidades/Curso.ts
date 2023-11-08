class Curso {
  private id: number;
  private nome: string;
  private cargaHoraria: number;
  private status: boolean;

  constructor(nome: string, cargaHoraria: number, status: boolean, id: number) {
    this.nome = nome;
    this.cargaHoraria = cargaHoraria;
    this.status = status;
    this.id = id;
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

  getStatus(): boolean {
    return this.status;
  }

  setStatus(status: boolean): void {
    this.status = status;
  }
}
