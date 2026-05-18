
const Prototype = require("../prototypes/Prototype");

class Modulo extends Prototype {
  constructor(id, titulo, descricao, ordem, qtdConteudos) {
    super();
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.ordem = ordem;
    this.qtdConteudos = qtdConteudos;
    this.concluido = false;
  }

  exibirConteudos() {
    return `O módulo ${this.titulo} possui ${this.qtdConteudos} conteúdos.`;
  }

  exibirProgresso() {
    return this.concluido ? "Módulo concluído." : "Módulo em andamento.";
  }

  marcarConcluido() {
    this.concluido = true;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

module.exports = Modulo;