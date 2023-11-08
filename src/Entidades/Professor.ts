class Professor {
  private nome: string;
  private id: string;
  private telefone: string;
  private email: string;

  constructor(nome: string, id: string, telefone: string, email: string) {
    this.nome = nome;
    this.id = id;
    this.telefone = telefone;
    this.email = email;
  }

  getNome(): string {
    return this.nome;
  }

  setNome(nome: string) {
    return (this.nome = nome);
  }

  getid(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getTelefone(): string {
    return this.telefone;
  }
}
