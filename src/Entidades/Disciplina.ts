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

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getCodigo(): number {
    return this.id;
  }

  public setCodigo(id: number): void {
    this.id = id;
  }

  public getEmenta(): string {
    return this.ementa;
  }

  public setEmenta(ementa: string): void {
    this.ementa = ementa;
  }

  public getCargaHoraria(): number {
    return this.cargaHoraria;
  }

  public setCargaHoraria(cargaHoraria: number): void {
    this.cargaHoraria = cargaHoraria;
  }

  public toString(): string {
    return `Nome: ${this.nome} | Ementa: ${this.ementa} | Carga Horaria: ${this.cargaHoraria}`;
  }
}
