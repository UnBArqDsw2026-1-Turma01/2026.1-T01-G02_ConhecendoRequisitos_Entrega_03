const Quiz = require("./Quiz");
const Questao = require("./Questao");
const TentativaQuiz = require("./TentativaQuiz");

console.log("======================================");
console.log("  DEMONSTRAÇÃO — Padrão State");
console.log("======================================\n");

const quiz = new Quiz(1, "Quiz: Introdução a Requisitos");
quiz.adicionarQuestao(
  new Questao(1, "O que é um requisito?", "Uma necessidade do sistema"),
);
quiz.adicionarQuestao(
  new Questao(2, "Qual a função do estado?", "Controlar o comportamento"),
);
quiz.adicionarQuestao(
  new Questao(3, "O que o Finalizado permite?", "Visualizar o resultado"),
);

const tentativa = new TentativaQuiz(1, quiz);

console.log("--- Estrutura criada ---");
console.log(quiz.toString());
console.log(quiz.exibirQuestoes());
console.log(tentativa.toString());

console.log("\n--- Estado inicial ---");
tentativa.atualizar();

console.log("\n--- Iniciando tentativa ---");
tentativa.iniciarQuiz(quiz.id);

console.log("\n--- Respondendo questões ---");
let questaoAtual = tentativa.getProximaQuestao();
while (questaoAtual) {
  console.log(`[ALUNO] Respondendo: ${questaoAtual.enunciado}`);
  tentativa.registrarResposta(true);
  questaoAtual = tentativa.getProximaQuestao();
}

console.log("\n--- Finalizando tentativa ---");
tentativa.finalizar();

console.log("\n--- Resultado final ---");
tentativa.visualizarResultado();
console.log(tentativa.toString());

console.log("\n======================================");
console.log("  FIM DA DEMONSTRAÇÃO");
console.log("======================================");
