# Mediator — Padrão Comportamental

## Descrição

O padrão **Mediator** centraliza a coordenação entre múltiplos objetos (colegas), evitando que eles se comuniquem diretamente. Isso reduz o acoplamento e facilita a manutenção de regras de orquestração complexas.

Neste projeto, o `FluxoAprendizagemMediator` coordena as interações entre Aluno, Conteúdo, Módulo, Quiz e Progresso, centralizando as regras de transição do fluxo de aprendizagem.

## Estrutura

- **IMediator.js**: Interface que define o contrato do mediador.
- **FluxoAprendizagemMediator.js**: Implementação concreta do mediador.
- **Aluno.js, Conteudo.js, Modulo.js, Quiz.js, ProgressoConteudo.js, ProgressoModulo.js, TentativaQuiz.js**: Classes "colegas" que se comunicam através do mediador.
- **index.js**: Demonstração do fluxo completo.

## Como executar

```bash
node index.js
```

## Fluxo demonstrado

1. Aluno seleciona uma trilha.
2. Mediador inicia o fluxo.
3. Aluno conclui conteúdos.
4. Mediador atualiza progresso, verifica conclusão do módulo e libera quiz.
5. Mediador cria tentativa de quiz.
6. Fluxo é finalizado.

## Conceitos-chave

- **Centralização**: Toda a lógica de coordenação fica em um único lugar (o mediador).
- **Desacoplamento**: Colegas não precisam se conhecer diretamente; conversam através do mediador.
- **Facilidade de manutenção**: Mudanças em regras de fluxo são implementadas no mediador, sem afetar os colegas.
