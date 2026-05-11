# Builder — Padrão GoF Criacional

> Plataforma **ConhecendoRequisitos** · Disciplina Arquitetura e Desenho de Software · UnB 2026.1

---

## O que é o Builder?

O **Builder** é um padrão de projeto criacional que separa a **construção** de um objeto complexo da sua **representação final**. Em vez de um construtor cheio de parâmetros ou lógica condicional, o Builder monta o objeto passo a passo, delegando cada etapa a uma classe especializada.

No projeto, ele é usado para criar dois tipos de usuário — **Aluno** e **Administrador** — que compartilham campos comuns mas possuem atributos e comportamentos exclusivos.

---

## Estrutura de arquivos

```
builder/
├── models/
│   ├── Usuario.js            # Classe abstrata base (Product)
│   ├── Aluno.js              # Produto concreto com ofensiva de estudos
│   └── Administrador.js      # Produto concreto com gestão de conteúdo
├── builders/
│   ├── UsuarioBuilder.js     # Interface abstrata do Builder
│   ├── AlunoBuilder.js       # Builder concreto para Aluno
│   └── AdministradorBuilder.js # Builder concreto para Administrador
├── UsuarioDiretor.js         # Diretor — orquestra a sequência de passos
└── index.js                  # Ponto de entrada / demonstração
```

### O que cada arquivo faz

| Arquivo | Papel no padrão | Responsabilidade |
|---|---|---|
| `models/Usuario.js` | Product abstrato | Campos e métodos comuns a todos os usuários. Nunca instanciada diretamente. |
| `models/Aluno.js` | Product concreto | Adiciona `MaiorOfensiva`, `ofensivaAtual`, `ultimoAcesso` e `verificarOfensiva()`. |
| `models/Administrador.js` | Product concreto | Adiciona contadores de criação e métodos de gestão (`criarTrilha`, `criarQuizz`, etc.). |
| `builders/UsuarioBuilder.js` | Builder abstrato | Define a interface: `definirTipo()`, `definirNome()`, `definirEmail()`, `definirSenha()`, `getResultado()`. |
| `builders/AlunoBuilder.js` | ConcreteBuilder | Implementa `definirTipo()` criando um `Aluno` e `definirCamposAluno()` para os campos específicos. |
| `builders/AdministradorBuilder.js` | ConcreteBuilder | Implementa `definirTipo()` criando um `Administrador` e `definirPermissoesAdmin()` para os contadores. |
| `UsuarioDiretor.js` | Director | Chama os passos na ordem correta: tipo → campos comuns → campos específicos → resultado. |
| `index.js` | Client | Demonstração completa: constrói um Aluno, um Administrador e reutiliza o Diretor. |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v14 ou superior
- Sem dependências externas — Node.js puro

Verifique sua versão:

```bash
node --version
```

---

## Como rodar

```bash
# Entre na pasta do Builder
cd gofs/criacional/builder

# Execute o ponto de entrada
node index.js
```

### Saída esperada

```
======================================
  DEMONSTRAÇÃO — Padrão Builder
======================================

--- Construindo Aluno ---
Aluno(nome='Yasmin Nascimento', email='yasmin@unb.br', tipo='aluno')
Nome: Yasmin Nascimento | E-mail: yasmin@unb.br | Tipo: aluno
Ofensiva mantida! Sequência atual: 0 dias.

--- Construindo Administrador ---
Administrador(nome='Carlos Nascimento', email='carlos@unb.br', tipo='administrador')
Nome: Carlos Nascimento | E-mail: carlos@unb.br | Tipo: administrador
Trilha 'Engenharia de Requisitos' criada: Trilha sobre técnicas de elicitação.
Módulo 'Introdução a Requisitos' criado (total: 1).
Quiz 'Quiz: Introdução a Requisitos' criado (total: 1).

Estatísticas do Admin 'Carlos Nascimento':
  Conteúdos criados : 1
  Quizzes criados   : 1

--- Construindo segundo Aluno (mesmo Diretor, novo Builder) ---
Aluno(nome='Daniel Nascimento', email='daniel@unb.br', tipo='aluno')
Login bem-sucedido? true
```

---

## Fluxo de construção

```
Cliente
  │
  ▼
UsuarioDiretor.construirUsuario(builder, nome, email, senha)
  │
  ├── 1. builder.definirTipo()          → instancia Aluno ou Administrador
  ├── 2. builder.definirNome(nome)      → campo comum
  ├── 3. builder.definirEmail(email)    → campo comum
  ├── 4. builder.definirSenha(senha)    → campo comum
  ├── 5. builder.definirCampos*()       → campos específicos do tipo
  └── 6. builder.getResultado()         → retorna o objeto finalizado
```

---

## Participantes

| Matrícula | Aluno             |
|-----------|-------------------|
| 231027032 | Arthur Oliveira   |
| 231037665 | Daniel Nascimento |
| 231026699 | Eduarda Rodrigues |
| 231038303 | Yan Aguiar        |

---

## Referências

- GAMMA, E. et al. **Design Patterns**. Addison-Wesley, 1995.
- REFACTORING GURU. **Builder**. Disponível em: https://refactoring.guru/design-patterns/builder
