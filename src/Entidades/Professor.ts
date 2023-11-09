export class Professor {
  private nome: string;
  private id: number;
  private telefone: string;
  private email: string;

  constructor(nome: string, telefone: string, email: string, id?: number) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.id = id || 0;
  }

  getNome(): string {
    return this.nome;
  }

  setNome(nome: string) {
    return (this.nome = nome);
  }

  getid(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getTelefone(): string {
    return this.telefone;
  }
}
