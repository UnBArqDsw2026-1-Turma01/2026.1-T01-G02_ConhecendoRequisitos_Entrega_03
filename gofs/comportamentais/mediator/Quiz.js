// Quiz.js — Colleague
// Representa um quiz associado a um módulo ou trilha.

class Quiz {
  constructor(id, titulo, quantidadeQuestoes, moduloId) {
    this.id = id;
    this.titulo = titulo;
    this.quantidadeQuestoes = quantidadeQuestoes;
    this.moduloId = moduloId;
    this.ativo = false;
  }

  iniciar() {
    this.ativo = true;
    console.log(`[QUIZ] '${this.titulo}' foi iniciado.`);
  }

  finalizar() {
    this.ativo = false;
    console.log(`[QUIZ] '${this.titulo}' foi finalizado.`);
  }

  exibirProgresso() {
    return `Quiz '${this.titulo}': ${this.ativo ? "ativo" : "inativo"} (${this.quantidadeQuestoes} questões).`;
  }

  toString() {
    return `Quiz(id=${this.id}, titulo='${this.titulo}', modulo=${this.moduloId})`;
  }
}

module.exports = Quiz;
