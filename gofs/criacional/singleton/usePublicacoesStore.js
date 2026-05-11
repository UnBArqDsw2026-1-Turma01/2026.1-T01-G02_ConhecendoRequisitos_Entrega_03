const { useSyncExternalStore } = require("react");
const RepositorioDeConteudo = require("./RepositorioDeConteudo");

const repositorio = RepositorioDeConteudo.getInstance();

function useRepositorioDeConteudo() {
  return useSyncExternalStore(
    (listener) => repositorio.inscrever(listener),
    () => ({
      trilhas: repositorio.listarTrilhas(),
      modulos: repositorio.listarModulosPorTrilha
        ? repositorio.listarModulosPorTrilha(-1)
        : [],
      conteudos: [],
    }),
    () => ({ trilhas: [], modulos: [], conteudos: [] }),
  );
}

module.exports = useRepositorioDeConteudo;
module.exports.RepositorioDeConteudo = RepositorioDeConteudo;
module.exports.repositorio = repositorio;
