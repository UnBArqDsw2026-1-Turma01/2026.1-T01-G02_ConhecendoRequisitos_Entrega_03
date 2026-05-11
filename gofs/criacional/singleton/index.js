const RepositorioDeConteudo = require("./RepositorioDeConteudo");

console.log("======================================");
console.log("  DEMONSTRAÇÃO — Padrão Singleton");
console.log("======================================\n");

const repo1 = RepositorioDeConteudo.getInstance();
const repo2 = RepositorioDeConteudo.getInstance();

console.log(`repo1 === repo2 (mesma instância?): ${repo1 === repo2}`);
console.log();

const cancelarAssinatura = repo1.inscrever((estado) => {
  console.log(
    `[listener notificado] Trilhas: ${estado.trilhas.length}, ` +
      `Módulos: ${estado.modulos.length}, ` +
      `Conteúdos: ${estado.conteudos.length}`,
  );
});

console.log("--- Criando uma trilha via repo1 ---");
const trilha = repo1.adicionarTrilha(
  "Engenharia de Requisitos",
  "Aprenda técnicas modernas de levantamento de requisitos",
  1,
);
console.log(`Trilha criada: ID ${trilha.id} - "${trilha.titulo}"`);

console.log("\n--- Adicionando módulos via repo2 ---");
const modulo1 = repo2.adicionarModulo(
  trilha.id,
  "Introdução a Requisitos",
  "Conceitos fundamentais",
);
console.log(`Módulo 1 criado: ID ${modulo1.id}`);

const modulo2 = repo2.adicionarModulo(
  trilha.id,
  "Elicitação de Requisitos",
  "Técnicas de entrevista e observação",
);
console.log(`Módulo 2 criado: ID ${modulo2.id}`);

console.log("\n--- Adicionando conteúdos ---");
const conteudo1 = repo1.adicionarConteudo(
  modulo1.id,
  "Vídeo: O que é requisito?",
  "video",
  { url: "https://exemplo.com/video1", duracao: 15 },
);
console.log(`Conteúdo 1 adicionado: ID ${conteudo1.id}`);

const conteudo2 = repo1.adicionarConteudo(
  modulo2.id,
  "Exercício: Pratique elicitação",
  "exercicio",
  { enunciado: "Realize uma entrevista simulada" },
);
console.log(`Conteúdo 2 adicionado: ID ${conteudo2.id}`);

console.log("\n--- Listando estrutura do repositório ---");
console.log("\nTrilhas:");
console.log(JSON.stringify(repo1.listarTrilhas(), null, 2));

console.log("\nMódulos da trilha " + trilha.id + ":");
console.log(JSON.stringify(repo2.listarModulosPorTrilha(trilha.id), null, 2));

console.log("\nConteúdos do módulo " + modulo1.id + ":");
console.log(
  JSON.stringify(repo1.listarConteudosPorModulo(modulo1.id), null, 2),
);

console.log("\n--- Atualizando um módulo ---");
repo1.atualizarModulo(modulo1.id, {
  descricao: "Atualizado: Fundamentos e prática",
});

console.log("\n--- Removendo um conteúdo ---");
repo2.removerConteudo(conteudo2.id);

console.log("\n--- Estado final do repositório ---");
console.log(`Total de Trilhas: ${repo1.listarTrilhas().length}`);
console.log(
  `Total de Módulos: ${repo2.listarModulosPorTrilha(trilha.id).length}`,
);
console.log(
  `Total de Conteúdos no Módulo 1: ${repo1.listarConteudosPorModulo(modulo1.id).length}`,
);

cancelarAssinatura();
