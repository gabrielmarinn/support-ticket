// Exporta a função 'updateStatus', que é responsável por atualizar o status de um ticket no banco de dados.
// A função recebe um objeto com três propriedades: 'req' (requisição HTTP), 'res' (resposta HTTP) e 'database' (objeto para manipulação do banco de dados).
export function updateStatus({ req, res, database }) {
  // Desestrutura o parâmetro 'id' da URL (req.params).
  // Esse parâmetro captura o ID do ticket que será atualizado, por exemplo, em uma rota como `/tickets/:id`.
  const { id } = req.params;

  // Desestrutura o campo 'solution' do corpo da requisição (req.body).
  // O campo 'solution' contém a solução para o ticket, enviada pelo cliente na requisição.
  const { solution } = req.body;

  // Chama o método 'update' no banco de dados, passando:
  // - O nome da tabela/coleção: "tickets".
  // - O identificador do ticket a ser atualizado: 'id'.
  // - O objeto contendo os campos a serem atualizados: status definido como "closed" e a solução fornecida.
  database.update("tickets", id, { status: "closed", solution });

  // Envia uma resposta HTTP ao cliente para indicar que a operação foi concluída.
  // Como não há conteúdo adicional, usa-se apenas 'res.end()' para encerrar a resposta.
  return res.end();
}
