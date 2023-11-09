import { Disciplina } from "../Entidades/Disciplina";
import { IDAO } from "./IDAO";

class DisciplinaDAO implements IDAO<Disciplina>{
    cadastrar(t: Disciplina): Promise<Disciplina> {
        throw new Error("Method not implemented.");
    }
    buscarTodos(): Promise<Disciplina[]> {
        throw new Error("Method not implemented.");
    }
    atualizar(id: number, dados: Disciplina): Promise<Disciplina> {
        throw new Error("Method not implemented.");
    }
    deletar(id: number): Promise<Disciplina | null> {
        throw new Error("Method not implemented.");
    }

}