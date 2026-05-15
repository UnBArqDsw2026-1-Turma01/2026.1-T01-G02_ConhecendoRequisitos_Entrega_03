# Composite — Padrão GoF Estrutural

> Plataforma **ConhecendoRequisitos** · Disciplina Arquitetura e Desenho de Software · UnB 2026.1

---

## O que é o Composite?

O **Composite** é um padrão de projeto estrutural que permite tratar objetos individuais e composições de objetos de maneira uniforme. Ele organiza os elementos em uma estrutura hierárquica, onde um componente composto pode conter outros componentes e um componente folha representa o elemento final da árvore.

---

## Estrutura de arquivos

```
composite/
├── ElementoEducacional.js   # Componente abstrato
├── Trilha.js                # Composite principal
├── Modulo.js                # Composite intermediário
├── Conteudo.js              # Leaf
├── index.js                 # Demonstração
└── README.md                # Este arquivo
```

---

## Como rodar

```bash
cd gofs/estrutural/composite
node index.js
```

---

## Saída esperada

A demonstração exibe a criação de uma trilha com módulos e conteúdos, mostra o progresso inicial, marca itens como concluídos e imprime o progresso final da estrutura.
