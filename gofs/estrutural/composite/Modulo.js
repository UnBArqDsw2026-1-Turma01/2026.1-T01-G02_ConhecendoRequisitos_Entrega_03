// Modulo.js
// Composite — agrupa conteúdos e mantém a composição da trilha

const ElementoEducacional = require("./ElementoEducacional");

class Modulo extends ElementoEducacional {
  constructor(id, titulo, descricao, ordem) {
    super();
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

  removerConteudo(conteudoId) {
    this.conteudos = this.conteudos.filter(
      (conteudo) => conteudo.id !== conteudoId,
    );
    this.qtdConteudos = this.conteudos.length;
  }

  exibirConteudos() {
    if (this.conteudos.length === 0) {
      return `Módulo '${this.titulo}' sem conteúdos.`;
    }

    const lista = this.conteudos
      .map((conteudo) => `- ${conteudo.ordem}. ${conteudo.titulo}`)
      .join("\n");

    return `Módulo '${this.titulo}'\n${lista}`;
  }

  exibirProgresso() {
    const concluidos = this.conteudos.filter(
      (conteudo) => conteudo.concluido,
    ).length;
    return `Módulo '${this.titulo}': ${concluidos}/${this.conteudos.length} conteúdos concluídos.`;
  }

  marcarConcluido() {
    this.conteudos.forEach((conteudo) => {
      if (!conteudo.concluido) {
        conteudo.marcarConcluido();
      }
    });
    this.concluido = true;
    console.log(`[MODULO] '${this.titulo}' marcado como concluído.`);
  }

  toString() {
    return `Modulo(id=${this.id}, titulo='${this.titulo}', ordem=${this.ordem}, qtdConteudos=${this.qtdConteudos})`;
  }
}

module.exports = Modulo;
