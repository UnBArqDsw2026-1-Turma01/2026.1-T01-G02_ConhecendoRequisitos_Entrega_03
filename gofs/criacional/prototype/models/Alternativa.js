const Prototype = require("../prototypes/Prototype");

class Alternativa extends Prototype {
  constructor(id, descricao, alternativaCorreta, ordem) {
    super();
    this.id = id;
    this.descricao = descricao;
    this.alternativaCorreta = alternativaCorreta;
    this.ordem = ordem;
  }

  sortearOrdem() {
    this.ordem = Math.floor(Math.random() * 10) + 1;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

module.exports = Alternativa;