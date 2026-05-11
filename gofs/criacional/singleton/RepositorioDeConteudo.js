// Domínio: Conteúdo educacional
class Trilha {
  constructor(id, titulo, descricao, ordem) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.ordem = ordem;
  }
}

class Modulo {
  constructor(id, idTrilha, titulo, descricao) {
    this.id = id;
    this.idTrilha = idTrilha;
    this.titulo = titulo;
    this.descricao = descricao;
  }
}

class Conteudo {
  constructor(id, idModulo, titulo, tipo, dados) {
    this.id = id;
    this.idModulo = idModulo;
    this.titulo = titulo;
    this.tipo = tipo; // 'video', 'texto', 'exercicio', etc
    this.dados = dados;
  }
}

// Singleton: Repositório centralizado de conteúdo
class RepositorioDeConteudo {
  static #instance = null;

  #trilhas;
  #modulos;
  #conteudos;
  #proximoIdTrilha;
  #proximoIdModulo;
  #proximoIdConteudo;
  #assinantes;

  constructor() {
    if (RepositorioDeConteudo.#instance) {
      throw new Error(
        "RepositorioDeConteudo é um Singleton. Use RepositorioDeConteudo.getInstance()."
      );
    }

    this.#trilhas = [];
    this.#modulos = [];
    this.#conteudos = [];
    this.#proximoIdTrilha = 1;
    this.#proximoIdModulo = 1;
    this.#proximoIdConteudo = 1;
    this.#assinantes = new Set();
  }

  static getInstance() {
    if (!RepositorioDeConteudo.#instance) {
      RepositorioDeConteudo.#instance = new RepositorioDeConteudo();
    }

    return RepositorioDeConteudo.#instance;
  }

  // ────── Trilhas ──────
  adicionarTrilha(titulo, descricao, ordem) {
    const trilha = new Trilha(this.#proximoIdTrilha, titulo, descricao, ordem);
    this.#proximoIdTrilha += 1;
    this.#trilhas.push(trilha);
    this.#notificar();
    return { ...trilha };
  }

  obterTrilhaPorId(id) {
    const trilha = this.#trilhas.find((t) => t.id === id);
    return trilha ? { ...trilha } : null;
  }

  listarTrilhas() {
    return this.#trilhas.map((t) => ({ ...t }));
  }

  atualizarTrilha(id, dados) {
    const trilha = this.#trilhas.find((t) => t.id === id);
    if (!trilha) return null;

    Object.assign(trilha, dados);
    this.#notificar();
    return { ...trilha };
  }

  removerTrilha(id) {
    const indice = this.#trilhas.findIndex((t) => t.id === id);
    if (indice === -1) return false;

    this.#trilhas.splice(indice, 1);
    this.#modulos = this.#modulos.filter((m) => m.idTrilha !== id);
    this.#notificar();
    return true;
  }

  // ────── Módulos ──────
  adicionarModulo(idTrilha, titulo, descricao) {
    const modulo = new Modulo(this.#proximoIdModulo, idTrilha, titulo, descricao);
    this.#proximoIdModulo += 1;
    this.#modulos.push(modulo);
    this.#notificar();
    return { ...modulo };
  }

  obterModuloPorId(id) {
    const modulo = this.#modulos.find((m) => m.id === id);
    return modulo ? { ...modulo } : null;
  }

  listarModulosPorTrilha(idTrilha) {
    return this.#modulos
      .filter((m) => m.idTrilha === idTrilha)
      .map((m) => ({ ...m }));
  }

  atualizarModulo(id, dados) {
    const modulo = this.#modulos.find((m) => m.id === id);
    if (!modulo) return null;

    Object.assign(modulo, dados);
    this.#notificar();
    return { ...modulo };
  }

  removerModulo(id) {
    const indice = this.#modulos.findIndex((m) => m.id === id);
    if (indice === -1) return false;

    this.#modulos.splice(indice, 1);
    this.#conteudos = this.#conteudos.filter((c) => c.idModulo !== id);
    this.#notificar();
    return true;
  }

  // ────── Conteúdos ──────
  adicionarConteudo(idModulo, titulo, tipo, dados) {
    const conteudo = new Conteudo(
      this.#proximoIdConteudo,
      idModulo,
      titulo,
      tipo,
      dados
    );
    this.#proximoIdConteudo += 1;
    this.#conteudos.push(conteudo);
    this.#notificar();
    return { ...conteudo };
  }

  obterConteudoPorId(id) {
    const conteudo = this.#conteudos.find((c) => c.id === id);
    return conteudo ? { ...conteudo } : null;
  }

  listarConteudosPorModulo(idModulo) {
    return this.#conteudos
      .filter((c) => c.idModulo === idModulo)
      .map((c) => ({ ...c }));
  }

  atualizarConteudo(id, dados) {
    const conteudo = this.#conteudos.find((c) => c.id === id);
    if (!conteudo) return null;

    Object.assign(conteudo, dados);
    this.#notificar();
    return { ...conteudo };
  }

  removerConteudo(id) {
    const indice = this.#conteudos.findIndex((c) => c.id === id);
    if (indice === -1) return false;

    this.#conteudos.splice(indice, 1);
    this.#notificar();
    return true;
  }

  // ────── Observadores ──────
  inscrever(listener) {
    if (typeof listener !== "function") {
      return () => {};
    }

    this.#assinantes.add(listener);

    return () => {
      this.#assinantes.delete(listener);
    };
  }

  #notificar() {
    const snapshot = {
      trilhas: this.listarTrilhas(),
      modulos: this.#modulos.map((m) => ({ ...m })),
      conteudos: this.#conteudos.map((c) => ({ ...c })),
    };

    for (const listener of this.#assinantes) {
      listener(snapshot);
    }
  }
}

module.exports = RepositorioDeConteudo;
module.exports.Trilha = Trilha;
module.exports.Modulo = Modulo;
module.exports.Conteudo = Conteudo;