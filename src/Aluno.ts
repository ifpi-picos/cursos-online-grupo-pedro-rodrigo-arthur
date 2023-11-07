class Aluno {
    private nome: string;
    private email: string;
    private telefone: string;
    private numeromatricula: string;
    private cursos: string[] = [];

    constructor(nome: string, email: string, telefone: string, numeromatricula: string, cursos:string[]) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.numeromatricula = numeromatricula;
        this.cursos = cursos
    }

    public getNome(): string {
        return this.nome;
    }

    public getEmail(): string {
        return this.email;
    }

    public cadastrar(): void {
        
    }

    public atualizar(): void {
        
    }

    public visualizar(): void {
       
    }

    public matricular_em(curso: string): void {
        this.cursos.push(curso);
    }

    public gerar_desempenho_em(curso: string): void {
       
    }
}
