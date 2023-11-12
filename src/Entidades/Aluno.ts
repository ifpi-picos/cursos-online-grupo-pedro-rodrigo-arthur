export class Aluno {
  private id: number;
  private nome: string;
  private email: string;
  private telefone: number;
  private numeromatricula: string;

  constructor(
    nome: string,
    email: string,
    telefone: number,
    numeromatricula: string,
    id?: number
  ) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.numeromatricula = numeromatricula;
    this.id = id || 0;
  }

  public getNome(): string {
    return this.nome;
  }

  public getTelefone(): number {
    return this.telefone;
  }

  public getNumeromatricula(): string {
    return this.numeromatricula;
  }

  public getEmail(): string {
    return this.email;
  }

  public getId(): number {
    return this.id;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setTelefone(telefone: number): void {
    this.telefone = telefone;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setNumeromatricula(numeromatricula: string): void {
    this.numeromatricula = numeromatricula;
  }

  public toString(): string {
    return `Nome: ${this.nome} | Email: ${this.email} | Telefone: ${this.telefone} | Numero de Matricula: ${this.numeromatricula}`;
  }
}
