export interface IDAO<T> {
  cadastrar(t: T): Promise<T | null>;
  buscarTodos(): Promise<T[]>;
  atualizar(id: number, dados: T): Promise<T>;
  deletar(id: number): Promise<T | null>;
}
