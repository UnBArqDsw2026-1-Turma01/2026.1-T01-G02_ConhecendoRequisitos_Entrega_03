# Prototype — Padrão GoF Criacional

> Plataforma **ConhecendoRequisitos** · Disciplina Arquitetura e Desenho de Software · UnB 2026.1

---

## O que é o Prototype?

O **Prototype** é um padrão de projeto criacional que permite criar novos objetos a partir da clonagem de instâncias já existentes, evitando recriações complexas e reduzindo o acoplamento entre classes.

Em vez de instanciar objetos diretamente utilizando `new`, o sistema utiliza objetos protótipos previamente configurados e realiza cópias através do método `clone()`.

No projeto, o Prototype é utilizado para criar cópias de elementos educacionais da plataforma, como trilhas, módulos, quizzes, questões e alternativas.

---

## Estrutura de arquivos

```text
prototype/
├── models/
│   ├── Trilha.js             # Produto concreto da trilha
│   ├── Modulo.js             # Produto concreto do módulo
│   ├── Quizz.js              # Produto concreto do quiz
│   ├── Questao.js            # Produto concreto da questão
│   └── Alternativa.js        # Produto concreto da alternativa
├── prototypes/
│   └── Prototype.js          # Interface abstrata Prototype
├── PrototypeRegistro.js      # Registro de protótipos disponíveis
└── index.js                  # Ponto de entrada / demonstração
```

### O que cada arquivo faz

| Arquivo | Papel no padrão | Responsabilidade |
|---|---|---|
| `prototypes/Prototype.js` | Prototype abstrato | Define o método `clone()` que deve ser implementado pelos produtos concretos. |
| `models/Trilha.js` | ConcretePrototype | Representa uma trilha da plataforma e implementa `clone()`. |
| `models/Modulo.js` | ConcretePrototype | Representa módulos pertencentes às trilhas e implementa `clone()`. |
| `models/Quizz.js` | ConcretePrototype | Representa quizzes da plataforma e implementa `clone()`. |
| `models/Questao.js` | ConcretePrototype | Representa questões dos quizzes e implementa `clone()`. |
| `models/Alternativa.js` | ConcretePrototype | Representa alternativas das questões e implementa `clone()`. |
| `PrototypeRegistro.js` | Prototype Registry | Armazena protótipos previamente configurados e fornece clones quando solicitado. |
| `index.js` | Client | Demonstra o uso do padrão Prototype realizando clonagens dos objetos. |

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
# Entre na pasta do Prototype
cd gofs/criacional/prototype

# Execute o ponto de entrada
node index.js
```

---

## Saída esperada

```text
======================================
  DEMONSTRAÇÃO — Padrão Prototype
======================================

A trilha Engenharia de Requisitos possui 3 módulos.
Trilha em andamento.
Trilha concluída.

O módulo Introdução possui 5 conteúdos.

Quiz Quiz Inicial possui 4 questões.
Quiz iniciado para o usuário yasmin@unb.br.

Resposta correta? true

Alternativa: Uma necessidade do usuário
```

---

## Fluxo de clonagem

```text
Cliente
  │
  ▼
PrototypeRegistro.criar(tipo)
  │
  ├── 1. Busca o protótipo registrado
  ├── 2. Executa clone()
  └── 3. Retorna uma nova cópia do objeto
```

---

## Funcionamento do Prototype

```text
Objeto Original
       │
       ▼
   clone()
       │
       ▼
Novo Objeto Copiado
```

O clone mantém as características do objeto original, permitindo reutilização de estruturas previamente configuradas.

---

## Participantes

| Matrícula | Aluno             |
|-----------|-------------------|
| 190042303 | Carlos Nascimento |
| 231035455 | Leticia Jesus     |
| 200067095	| Lucas Avelar      |
| 231012316 | Yasmin Nascimento |

---

## Referências

## Referências

- GAMMA, E. et al. **Design Patterns**. Addison-Wesley, 1995.
- REFACTORING GURU. **Prototype**. Disponível em: https://refactoring.guru/design-patterns/prototype
- CÓDIGO FONTE TV. **PROTOTYPE | Design Patterns na prática #12**. YouTube, 2022. Disponível em: https://www.youtube.com/watch?v=NMwokH-kKZE