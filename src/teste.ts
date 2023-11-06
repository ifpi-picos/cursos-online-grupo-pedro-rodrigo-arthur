class Cliente {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar() {
    return `Olá eu sou ${this.nome} e tenho ${this.idade} anos`;
  }
}

const joao = new Cliente("João", 25);

console.log(joao.apresentar());
