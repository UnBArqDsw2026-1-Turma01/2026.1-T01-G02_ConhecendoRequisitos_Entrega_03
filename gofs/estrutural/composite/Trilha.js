// Trilha.js
// Composite — representa o topo da estrutura e agrupa módulos

const ElementoEducacional = require("./ElementoEducacional");

class Trilha extends ElementoEducacional {
  constructor(id, titulo, descricao, ordem) {
    super();
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.ordem = ordem;
    this.modulos = [];
    this.qtdModulos = 0;
    this.concluido = false;
  }

  adicionarModulo(modulo) {
    this.modulos.push(modulo);
    this.qtdModulos = this.modulos.length;
  }

  removerModulo(moduloId) {
    this.modulos = this.modulos.filter((modulo) => modulo.id !== moduloId);
    this.qtdModulos = this.modulos.length;
  }

  exibirModulos() {
    if (this.modulos.length === 0) {
      return `Trilha '${this.titulo}' sem módulos.`;
    }

    const lista = this.modulos
      .map((modulo) => `- ${modulo.ordem}. ${modulo.titulo}`)
      .join("\n");

    return `Trilha '${this.titulo}'\n${lista}`;
  }

  exibirProgresso() {
    const concluidos = this.modulos.filter((modulo) => modulo.concluido).length;
    return `Trilha '${this.titulo}': ${concluidos}/${this.modulos.length} módulos concluídos.`;
  }

  marcarConcluido() {
    this.modulos.forEach((modulo) => {
      if (!modulo.concluido) {
        modulo.marcarConcluido();
      }
    });
    this.concluido = true;
    console.log(`[TRILHA] '${this.titulo}' marcada como concluída.`);
  }

  toString() {
    return `Trilha(id=${this.id}, titulo='${this.titulo}', ordem=${this.ordem}, qtdModulos=${this.qtdModulos})`;
  }
}

module.exports = Trilha;
