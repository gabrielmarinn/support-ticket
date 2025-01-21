// Exporta a função 'index', que é usada para listar tickets de acordo com filtros opcionais.
// A função recebe um objeto com três propriedades: 'req' (requisição HTTP), 'res' (resposta HTTP) e 'database' (objeto para manipulação do banco de dados).
export function index({ req, res, database }) {
  // Desestrutura o parâmetro 'status' da query string da requisição (req.query).
  // Isso captura qualquer filtro de status que possa ter sido enviado pelo cliente na URL, como `?status=open`.
  const { status } = req.query;

  // Cria um objeto 'filters' que será usado para filtrar os tickets no banco de dados.
  // Se 'status' estiver definido, 'filters' será um objeto { status }; caso contrário, será 'null', indicando que não há filtros.
  const filters = status ? { status } : null;

  // Chama o método 'select' no banco de dados para buscar os tickets.
  // Se 'filters' for nulo, todos os tickets serão retornados. Caso contrário, os tickets serão filtrados pelo 'status'.
  const tickets = database.select("tickets", filters);

  // Converte a lista de tickets (um array) para o formato JSON e envia como resposta HTTP ao cliente.
  // 'res.end' encerra a conexão após enviar os dados.
  return res.end(JSON.stringify(tickets));
}
