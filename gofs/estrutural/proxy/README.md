# Proxy — Padrão GoF Estrutural

> Plataforma **ConhecendoRequisitos** · Disciplina Arquitetura e Desenho de Software · UnB 2026.1

---

## O que é o Proxy?

O **Proxy** é um padrão de projeto estrutural que fornece um **substituto ou representante** de outro objeto para controlar o acesso a ele (GAMMA et al., 1995). O Proxy mantém a mesma interface do objeto real, permitindo que o cliente interaja de forma transparente — sem saber se está acessando o Proxy ou o serviço real.

### Tipos de Proxy

- **Protection Proxy** ✅ (usado neste projeto): controla acesso com base em permissões.
- **Virtual Proxy**: adia a criação de objetos pesados até que sejam realmente necessários.
- **Remote Proxy**: representa um objeto em outro espaço de endereçamento.
- **Logging Proxy**: registra acessos ao objeto real.

---

## Estrutura de arquivos

```
proxy/
├── models/
│   └── Usuario.js              # Modelo de usuário (Client data)
├── UsuarioService.js            # Interface abstrata (Subject)
├── UsuarioServiceReal.js        # Serviço real (RealSubject)
├── UsuarioServiceProxy.js       # Protection Proxy
├── index.js                     # Demonstração
└── README.md                    # Este arquivo
```

### O que cada arquivo faz

| Arquivo | Papel no padrão | Responsabilidade |
|---|---|---|
| `models/Usuario.js` | Client data | Modelo com email, nome, senha e tipo (aluno/administrador). |
| `UsuarioService.js` | Subject (Interface) | Classe abstrata com os 13 métodos do contrato. |
| `UsuarioServiceReal.js` | RealSubject | Implementação concreta que executa as operações reais. |
| `UsuarioServiceProxy.js` | Proxy | Verifica permissões antes de delegar ao RealSubject. |
| `index.js` | Client | Demonstração com 3 cenários de uso. |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v14 ou superior
- Sem dependências externas — Node.js puro

---

## Como rodar

```bash
cd gofs/estrutural/proxy
node index.js
```

### Saída esperada

```
══════════════════════════════════════════════════
  DEMONSTRAÇÃO — Padrão Proxy (Protection Proxy)
══════════════════════════════════════════════════

┌─────────────────────────────────────────────────
│ CENÁRIO 1: Usuario(nome='Carlos Nascimento', email='carlos@unb.br', tipo='administrador')
└─────────────────────────────────────────────────

📚 Criando conteúdo:
  ✔ Trilha 'Engenharia de Requisitos' criada com id=1.
  ✔ Módulo 'Intro a Requisitos' criado na trilha 1.
  ✔ Quiz 'Quiz: Intro Requisitos' criado no módulo 1.

✏️  Editando conteúdo:
  ✔ Trilha 1 editada para 'Eng. Requisitos v2'.
  ✔ Módulo 1 editado para 'Intro Requisitos v2'.
  ✔ Quiz 1 editado para 'Quiz v2'.

📊 Estatísticas:
  📊 Estatísticas da plataforma:
     Trilhas criadas : 1
     Módulos criados : 1
     Quizzes criados : 1

👤 Admin gerencia perfil de outro:
  ✔ Informações do usuário 'yasmin@unb.br' exibidas.
  ✔ Perfil de 'yasmin@unb.br' atualizado (nome='Yasmin N.').


┌─────────────────────────────────────────────────
│ CENÁRIO 2: Usuario(nome='Yasmin Nascimento', email='yasmin@unb.br', tipo='aluno')
└─────────────────────────────────────────────────

🚫 Tentando operações admin (bloqueado):
  ✘ ACESSO NEGADO: 'Yasmin Nascimento' (aluno) não tem permissão para criar trilha.
  ...

✅ Aluno acessa PRÓPRIO perfil:
  ✔ Informações do usuário 'yasmin@unb.br' exibidas.
  ✔ Perfil de 'yasmin@unb.br' atualizado (nome='Yasmin Silva').

🚫 Aluno tenta acessar perfil de OUTRO:
  ✘ ACESSO NEGADO: 'Yasmin Nascimento' (aluno) não pode visualizar informações de 'carlos@unb.br'.
  ...
```

---

## Participantes

| Matrícula | Aluno |
|-----------|-------|
| 231037665 | Carlos Nascimento |

---

## Referências

- GAMMA, E. et al. **Design Patterns**. Addison-Wesley, 1995.
- REFACTORING GURU. **Proxy**. Disponível em: https://refactoring.guru/design-patterns/proxy
