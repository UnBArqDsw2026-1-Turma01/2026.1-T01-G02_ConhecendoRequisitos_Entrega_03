# State

Pasta com a demonstração do padrão State aplicada à classe `TentativaQuiz`.

## Como executar

```bash
node index.js
```

## O que a demonstração mostra

- `NaoIniciado` controla o início da tentativa.
- `EmAndamento` controla o avanço entre questões.
- `Finalizado` controla a visualização do resultado.
- `TentativaQuiz` atua como contexto e delega o comportamento ao estado atual.
