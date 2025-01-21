// Importa o array de rotas específicas relacionadas a "tickets" do módulo './tickets.js'.
// Essas rotas provavelmente contêm informações como método HTTP (GET, POST, etc.), caminho (path) e controladores (controllers).
import { tickets } from "./tickets.js";

// Importa a função 'parseRoutePath' de '../utils/parse-route-path.js'.
// Essa função será usada para transformar os caminhos das rotas em um formato processável, como expressões regulares.
import { parseRoutePath } from "../utils/parse-route-path.js";

// Cria e exporta um array de rotas, baseado nas rotas de "tickets", mas com o caminho processado.
// Usa o operador de espalhamento (`...`) para copiar os atributos de cada rota e substitui a propriedade 'path' com o resultado de 'parseRoutePath'.
export const routes = [...tickets].map((route) => ({
  ...route, // Copia todas as propriedades da rota original, como 'method' e 'controller'.
  path: parseRoutePath(route.path), // Transforma o 'path' usando 'parseRoutePath' para facilitar o roteamento dinâmico.
}));
