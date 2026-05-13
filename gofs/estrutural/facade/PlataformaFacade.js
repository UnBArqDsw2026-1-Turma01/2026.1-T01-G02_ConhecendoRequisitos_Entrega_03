// 1. SUBSISTEMAS (Importando padrões criacionais)
const ConexaoDB = require("../../criacional/multiton/ConexaoDB");
const UsuarioDiretor = require("../../criacional/builder/UsuarioDiretor");
const AlunoBuilder = require("../../criacional/builder/builders/AlunoBuilder");
const AdministradorBuilder = require("../../criacional/builder/builders/AdministradorBuilder");

class PlataformaFacade {
  constructor() {
    this.diretor = new UsuarioDiretor(); // O Maestro
  }

  // ÚNICA porta de entrada para cadastrar qualquer pessoa.
  // O Facade decide sozinho qual Builder usar e quais Bancos (Multiton) chamar.
  cadastrarUsuario(tipo, nome, email, senha) {
    console.log(`\n[FACADE] Recebida solicitação para cadastrar um '${tipo}': ${nome}...`);
    let builder;

    // 1. Escolhe a ferramenta (Builder) de acordo com o tipo solicitado
    if (tipo.toLowerCase() === "aluno") {
      builder = new AlunoBuilder();
    } else if (tipo.toLowerCase() === "administrador") {
      builder = new AdministradorBuilder();
    } else {
      throw new Error(`[ERRO] Tipo de usuário '${tipo}' não existe no projeto!`);
    }

    // 2. O Diretor monta o objeto complexo na memória (usando a ferramenta escolhida)
    const novoUsuario = this.diretor.construirUsuario(builder, nome, email, senha);

    // 3. Salva os dados padrão no banco global de usuários
    const dbUsuarios = ConexaoDB.getConexao("usuarios");
    dbUsuarios.query(`INSERT INTO Usuario (nome, email, tipo) VALUES ('${novoUsuario.nome}', '${novoUsuario.email}', '${novoUsuario.tipo}')`);

    // 4. Prepara o ecossistema específico para o tipo criado!
    if (novoUsuario.tipo === "aluno") {
      const dbProgresso = ConexaoDB.getConexao("progresso");
      dbProgresso.query(`INSERT INTO ProgressoTrilha (email_aluno, ofensiva) VALUES ('${novoUsuario.email}', ${novoUsuario.ofensivaAtual})`);
      console.log(`[FACADE] Ambiente educacional e banco de progresso preparados!`);
    } else {
      console.log(`[FACADE] Permissões concedidas. Ambiente administrativo pronto!`);
    }

    return novoUsuario;
  }

  /**
   * Esconde a necessidade de fazer MÚLTIPLAS chamadas para salvar uma simples conclusão.
   */
  concluirModulo(emailAluno, moduloId) {
    console.log(`\n[FACADE] Finalizando módulo ${moduloId} para: ${emailAluno}`);
    
    // Chama o banco A (Progresso)
    const dbProgresso = ConexaoDB.getConexao("progresso");
    dbProgresso.query(`UPDATE ProgressoModulo SET concluido = true WHERE email = '${emailAluno}'`);
    
    // Chama o banco B (Usuários)
    const dbUsuarios = ConexaoDB.getConexao("usuarios");
    dbUsuarios.query(`UPDATE Aluno SET ofensivaAtual = ofensivaAtual + 1 WHERE email = '${emailAluno}'`);
    
    console.log(`[FACADE] Módulo concluído e experiência (Ofensiva) atualizada com sucesso!`);
  }
}

// 3. TESTE PRÁTICO (Simulando o Cliente)
if (require.main === module) {
  const sistema = new PlataformaFacade();

  // O Cliente usa só 1 linha e o sistema inteiro se resolve lá dentro:
  sistema.cadastrarUsuario("aluno", "Yasmin", "yasmin@unb.br", "senha123");
  sistema.cadastrarUsuario("administrador", "Arthur", "arthur@unb.br", "admin123");

  sistema.concluirModulo("yasmin@unb.br", 3);
}

module.exports = PlataformaFacade;
