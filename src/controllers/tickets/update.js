// Exporta a função 'update', que é responsável por atualizar as informações de um ticket no banco de dados.
// A função recebe um objeto contendo 'req' (requisição HTTP), 'res' (resposta HTTP) e 'database' (objeto para manipulação do banco de dados).
export function update({ req, res, database }) {
  // Desestrutura o parâmetro 'id' da URL (req.params).
  // Esse parâmetro captura o ID do ticket que será atualizado, por exemplo, em uma rota como `/tickets/:id`.
  const { id } = req.params;

  // Desestrutura os campos 'equipament' e 'description' do corpo da requisição (req.body).
  // Esses campos contêm os novos valores que serão atualizados no ticket.
  const { equipament, description } = req.body;

  // Chama o método 'update' no banco de dados, passando:
  // - O nome da tabela/coleção: "tickets".
  // - O identificador do ticket que será atualizado: 'id'.
  // - Um objeto contendo os novos valores a serem atualizados:
  //   - 'equipament': novo valor para o equipamento associado ao ticket.
  //   - 'description': nova descrição do problema no ticket.
  //   - 'update_at': registra a data e hora atuais para indicar quando a atualização foi feita.
  database.update("tickets", id, {
    equipament,
    description,
    update_at: new Date(), // Atualiza a data de modificação do ticket.
  });

  // Envia uma resposta HTTP ao cliente para indicar que a operação foi concluída.
  // Como não há conteúdo adicional, utiliza-se apenas 'res.end()' para encerrar a resposta.
  return res.end();
}
