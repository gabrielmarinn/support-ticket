// Importa as rotas definidas em "../routes/index.js".
import { routes } from "../routes/index.js";

// Importa a classe Database, que será usada para gerenciar os dados do banco de dados.
import { Database } from "../database/database.js";

// Importa a função 'extractQueryParams', que processa parâmetros da query string.
import { extractQueryParams } from "../utils/extract-query-params.js";

// Cria uma instância da classe Database, que será usada para manipular dados durante as requisições.
const database = new Database();

// Exporta a função 'routeHandler', que é responsável por identificar e manipular a rota correspondente para cada requisição HTTP.
export function routeHandler(req, res) {
  // Procura na lista de rotas (routes) a primeira rota que corresponda ao método HTTP e ao padrão de URL da requisição.
  const route = routes.find((route) => {
    // Verifica se o método da rota é igual ao método da requisição (GET, POST, etc.)
    // e se a URL da requisição corresponde ao padrão definido no campo 'path' da rota.
    return route.method === req.method && route.path.test(req.url);
  });

  // Se uma rota correspondente for encontrada:
  if (route) {
    // Usa o método 'match' para extrair os parâmetros da URL com base no padrão 'path' da rota.
    const routeParams = req.url.match(route.path);

    // Desestrutura o resultado do match para separar:
    // - 'query': a string contendo os parâmetros da query string (ex.: "?name=John&age=30").
    // - 'params': os demais parâmetros nomeados extraídos da URL.
    const { query, ...params } = routeParams.groups;

    // Adiciona os parâmetros da URL (ex.: ':id' em "/users/:id") ao objeto da requisição (req).
    req.params = params;

    // Converte a query string (se existir) em um objeto utilizando 'extractQueryParams'.
    // Caso não exista uma query string, define 'req.query' como um objeto vazio.
    req.query = query ? extractQueryParams(query) : {};

    // Chama o controlador associado à rota encontrada, passando:
    // - O objeto da requisição (req), que agora inclui os parâmetros e a query string processados.
    // - O objeto de resposta (res) para enviar respostas ao cliente.
    // - O banco de dados (database) para interagir com os dados.
    return route.controller({ req, res, database });
  }

  // Se nenhuma rota correspondente for encontrada, retorna uma resposta HTTP 404 (Not Found).
  return res.writeHead(404).end();
}
