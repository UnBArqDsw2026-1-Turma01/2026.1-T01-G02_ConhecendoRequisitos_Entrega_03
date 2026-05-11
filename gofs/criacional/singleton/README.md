# Singleton - Padrão GoF Criacional

> Plataforma **ConhecendoRequisitos** · Disciplina Arquitetura e Desenho de Software · UnB 2026.1

---

## O que é o Singleton?

O **Singleton** é um padrão de projeto criacional que garante que uma classe tenha **apenas uma instância** em todo o sistema e que essa instância possa ser acessada globalmente a partir de um ponto único. Isso evita duplicidade de estado e facilita o compartilhamento de dados entre diferentes partes da aplicação.

No projeto, o Singleton foi aplicado à classe **`RepositorioDeConteudo`**, responsável por centralizar trilhas, módulos e conteúdos educacionais. A mesma instância pode ser consumida por componentes React por meio de um hook baseado em `useSyncExternalStore`.

---

## Estrutura de arquivos

```
singleton/
├── RepositorioDeConteudo.js # Classe Singleton que centraliza trilhas, módulos e conteúdos
├── usePublicacoesStore.js   # Hook React para consumir o singleton
└── index.js                 # Demonstração em Node.js
```

### O que cada arquivo faz

| Arquivo                    | Responsabilidade                                                                                                                                                           |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RepositorioDeConteudo.js` | Núcleo do padrão. Bloqueia a instanciação direta, guarda o estado de trilhas, módulos e conteúdos, notifica assinantes e expõe `getInstance()` como ponto único de acesso. |
| `usePublicacoesStore.js`   | Integra o singleton com React usando `useSyncExternalStore`, permitindo que componentes reajam às mudanças do catálogo de conteúdo.                                        |
| `index.js`                 | Demonstração do comportamento singleton no terminal, mostrando que chamadas repetidas retornam a mesma instância.                                                          |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v14 ou superior
- [React](https://react.dev/) apenas se o hook `usePublicacoesStore.js` for consumido na interface

Verifique sua versão:

```bash
node --version
```

---

## Como rodar a demonstração

```bash
cd gofs/criacional/singleton
node index.js
```

### Saída esperada

```
repo1 === repo2 (mesma instância?): true

--- Criando uma trilha via repo1 ---
[listener notificado] Trilhas: 1, Módulos: 0, Conteúdos: 0

--- Adicionando módulos via repo2 ---
[listener notificado] Trilhas: 1, Módulos: 1, Conteúdos: 0
[listener notificado] Trilhas: 1, Módulos: 2, Conteúdos: 0

--- Adicionando conteúdos ---
[listener notificado] Trilhas: 1, Módulos: 2, Conteúdos: 1
[listener notificado] Trilhas: 1, Módulos: 2, Conteúdos: 2
```

---

## Uso em React

O singleton pode ser consumido diretamente por componentes React. A ideia é manter o catálogo de conteúdo centralizado e usar o hook para refletir mudanças na interface.

```jsx
import useRepositorioDeConteudo from "./usePublicacoesStore";

function ListaDeTrilhas() {
  const { trilhas } = useRepositorioDeConteudo();

  return (
    <ul>
      {trilhas.map((trilha) => (
        <li key={trilha.id}>{trilha.titulo}</li>
      ))}
    </ul>
  );
}
```

Com isso, qualquer alteração feita no `RepositorioDeConteudo` é propagada para os componentes inscritos, sem a necessidade de múltiplas instâncias ou cópias de estado.

---

## Observações de projeto

O uso do Singleton faz sentido quando existe um **estado central** que precisa ser compartilhado, como um catálogo de conteúdo educacional. No caso deste projeto, o `RepositorioDeConteudo` reduz o risco de inconsistência entre telas (uma tela não vê uma trilha que outra criou) e mantém uma única fonte de verdade para os dados educacionais exibidos em toda a plataforma.
