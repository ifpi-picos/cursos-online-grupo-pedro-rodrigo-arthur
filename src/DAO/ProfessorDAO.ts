import { Professor } from "../Entidades/Professor";
import { IDAO } from "./IDAO";

class ProfessorDAO implements IDAO<Professor> {
  cadastrar(t: Professor): Promise<Professor> {
    throw new Error("Method not implemented.");
  }
  buscarTodos(): Promise<Professor[]> {
    throw new Error("Method not implemented.");
  }
  atualizar(id: number, dados: Professor): Promise<Professor> {
    throw new Error("Method not implemented.");
  }
  deletar(id: number): Promise<Professor | null> {
    throw new Error("Method not implemented.");
  }
}
