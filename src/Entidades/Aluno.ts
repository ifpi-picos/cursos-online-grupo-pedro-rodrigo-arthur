import { StatusAluno } from "../ENUM/StatusAluno";

export class Aluno {
  private id: number;
  private nome: string;
  private email: string;
  private telefone: number;
  private status: StatusAluno;

  constructor(
    nome: string,
    email: string,
    telefone: number,
    status: StatusAluno,
    id?: number
  ) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.status = status;
    this.id = id || 0;
  }

  public getNome(): string {
    return this.nome;
  }

  public getTelefone(): number {
    return this.telefone;
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

  public toString(): string {
    return `Nome: ${this.nome} | Email: ${this.email} | Telefone: ${this.telefone}`;
  }

  getStatus(): StatusAluno {
    return this.status;
  }

  setStatus(status: StatusAluno): void {
    this.status = status;
  }
}
