import { Aluno } from "../../Entidades/Aluno";
import { Professor } from "../../Entidades/Professor";
import { AlunoDAO } from "../AlunoDAO";
import Conexao from "../Conexao";
import { ProfessorDAO } from "../ProfessorDAO";

export class Autenticacao {
  private conexao: Conexao;

  constructor(conexao: Conexao) {
    this.conexao = new Conexao();
  }

  async autenticarAlunoPorIdEsenha(
    id: number,
    senha: string
  ): Promise<Aluno | null> {
    const aluno = await new AlunoDAO(this.conexao).buscarPorId(id);
    if (aluno) {
      if (aluno.getSenha() === senha) {
        return aluno;
      }
      console.log("Senha incorreta");
    }
    return null;
  }

  async autenticarProfessorPorIdEsenha(
    id: number,
    senha: string
  ): Promise<Professor | null> {
    const professor = await new ProfessorDAO(this.conexao).buscarPorId(id);
    if (professor) {
      if (professor.getSenha() === senha) {
        return professor && professor.getId() ? professor : null;
      }
      console.log("Senha incorreta");
    }
    return null;
  }
}
