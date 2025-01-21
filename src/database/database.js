// Importa o módulo de 'fs/promises' do Node.js para manipular arquivos de forma assíncrona.
import fs from "node:fs/promises";

// Define o caminho do arquivo que será usado como banco de dados (db.json), criando uma URL relativa ao módulo atual.
const DATABASE_PATH = new URL("db.json", import.meta.url);

// Declara a classe Database, que encapsula a lógica para gerenciar dados em um arquivo JSON simulando um banco de dados.
export class Database {
  // Propriedade privada '#database' para armazenar os dados em memória, protegendo-a contra acesso externo.
  #database = {};

  // Construtor da classe, executado ao criar uma instância de Database.
  constructor() {
    // Lê o arquivo JSON (db.json) para carregar os dados na propriedade #database.
    fs.readFile(DATABASE_PATH, "utf8")
      .then((data) => {
        // Se a leitura for bem-sucedida, converte os dados JSON para um objeto JavaScript e armazena em #database.
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        // Se o arquivo não existir ou ocorrer um erro, cria o arquivo com um banco de dados vazio.
        this.#persist();
      });
  }

  // Método privado '#persist' para salvar o conteúdo de #database no arquivo db.json.
  #persist() {
    // Converte o objeto #database em JSON e grava no arquivo.
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  // Método público 'insert' para adicionar um novo registro em uma tabela específica.
  insert(table, data) {
    // Verifica se já existe um array para a tabela no banco de dados.
    if (Array.isArray(this.#database[table])) {
      // Se existir, adiciona o novo registro ao array.
      this.#database[table].push(data);
    } else {
      // Se não existir, cria um novo array contendo o registro.
      this.#database[table] = [data];
    }

    // Persiste as alterações no arquivo.
    this.#persist();
  }

  // Método público 'select' para buscar registros de uma tabela, com ou sem filtros.
  select(table, filters) {
    // Recupera os registros da tabela solicitada ou retorna um array vazio se a tabela não existir.
    let data = this.#database[table] ?? [];

    // Se filtros forem fornecidos, aplica-os para filtrar os registros.
    if (filters) {
      data = data.filter((row) => {
        // Verifica se algum par chave-valor nos filtros corresponde aos dados do registro.
        return Object.entries(filters).some(([key, value]) => {
          // Compara os valores, convertendo ambos para minúsculas para uma busca case-insensitive.
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    // Retorna os dados filtrados (ou todos os dados se nenhum filtro for aplicado).
    return data;
  }

  // Método público 'update' para atualizar um registro em uma tabela com base no ID.
  update(table, id, data) {
    // Localiza o índice do registro que possui o ID correspondente.
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    // Se o registro for encontrado (índice maior que -1), realiza a atualização.
    if (rowIndex > -1) {
      // Atualiza o registro existente mesclando os dados antigos com os novos.
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex], // Dados antigos.
        ...data, // Novos dados.
      };

      // Persiste as alterações no arquivo.
      this.#persist();
    }
  }

  // Método público 'delete' para excluir um registro de uma tabela com base no ID.
  delete(table, id) {
    // Localiza o índice do registro que possui o ID correspondente.
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    // Se o registro for encontrado (índice maior que -1), realiza a exclusão.
    if (rowIndex > -1) {
      // Remove o registro do array usando o índice.
      this.#database[table].splice(rowIndex, 1);

      // Persiste as alterações no arquivo.
      this.#persist();
    }
  }
}
