class Turma {
    private codigo: string;
    private periodo: string;
    private local: string;
    private professor: Professor;

    constructor(
        codigo: string,
        periodo: string,
        local: string,
        professor: Professor
    ){
       this.codigo = codigo;
       this.periodo = periodo; 
       this.local = local;
       this.professor =professor;
    }

    getCodigo(): string {
        return this.codigo;
    }

    getPeriodo(): string {
        return this.periodo;
    }

    getLocal(): string {
        return this.local;
    }

    getProfessor(): Professor {
        return this.professor;
    }

 
}