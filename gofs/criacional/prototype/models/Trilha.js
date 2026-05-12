const Prototype = require("../prototypes/Prototype");

class Trilha extends Prototype {
  constructor(id, titulo, descricao, ordem, qtdModulos) {
    super();
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.ordem = ordem;
    this.qtdModulos = qtdModulos;
    this.concluido = false;
  }

  exibirModulos() {
    return `A trilha ${this.titulo} possui ${this.qtdModulos} módulos.`;
  }

  exibirProgresso() {
    return this.concluido ? "Trilha concluída." : "Trilha em andamento.";
  }

  marcarConcluido() {
    this.concluido = true;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

module.exports = Trilha;