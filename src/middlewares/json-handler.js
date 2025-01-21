// Exporta a função assíncrona 'jsonHandler', que processa o corpo de uma requisição HTTP (req) para interpretá-lo como JSON.
// Essa função também configura o cabeçalho de resposta para indicar que a resposta será em JSON.
export async function jsonHandler(req, res) {
  // Cria um array vazio 'buffers' para armazenar os pedaços (chunks) de dados recebidos no corpo da requisição.
  const buffers = [];

  // Itera de forma assíncrona sobre os chunks de dados recebidos no objeto de requisição (req).
  // 'for await' é usado para consumir streams assíncronas, como o corpo de uma requisição.
  for await (const chunk of req) {
    // Adiciona cada chunk recebido ao array 'buffers'.
    buffers.push(chunk);
  }

  // Tenta interpretar o conteúdo recebido como JSON.
  try {
    // Concatena todos os chunks em um único buffer, converte para string e, em seguida, tenta transformá-lo em um objeto JSON.
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (err) {
    // Se ocorrer um erro durante a conversão (ex.: JSON inválido), define 'req.body' como null para indicar que o corpo não pôde ser processado.
    req.body = null;
  }

  // Configura o cabeçalho HTTP da resposta (res) para indicar que o conteúdo retornado será no formato JSON.
  res.setHeader("Content-Type", "application/json");
}
