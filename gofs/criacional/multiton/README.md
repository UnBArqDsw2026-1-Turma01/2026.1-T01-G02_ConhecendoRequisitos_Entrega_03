# Multiton — Padrão GoF Criacional

> Plataforma **ConhecendoRequisitos** · Disciplina Arquitetura e Desenho de Software · UnB 2026.1

---

## O que é o Multiton?

O **Multiton** é um padrão de projeto criacional que generaliza o Singleton. Enquanto o Singleton garante **uma única instância** global, o Multiton garante **uma instância por chave** — um conjunto controlado e nomeado de instâncias únicas, armazenadas em um mapa estático interno à classe.

No projeto, ele é aplicado à classe `ConexaoDB`, que gerencia um pool de conexões com banco de dados, **uma por contexto**. Em vez de abrir múltiplas conexões para o mesmo grupo de tabelas, cada módulo da aplicação reutiliza sempre a mesma instância.

---

## Conexão com o DLD (Entrega 02)

Os contextos foram definidos diretamente a partir do **Diagrama Lógico de Dados** entregue na Entrega 02:

| Contexto (chave) | Tabelas gerenciadas |
|---|---|
| `"usuarios"` | `Usuario`, `Aluno`, `Administrador` |
| `"conteudo"` | `Trilha`, `Modulo`, `Conteudo`, `Quiz`, `Questao`, `Alternativa` |
| `"progresso"` | `ProgressoTrilha`, `ProgressoModulo`, `ProgressoConteudo` |
| `"quizzes"` | `TentativaQuiz` |

---

## Estrutura de arquivos

```
multiton/
├── config/
│   └── contextos.js     # Configuração dos contextos de BD (baseado no DLD)
├── ConexaoDB.js         # Classe Multiton — pool de conexões por contexto
└── index.js             # Ponto de entrada / demonstração
```

### O que cada arquivo faz

| Arquivo | Responsabilidade |
|---|---|
| `config/contextos.js` | Define os 4 contextos de BD com suas tabelas, descrições e esquemas. Baseado diretamente no DLD da Entrega 02. Para adicionar um novo contexto, basta inserir uma nova entrada aqui. |
| `ConexaoDB.js` | Núcleo do Multiton. Mantém o `Map` estático privado `#pool`, bloqueia instanciação direta e expõe `getConexao(contexto)` como único ponto de acesso. Simula abertura de conexão, execução de queries e encerramento. |
| `index.js` | Demonstração completa: abre 4 conexões, prova que `dbUsuarios1 === dbUsuarios2`, executa queries por contexto, exibe status e encerra o pool. |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v14.6+ (necessário para campos privados `#`)
- Sem dependências externas — Node.js puro

```bash
node --version   # deve ser >= 14.6
```

---

## Como rodar

```bash
# Entre na pasta do Multiton
cd gofs/criacional/multiton

# Execute o ponto de entrada
node index.js
```

### Saída esperada (resumida)

```
--- Abrindo conexão para 'usuarios' (1ª vez) ---
[ConexaoDB] ✓ Conexão aberta para contexto "usuarios" (3 tabela(s): Usuario, Aluno, Administrador)

--- Solicitando 'usuarios' novamente (2ª vez) ---
[ConexaoDB] ↩ Conexão reutilizada para contexto "usuarios"

── Verificação de identidade ─────────────────────────
dbUsuarios1 === dbUsuarios2 (mesma conexão?): true
dbUsuarios1 === dbConteudo  (contextos diferentes?): false

[USUARIOS] Query #1: "SELECT * FROM Usuario WHERE tipo = 'aluno'" → 4 linha(s)
[CONTEUDO] Query #1: "SELECT * FROM Trilha ORDER BY ordem" → 4 linha(s)
...

[ConexaoDB] ✗ Conexão fechada para contexto "usuarios"
[ConexaoDB] ✗ Conexão fechada para contexto "conteudo"
...
Conexões após reset: 0
```

> **Ponto-chave:** `dbUsuarios1 === dbUsuarios2` é `true` — a segunda chamada não abriu uma nova conexão, reutilizou a do pool.

---

## Como adicionar um novo contexto

1. Abra `config/contextos.js`
2. Adicione uma nova entrada:

```js
autenticacao: {
  descricao: "Tokens e sessões de autenticação",
  tabelas: ["Token", "Sessao"],
  schema: {
    Token: { pk: "id", fk: "Usuario(email)" },
    Sessao: { pk: "id", fk: "Token(id)" },
  },
},
```

3. `ConexaoDB.getConexao("autenticacao")` funcionará automaticamente.

---

## Participantes

| Matrícula | Aluno              |
|-----------|--------------------|
| 231027032 | Arthur Oliveira    |
| 222006650 | Davi Sousa         |
| 231026699 | Eduarda Rodrigues  |
| 231012316 | Yasmin Nascimento  |

---

## Referências

- GAMMA, E. et al. **Design Patterns**. Addison-Wesley, 1995.
- ELMASRI, R.; NAVATHE, S. **Sistemas de Banco de Dados**. 6. ed. Pearson, 2011.
- REFACTORING GURU. **Singleton**. Disponível em: https://refactoring.guru/design-patterns/singleton
