// Importa a função randomUUID do módulo 'crypto' do Node.js, que será usada para gerar um identificador único para o ticket.
import { randomUUID } from "node:crypto";

// Exporta a função 'create', que é responsável por criar um novo ticket. Ela recebe um objeto com três propriedades: 'req' (requisição HTTP), 'res' (resposta HTTP) e 'database' (objeto para manipulação do banco de dados).
export function create({ req, res, database }) {
  // Desestrutura o corpo da requisição (req.body) para obter os dados enviados:
  // 'equipament' (equipamento relacionado ao ticket), 'description' (descrição do problema) e 'user_name' (nome do usuário que reportou o problema).
  const { equipament, description, user_name } = req.body;

  // Cria um novo objeto 'ticket' contendo os dados do ticket que será salvo no banco de dados.
  const ticket = {
    // Gera um ID único para identificar o ticket, usando a função randomUUID().
    id: randomUUID(),

    // Atribui os valores recebidos na requisição aos campos correspondentes do ticket.
    equipament,
    description,
    user_name,

    // Define o status inicial do ticket como "open", indicando que o ticket está ativo e ainda não foi resolvido.
    status: "open",

    // Registra a data e hora atuais como a data de criação do ticket.
    created_at: new Date(),

    // Registra a mesma data e hora atuais como a data de última atualização, já que o ticket acabou de ser criado.
    updated_at: new Date(),
  };

  // Insere o novo objeto 'ticket' no banco de dados, na coleção/tabela chamada "tickets".
  database.insert("tickets", ticket);

  // Retorna uma resposta HTTP com o código 201 (Created) para indicar que o recurso foi criado com sucesso.
  // Adiciona o objeto 'ticket' como o corpo da resposta no formato JSON.
  return res.writeHead(201).end(JSON.stringify(ticket));
}
