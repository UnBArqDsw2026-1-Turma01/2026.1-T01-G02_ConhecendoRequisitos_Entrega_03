// Conteudo.js
// Leaf — representa o elemento final da estrutura

const ElementoEducacional = require("./ElementoEducacional");

class Conteudo extends ElementoEducacional {
  constructor(id, titulo, corpo, ordem) {
    super();
    this.id = id;
    this.titulo = titulo;
    this.corpo = corpo;
    this.ordem = ordem;
    this.concluido = false;
  }

  exibirProgresso() {
    return `Conteúdo '${this.titulo}': ${this.concluido ? "concluído" : "pendente"}.`;
  }

  marcarConcluido() {
    this.concluido = true;
    console.log(`[CONTEUDO] '${this.titulo}' marcado como concluído.`);
  }

  toString() {
    return `Conteudo(id=${this.id}, titulo='${this.titulo}', ordem=${this.ordem})`;
  }
}

module.exports = Conteudo;
