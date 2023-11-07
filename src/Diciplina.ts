class Diciplina {
  private nome: string;
  private codigo: string;
  private ementa: string;
  private cargaHoraria: number;

  constructor(
    nome: string,
    codigo: string,
    ementa: string,
    cargaHoraria: number
  ) {
    this.nome = nome;
    this.codigo = codigo;
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
    return this.codigo;
  }

  setCodigo(codigo: string): void {
    this.codigo = codigo;
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
