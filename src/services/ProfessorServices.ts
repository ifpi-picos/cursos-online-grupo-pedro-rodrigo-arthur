import "reflect-metadata";
import { UpdateResult } from "typeorm";
import { Professor } from "../entity/Professor";
import { ProfessoRepository } from "../repositories/ProfessorRepository";

export class ProfessorServices extends ProfessoRepository {
  constructor() {
    super();
  }

  async cadastrar(professor: Professor): Promise<Professor> {
    const professorEncontrado = await super.buscarPorEmail(professor.email);
    if (professorEncontrado) {
      throw new Error("Professor já cadastrado");
    }
    const professorSalvo = super.salvar(professor);
    return professorSalvo;
  }

  async buscarTodos(): Promise<Professor[]> {
    const buscaTodos = await super.buscarTodos();
    if (!buscaTodos) {
      throw new Error("Nenhum professor cadastrado");
    }
    return buscaTodos;
  }

  async buscarPorId(id: number): Promise<Professor> {
    const buscarID = await super.buscarPorId(id);
    if (!buscarID) {
      throw new Error("Professor não encontrado");
    }
    return buscarID;
  }

  async deletar(id: number): Promise<Professor> {
    const buscarId = await this.buscarPorId(id);

    const professorDeletado = super.deletar(buscarId.id);
    return professorDeletado;
  }

  async atualizar(id: number, objeto: Professor): Promise<UpdateResult> {
    const buscaId = await this.buscarPorId(id);
    const professorAtualizado = super.atualizar(buscaId.id, objeto);
    return professorAtualizado;
  }

  async buscarPorEmail(email: string): Promise<Professor> {
    try {
      const buscaEmail = super.buscarPorEmail(email);

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
