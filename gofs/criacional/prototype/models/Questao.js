const Prototype = require("../prototypes/Prototype");

class Questao extends Prototype {
  constructor(id, enunciado, status, qtdAlternativas, ordem) {
    super();
    this.id = id;
    this.enunciado = enunciado;
    this.status = status;
    this.qtdAlternativas = qtdAlternativas;
    this.ordem = ordem;
  }

  validarResposta(idAlternativa) {
    return idAlternativa === 1;
  }

  sortearOrdem() {
    this.ordem = Math.floor(Math.random() * 10) + 1;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

module.exports = Questao;