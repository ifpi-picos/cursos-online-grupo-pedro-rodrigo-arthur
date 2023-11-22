import { StatusAluno } from "../ENUM/StatusAluno";
import { StatusMatricula } from "../ENUM/StatusMatricula";

export class Aluno {
  private id: number;
  private nome: string;
  private email: string;
  private telefone: string;
  private status: StatusAluno | number;
  private senha: string;
  private statusMatricula: StatusMatricula | number;

  constructor(
    nome: string,
    email: string,
    telefone: string,
    status: StatusAluno,
    senha: string,
    statusMatricula?: StatusMatricula,
    id?: number
  ) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.status = status;
    this.senha = senha;
    this.statusMatricula = statusMatricula || StatusMatricula.MATRICULADO;
    this.id = id || 0;
  }

  public getStatusMatricula(): StatusMatricula {
    return this.statusMatricula;
  }

  public setStatusMatricula(statusMatricula: StatusMatricula): void {
    this.statusMatricula = statusMatricula;
  }

  public getSenha(): string {
    return this.senha;
  }

  public setSenha(senha: string): void {
    this.senha = senha;
  }

  public getNome(): string {
    return this.nome;
  }

  public getTelefone(): string {
    return this.telefone;
  }

  public getEmail(): string {
    return this.email;
  }

  public getId(): number {
    return this.id;
  }

  public setNome(nome: string): void {
    nome.trim() !== "" ? (this.nome = nome) : (this.nome = "Nome Inválido");
  }

  public setTelefone(telefone: string): void {
    this.telefone = telefone;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public toString(): string {
    return `Nome: ${this.nome} | Email: ${this.email} | Telefone: ${this.telefone}`;
  }

  public getStatus(): StatusAluno {
    return this.status;
  }

  public setStatus(status: StatusAluno): void {
    this.status = status;
  }
}
