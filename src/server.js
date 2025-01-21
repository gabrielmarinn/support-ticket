// Importa o módulo 'http' do Node.js, usado para criar servidores HTTP e lidar com requisições e respostas.
import http from "node:http";

// Importa o middleware 'jsonHandler' do arquivo './middlewares/json-handler.js'.
// Esse middleware é responsável por processar o corpo da requisição HTTP, interpretando-o como JSON.
import { jsonHandler } from "./middlewares/json-handler.js";

// Importa o middleware 'routeHandler' do arquivo './middlewares/route-handler.js'.
// Esse middleware é responsável por identificar a rota correta com base na requisição e chamar o controlador correspondente.
import { routeHandler } from "./middlewares/route-handler.js";

// Define a função 'listener', que será usada como callback para tratar requisições HTTP recebidas pelo servidor.
// Essa função lida com o fluxo de execução de middlewares.
async function listener(req, res) {
  // Executa o middleware 'jsonHandler', que processa o corpo da requisição e adiciona os dados em `req.body`.
  // Usa 'await' porque o middleware é assíncrono.
  await jsonHandler(req, res);

  // Executa o middleware 'routeHandler', que identifica e processa a rota correspondente.
  // Não usa 'await' porque este middleware não é assíncrono.
  routeHandler(req, res);
}

// Cria um servidor HTTP usando o método 'http.createServer', passando a função 'listener' como callback.
// O servidor executa 'listener' sempre que uma requisição HTTP é recebida.
http
  .createServer(listener)

  // Define que o servidor ouvirá as requisições na porta 3333.
  // Isso significa que o servidor estará disponível em "http://localhost:3333".
  .listen(3333);
