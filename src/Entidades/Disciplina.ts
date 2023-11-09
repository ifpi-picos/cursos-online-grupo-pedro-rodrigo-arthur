export class Disciplina {
  private nome: string;
  private id: number;
  private ementa: string;
  private cargaHoraria: number;

  constructor(nome: string, ementa: string, cargaHoraria: number, id?: number) {
    this.nome = nome;
    this.ementa = ementa;
    this.cargaHoraria = cargaHoraria;
    this.id = id || 0;
  }

  getNome(): string {
    return this.nome;
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  getCodigo(): number {
    return this.id;
  }

  setCodigo(id: number): void {
    this.id = id;
  }

  getEmenta(): string {
    return this.ementa;
  }

  setEmenta(ementa: string): void {
    this.ementa = ementa;
  }

  getCargaHoraria(): number {
    return this.cargaHoraria;
  }

  setCargaHoraria(cargaHoraria: number): void {
    this.cargaHoraria = cargaHoraria;
  }
}
