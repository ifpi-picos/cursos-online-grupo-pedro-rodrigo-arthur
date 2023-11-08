class Diciplina {
  private nome: string;
  private id: string;
  private ementa: string;
  private cargaHoraria: number;

  constructor(
    nome: string,
    id: string,
    ementa: string,
    cargaHoraria: number
  ) {
    this.nome = nome;
    this.id = id;
    this.ementa = ementa;
    this.cargaHoraria = cargaHoraria;
  }

  getNome(): string {
    return this.nome;
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  getCodigo(): string {
    return this.id;
  }

  setCodigo(id: string): void {
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
