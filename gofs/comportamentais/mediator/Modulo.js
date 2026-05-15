// Modulo.js — Colleague
// Representa um módulo que agrupa conteúdos.

class Modulo {
  constructor(id, titulo, descricao, ordem) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.ordem = ordem;
    this.conteudos = [];
    this.qtdConteudos = 0;
    this.concluido = false;
  }

  adicionarConteudo(conteudo) {
    this.conteudos.push(conteudo);
    this.qtdConteudos = this.conteudos.length;
  }

  obterConteudoPorId(conteudoId) {
    return this.conteudos.find((c) => c.id === conteudoId) || null;
  }

  verificarConclusao() {
    const todosConcluidos = this.conteudos.every((c) => c.concluido);
    if (todosConcluidos && this.conteudos.length > 0) {
      this.concluido = true;
      console.log(`[MODULO] '${this.titulo}' foi concluído por completo.`);
    }
    return todosConcluidos;
  }

  exibirProgresso() {
    const concluidos = this.conteudos.filter((c) => c.concluido).length;
    return `Módulo '${this.titulo}': ${concluidos}/${this.conteudos.length} conteúdos concluídos.`;
  }

  toString() {
    return `Modulo(id=${this.id}, titulo='${this.titulo}', ordem=${this.ordem}, qtdConteudos=${this.qtdConteudos})`;
  }
}

module.exports = Modulo;
