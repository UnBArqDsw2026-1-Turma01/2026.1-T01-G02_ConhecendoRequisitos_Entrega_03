class Questao {
  constructor(id, enunciado, respostaCorreta) {
    this.id = id;
    this.enunciado = enunciado;
    this.respostaCorreta = respostaCorreta;
  }

  toString() {
    return `Questao(id=${this.id}, enunciado='${this.enunciado}')`;
  }
}

module.exports = Questao;
