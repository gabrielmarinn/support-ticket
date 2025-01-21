// Importa os controladores responsáveis por manipular as rotas relacionadas aos tickets.
// Cada controlador implementa uma funcionalidade específica (criação, listagem, atualização, etc.).

// Importa o controlador para criar um novo ticket.
import { create } from "../controllers/tickets/create.js";

// Importa o controlador para listar tickets.
import { index } from "../controllers/tickets/index.js";

// Importa o controlador para atualizar um ticket existente.
import { update } from "../controllers/tickets/update.js";

// Importa o controlador para atualizar o status de um ticket (como "fechar" o ticket).
import { updateStatus } from "../controllers/tickets/update-status.js";

// Importa o controlador para remover um ticket.
import { remove } from "../controllers/tickets/remove.js";

// Define um array `tickets` que contém todas as rotas relacionadas ao recurso "tickets".
// Cada rota é descrita como um objeto contendo:
// - `method`: Método HTTP (ex.: GET, POST, PUT).
// - `path`: Caminho associado à rota, que pode incluir parâmetros dinâmicos (ex.: `:id`).
// - `controller`: Função que será executada quando a rota for acessada.

export const tickets = [
  // Rota para criar um novo ticket.
  {
    method: "POST", // Método HTTP POST é usado para criação de recursos.
    path: "/tickets", // Caminho da rota (não contém parâmetros dinâmicos).
    controller: create, // Controlador responsável por criar um ticket.
  },

  // Rota para listar tickets existentes.
  {
    method: "GET", // Método HTTP GET é usado para recuperação de dados.
    path: "/tickets", // Caminho da rota (sem parâmetros dinâmicos).
    controller: index, // Controlador responsável por listar tickets.
  },

  // Rota para atualizar os dados de um ticket específico.
  {
    method: "PUT", // Método HTTP PUT é usado para atualizações completas de recursos.
    path: "/tickets/:id", // Caminho da rota com o parâmetro dinâmico `:id` (identificador do ticket a ser atualizado).
    controller: update, // Controlador responsável por realizar a atualização.
  },

  // Rota para atualizar o status de um ticket específico, por exemplo, fechá-lo.
  {
    method: "PATCH", // Método HTTP PATCH é usado para atualizações parciais de recursos.
    path: "/tickets/:id/close", // Caminho da rota com o parâmetro dinâmico `:id` e uma ação específica (`close`).
    controller: updateStatus, // Controlador responsável por atualizar o status do ticket.
  },

  // Rota para remover um ticket específico.
  {
    method: "DELETE", // Método HTTP DELETE é usado para exclusão de recursos.
    path: "/tickets/:id", // Caminho da rota com o parâmetro dinâmico `:id`.
    controller: remove, // Controlador responsável por excluir o ticket.
  },
];
