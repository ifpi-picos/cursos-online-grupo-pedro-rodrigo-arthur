import { Curso } from "../Entidades/Curso";
import { IDAO } from "./IDAO";

class CursoDAO implements IDAO<Curso> {
  cadastrar(t: Curso): Promise<Curso> {
    throw new Error("Method not implemented.");
  }
  buscarTodos(): Promise<Curso[]> {
    throw new Error("Method not implemented.");
  }
  atualizar(id: number, dados: Curso): Promise<Curso> {
    throw new Error("Method not implemented.");
  }
  deletar(id: number): Promise<Curso | null> {
    throw new Error("Method not implemented.");
  }
}
