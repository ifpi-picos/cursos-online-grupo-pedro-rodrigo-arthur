import "reflect-metadata";
import { Aluno } from "../entity/Aluno";
import { AlunoRepository } from "../repositories/AlunoRepository";
import { UpdateResult } from "typeorm";

export class AlunoServices {
  private alunoRepository: AlunoRepository;
  constructor(alunoRepository: AlunoRepository) {
    this.alunoRepository = alunoRepository;
  }

  async cadastrar(aluno: Aluno): Promise<Aluno> {
    const alunoCadastrar = await this.buscarPorEmail(aluno.email);
    if (alunoCadastrar) {
      throw new Error("Aluno já cadastrado");
    }
    const alunoSalvo = this.alunoRepository.salvar(aluno);
    return alunoSalvo;
  }

  async atualizar(id: number, objeto: Aluno): Promise<UpdateResult> {
    const buscaId = await this.buscarPorId(id);

    const alunoAtualizado = this.alunoRepository.atualizar(buscaId.id, objeto);
    return alunoAtualizado;
  }

  async deletar(id: number): Promise<Aluno> {
    const deletarAluno = await this.buscarPorId(id);

    if (!deletarAluno) throw new Error("Aluno não encontrado");

    const alunoDeletado = this.alunoRepository.deletar(id);
    return alunoDeletado;
  }

  async buscarTodos(): Promise<Aluno[]> {
    
    const buscaT = this.alunoRepository.buscarTodos();

    if(!buscaT) throw new Error("Aluno não encontrado");
    return buscaT;
  }

  async buscarPorId(id: number): Promise<Aluno> {
    const buscaI = await this.alunoRepository.buscarPorId(id);

    if (!buscaI) throw new Error("Aluno não encontrado");

    return buscaI;
  }

  async buscarPorEmail(email: string): Promise<Aluno> {
    try {
      const buscaEmail = this.alunoRepository.buscarPorEmail(email);

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
