class Professor {
    private nome: string;
    private codigo: string;
    private telefone: string;
    private email: string;

    constructor(
        nome: string,
        codigo: string,
        telefone: string,
        email: string,
    ){
        this.nome = nome;
        this.codigo = codigo;
        this.telefone = telefone;
        this.email = email;
        this.codigo = codigo;
    }

    getNome(): string { 
    return this.nome; 
    }

    setNome(nome: string) {
        return this.nome = nome;
    }

    getCodigo(): string {
        return this.codigo;
    }
    
    getEmail(): string {
        return this.email;
    }

    getTelefone(): string {
        return this.telefone;
    }

}