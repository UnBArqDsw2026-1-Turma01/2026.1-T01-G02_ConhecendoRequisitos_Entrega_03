/**
 * Representa um item de conteúdo dentro de uma Trilha.
 * Pode ser do tipo "video", "texto" ou "quiz".
 */
class Conteudo {
  constructor(titulo, tipo) {
    this.titulo = titulo;
    this.tipo = tipo; // "video" | "texto" | "quiz"
  }

  toString() {
    return `[${this.tipo.toUpperCase()}] ${this.titulo}`;
  }
}
/**
 * Itera sobre todos os conteúdos da trilha na ordem original.
 * Usado no fluxo de estudo diário do Aluno.
 */
class IteradorLinear {
  constructor(conteudos) {
    this._conteudos = conteudos;
    this._posicao = 0;
  }

  temProximo() {
    return this._posicao < this._conteudos.length;
  }

  proximo() {
    if (!this.temProximo()) throw new Error("Não há mais conteúdos.");
    return this._conteudos[this._posicao++];
  }
}

/**
 * Itera apenas sobre os conteúdos do tipo "quiz".
 * Usado pelo Aluno em modo de após ja ter realizado os quizzes.
 */

class IteradorRevisao {
  constructor(conteudos) {
    this._quizzes = conteudos.filter((c) => c.tipo === "quiz");
    this._posicao = 0;
  }

  temProximo() {
    return this._posicao < this._quizzes.length;
  }

  proximo() {
    if (!this.temProximo()) throw new Error("Não há mais quizzes para revisão.");
    return this._quizzes[this._posicao++];
  }
}

/**
 * Representa uma Trilha de aprendizado.
 * Funciona como a Collection que fabrica seus próprios Iterators.
 */
class Trilha {
  constructor(nome) {
    this.nome = nome;
    this._conteudos = [];
  }

  adicionarConteudo(conteudo) {
    this._conteudos.push(conteudo);
  }

  // Fábrica de Iterador para estudo linear (dia a dia)
  criarIteradorLinear() {
    return new IteradorLinear(this._conteudos);
  }

  // Fábrica de Iterador para modo revisão (apenas quizzes)
  criarIteradorRevisao() {
    return new IteradorRevisao(this._conteudos);
  }
}

// CLIENTE (Simulando o Aluno na Plataforma)

if (require.main === module) {
  // Montando a Trilha de Engenharia de Requisitos
  const trilha = new Trilha("Engenharia de Requisitos");
  trilha.adicionarConteudo(new Conteudo("O que são Requisitos?", "texto"));
  trilha.adicionarConteudo(new Conteudo("Introdução à Elicitação", "video"));
  trilha.adicionarConteudo(new Conteudo("Quiz: Conceitos Básicos", "quiz"));
  trilha.adicionarConteudo(new Conteudo("Técnicas de Entrevista", "texto"));
  trilha.adicionarConteudo(new Conteudo("Casos de Uso na Prática", "video"));
  trilha.adicionarConteudo(new Conteudo("Quiz: Técnicas de Elicitação", "quiz"));

  // ── Cenário 1: Aluno no estudo diário (percorre tudo na ordem)
  console.log(`\n=== Modo Estudo: Trilha "${trilha.nome}" ===`);
  const iteradorLinear = trilha.criarIteradorLinear();
  while (iteradorLinear.temProximo()) {
    console.log("  →", iteradorLinear.proximo().toString());
  }

  // ── Cenário 2: Aluno em modo revisão (percorre apenas os Quizzes)
  console.log(`\n=== Modo Revisão: Apenas Quizzes da Trilha "${trilha.nome}" ===`);
  const iteradorRevisao = trilha.criarIteradorRevisao();
  while (iteradorRevisao.temProximo()) {
    console.log("  →", iteradorRevisao.proximo().toString());
  }
}

module.exports = { Conteudo, Trilha, IteradorLinear, IteradorRevisao };
