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

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string) {
    nome.trim() !== "" ? (this.nome = nome) : (this.nome = "Nome Inválido");
    return (this.nome = nome);
  }

  public getId(): number {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getTelefone(): string {
    return this.telefone;
  }
  public setTelefone(telefone: string) {
    return (this.telefone = telefone);
  }

  public setEmail(email: string) {
    return (this.email = email);
  }

  public toString(): string {
    return `Nome: ${this.nome} | Email: ${this.email} | Telefone: ${this.telefone}`;
  }
}
