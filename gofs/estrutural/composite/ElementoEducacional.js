// ElementoEducacional.js
// Componente abstrato — contrato comum para a hierarquia Composite

class ElementoEducacional {
  constructor() {
    if (new.target === ElementoEducacional) {
      throw new Error(
        "ElementoEducacional é abstrato e não pode ser instanciado diretamente.",
      );
    }
    this.id = 0;
    this.titulo = "";
    this.descricao = "";
    this.ordem = 0;
  }

  getOrdem() {
    return this.ordem;
  }

  exibirProgresso() {
    throw new Error(
      "exibirProgresso() deve ser implementado pela classe concreta.",
    );
  }

  marcarConcluido() {
    throw new Error(
      "marcarConcluido() deve ser implementado pela classe concreta.",
    );
  }
}

module.exports = ElementoEducacional;
