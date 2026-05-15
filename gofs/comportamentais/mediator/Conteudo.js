// Conteudo.js — Colleague
// Representa um conteúdo educacional.

class Conteudo {
  constructor(id, titulo, corpo, ordem) {
    this.id = id;
    this.titulo = titulo;
    this.corpo = corpo;
    this.ordem = ordem;
    this.concluido = false;
  }

  marcarComoConcluido() {
    this.concluido = true;
    console.log(`[CONTEUDO] '${this.titulo}' marcado como concluído.`);
  }

  exibirProgresso() {
    return `Conteúdo '${this.titulo}': ${this.concluido ? "concluído" : "pendente"}.`;
  }

  toString() {
    return `Conteudo(id=${this.id}, titulo='${this.titulo}', ordem=${this.ordem})`;
  }
}

module.exports = Conteudo;
