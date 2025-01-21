// Exporta a função 'remove', que é usada para excluir um ticket com base no seu ID.
// A função recebe um objeto com três propriedades: 'req' (requisição HTTP), 'res' (resposta HTTP) e 'database' (objeto para manipulação do banco de dados).
export function remove({ req, res, database }) {
  // Desestrutura o parâmetro 'id' da URL (req.params).
  // Isso captura o ID do ticket que o cliente deseja excluir, por exemplo, em uma rota como `/tickets/:id`.
  const { id } = req.params;

  // Chama o método 'delete' no banco de dados, indicando a tabela ("tickets") e o ID do ticket a ser excluído.
  // Essa operação remove o registro correspondente no banco de dados.
  database.delete("tickets", id);

  // Envia uma resposta HTTP ao cliente, indicando que a operação foi concluída.
  // Como não há conteúdo adicional, usa-se apenas 'res.end()' para encerrar a resposta.
  return res.end();
}
