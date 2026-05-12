
const Trilha = require("./models/Trilha");
const Modulo = require("./models/Modulo");
const Quizz = require("./models/Quizz");
const Questao = require("./models/Questao");
const Alternativa = require("./models/Alternativa");

class PrototypeRegistro {
  constructor() {
    this.prototipos = {
      trilha: new Trilha(1, "Engenharia de Requisitos", "Trilha base", 1, 3),
      modulo: new Modulo(1, "Introdução", "Módulo inicial", 1, 5),
      quizz: new Quizz(1, "Quiz Inicial", 4),
      questao: new Questao(1, "O que é requisito?", false, 4, 1),
      alternativa: new Alternativa(1, "Uma necessidade do usuário", true, 1),
    };
  }

  criar(tipo) {
    return this.prototipos[tipo].clone();
  }
}

module.exports = PrototypeRegistro;