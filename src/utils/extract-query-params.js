// Exporta a função 'extractQueryParams', que converte uma string de query string em um objeto.
// A string de query string é um formato como "?name=John&age=30" que será transformada em { name: "John", age: "30" }.
export function extractQueryParams(query) {
  return query
    .slice(1) // Remove o primeiro caractere da string (geralmente "?", indicando o início da query string).
    .split("&") // Divide a string em pares chave-valor separados pelo caractere "&".
    .reduce((queryParams, param) => {
      // Itera sobre os pares chave-valor gerados no array (ex.: ["name=John", "age=30"]).

      const [key, value] = param.split("=");
      // Divide cada par chave-valor pelo sinal "=" para obter a chave e o valor separados.
      // Exemplo: "name=John" -> key: "name", value: "John".

      queryParams[key] = value;
      // Adiciona a chave e o valor ao objeto acumulador 'queryParams'.
      // Exemplo: { name: "John" } na primeira iteração, { name: "John", age: "30" } na segunda.

      return queryParams;
      // Retorna o objeto atualizado a cada iteração do reduce.
    }, {}); // Inicializa o objeto acumulador como um objeto vazio {}.
}
