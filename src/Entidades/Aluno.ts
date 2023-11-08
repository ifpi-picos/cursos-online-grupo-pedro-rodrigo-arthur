class Aluno {
  private id: number;
  private nome: string;
  private email: string;
  private telefone: string;
  private numeromatricula: string;

  constructor(
    id: number,
    nome: string,
    email: string,
    telefone: string,
    numeromatricula: string,
    cursos: string[]
  ) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.numeromatricula = numeromatricula;
    this.id = id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getTelefone(): string {
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
