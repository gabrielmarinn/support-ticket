// Exporta a função 'parseRoutePath', que converte um caminho de rota em uma expressão regular para facilitar o roteamento dinâmico.
// A função permite que rotas com parâmetros dinâmicos (ex.: "/users/:id") sejam processadas de forma eficiente.
export function parseRoutePath(path) {
  // Define uma expressão regular para encontrar parâmetros dinâmicos no caminho da rota.
  // Um parâmetro dinâmico é identificado pelo prefixo ":" seguido de letras (ex.: ":id").
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  // Substitui os parâmetros dinâmicos no caminho por grupos nomeados de uma expressão regular.
  // Exemplo:
  // Entrada: "/users/:id"
  // Saída: "/users/(?<id>[a-z0-9-_]+)"
  // Isso cria um grupo nomeado chamado "id" que captura valores que correspondem ao padrão definido.
  const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_]+)");

  // Cria uma expressão regular completa para a rota, incluindo a possibilidade de query strings.
  // Exemplo:
  // Entrada: "/users/:id"
  // Saída: /^\/users\/(?<id>[a-z0-9-_]+)(?<query>\?(.*))?$/
  // - `^` e `$`: Garantem que o caminho corresponde do início ao fim.
  // - `(?<$1>[a-z0-9-_]+)`: Captura parâmetros dinâmicos, como "id".
  // - `(?<query>\?(.*))?$`: Permite que a rota aceite uma query string opcional após o caminho principal.
  const pathRegex = new RegExp(`^${params}(?<query>\\?(.*))?$`);

  // Retorna a expressão regular gerada, que será usada para verificar e extrair informações de URLs.
  return pathRegex;
}
