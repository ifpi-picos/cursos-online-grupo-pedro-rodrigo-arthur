import "reflect-metadata";
import { UpdateResult } from "typeorm";
import { Professor } from "../entity/Professor";
import { ProfessoRepository } from "../repositories/ProfessorRepository";

export class ProfessorServices {
  private professorRepository: ProfessoRepository;
  
  constructor(professorRepository: ProfessoRepository) {
    this.professorRepository = professorRepository;
  }

  async cadastrar(professor: Professor): Promise<Professor> {
    const professorEncontrado = await this.buscarPorEmail(professor.email);
    if (professorEncontrado) {
      throw new Error("Professor já cadastrado");
    }
    const professorSalvo = await this.professorRepository.salvar(professor);
    return professorSalvo;
  }

  async buscarTodos(): Promise<Professor[]> {
    const buscaTodos = await this.professorRepository.buscarTodos();
    if (!buscaTodos) {
      throw new Error("Nenhum professor cadastrado");
    }
    return buscaTodos;
  }

  async buscarPorId(id: number): Promise<Professor> {
    const buscarID = await this.professorRepository.buscarPorId(id);
    if (!buscarID) {
      throw new Error("Professor não encontrado");
    }
    return buscarID;
  }

  async deletar(id: number): Promise<Professor> {
    const buscarId = await this.buscarPorId(id);
    if (!buscarId) {
      throw new Error("Professor não encontrado");
    }
    const professorDeletado = this.professorRepository.deletar(buscarId.id);
    return professorDeletado;
  }

  async atualizar(id: number, objeto: Professor): Promise<UpdateResult> {
    const buscaId = await this.buscarPorId(id);
    const professorAtualizado = this.atualizar(buscaId.id, objeto);
    return professorAtualizado;
  }

  async buscarPorEmail(email: string): Promise<Professor> {
    try {
      const buscaEmail = this.professorRepository.buscarPorEmail(email);

      if (!buscaEmail) {
        throw new Error("Professor não encontrado");
      }
      return buscaEmail;
    } catch (error) {
      throw new Error("Professor não encontrado");
    }
  }

  async verificarEmailSenha(
    email: string,
    senha: string
  ): Promise<Professor | undefined> {
    const professorAutenticado = await this.buscarPorEmail(email);
    if (professorAutenticado.senha != senha) {
      throw new Error("Senha incorreta");
    }
    return professorAutenticado;
  }

  async autenticar(email: string, senha: string): Promise<Professor> {
    const professorAutenticado = await this.verificarEmailSenha(email, senha);
    return professorAutenticado;
  }
}
