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

  getNumeromatricula(): string {
    return this.numeromatricula;
  }

  public getEmail(): string {
    return this.email;
  }

  getId(): number {
    return this.id;
  }
}
