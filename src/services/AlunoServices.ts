import "reflect-metadata";
import { Aluno } from "../entity/Aluno";
import { AlunoRepository } from "../repositories/AlunoRepository";
import { UpdateResult } from "typeorm";

export class AlunoServices extends AlunoRepository {
  constructor() {
    super();
  }

  async cadastrar(aluno: Aluno): Promise<Aluno> {
    const alunoCadastrar = await super.buscarPorEmail(aluno.email);
    if (alunoCadastrar) {
      throw new Error("Aluno já cadastrado");
    }
    const alunoSalvo = super.salvar(aluno);
    return alunoSalvo;
  }

  async atualizar(id: number, objeto: Aluno): Promise<UpdateResult> {
    const buscaId = await super.buscarPorId(id);
    if (!buscaId) {
      throw new Error("Aluno não encontrado");
    }

    const alunoAtualizado = super.atualizar(buscaId.id, objeto);
    return alunoAtualizado;
  }

  async deletar(id: number): Promise<Aluno> {
    const deletarAluno = await super.buscarPorId(id);

    if (!deletarAluno) throw new Error("Aluno não encontrado");

    const alunoDeletado = super.deletar(id);
    return alunoDeletado;
  }

  async buscarTodos(): Promise<Aluno[]> {
    
    const buscaT = super.buscarTodos();

    if(!buscaT) throw new Error("Aluno não encontrado");
    return buscaT;
  }

  async buscarPorId(id: number): Promise<Aluno> {
    const buscaI = await super.buscarPorId(id);

    if (!buscaI) throw new Error("Aluno não encontrado");

    const buscaId = super.buscarPorId(buscaI.id);
    return buscaId;
  }

  async buscarPorEmail(email: string): Promise<Aluno> {
    try {
      const buscaEmail = super.buscarPorEmail(email);

      if (!buscaEmail) {
        throw new Error("Aluno não encontrado");
      }

      return buscaEmail;
    } catch (error) {
      throw new Error("Aluno não encontrado");
    }
  }

  async verificarEmailSenha(email: string, senha: string): Promise<Aluno> {
    const alunoAutenticado = await this.buscarPorEmail(email);
    if (alunoAutenticado.senha != senha) {
      throw new Error("Senha incorreta");
    }
    return alunoAutenticado;
  }

  async autenticar(email: string, senha: string): Promise<Aluno> {
    const alunoAutenticado = await this.verificarEmailSenha(email, senha);
    return alunoAutenticado;
  }
}
