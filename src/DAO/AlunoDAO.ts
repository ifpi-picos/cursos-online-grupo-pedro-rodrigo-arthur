import { Aluno } from "../Entidades/Aluno";
import { IDAO } from "./IDAO";

export class AlunoDAO implements IDAO<Aluno> {
  cadastrar(t: Aluno): Promise<Aluno> {
    throw new Error("Method not implemented.");
  }
  buscarTodos(): Promise<Aluno[]> {
    throw new Error("Method not implemented.");
  }
  atualizar(id: number, dados: Aluno): Promise<Aluno> {
    throw new Error("Method not implemented.");
  }
  deletar(id: number): Promise<Aluno | null> {
    throw new Error("Method not implemented.");
  }
}
