class Quiz {
  constructor(id, titulo) {
    this.id = id;
    this.titulo = titulo;
    this.questoes = [];
  }

  adicionarQuestao(questao) {
    this.questoes.push(questao);
  }

  exibirQuestoes() {
    if (this.questoes.length === 0) {
      return `Quiz '${this.titulo}' sem questões.`;
    }

    const lista = this.questoes
      .map((questao) => `- ${questao.id}. ${questao.enunciado}`)
      .join("\n");

    return `Quiz '${this.titulo}'\n${lista}`;
  }

  toString() {
    return `Quiz(id=${this.id}, titulo='${this.titulo}', qtdQuestoes=${this.questoes.length})`;
  }
}

module.exports = Quiz;
