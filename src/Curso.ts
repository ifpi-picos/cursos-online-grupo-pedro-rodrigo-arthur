class Curso {
  private nome: string;
  private cargaHoraria: number;
  private status: boolean;

  constructor(nome: string, cargaHoraria: number, status: boolean) {
    this.nome = nome;
    this.cargaHoraria = cargaHoraria;
    this.status = status;
  }

  getNome(): string {
    return this.nome;
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

  informaoesCurso(): string {
    return `Nome: ${this.nome} \nCarga Horária: ${this.cargaHoraria} \nStatus: ${this.status}`;
  }
}
