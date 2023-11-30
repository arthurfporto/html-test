const fs = require("fs");
const path = require("path");

// Diretório atual
const currentDirectory = __dirname;

function getAllHTMLFileNames(directory) {
  try {
    // Ler o conteúdo do diretório atual
    const files = fs.readdirSync(directory);

    // Filtrar apenas os arquivos com extensão .html
    const htmlFiles = files.filter((file) => path.extname(file) === ".html");

    // Retornar apenas os nomes dos arquivos HTML
    return htmlFiles.map((file) => file);
  } catch (err) {
    console.error("Erro ao ler o diretório:", err);
    return [];
  }
}

const htmlFileNames = getAllHTMLFileNames(currentDirectory);
console.log(htmlFileNames); // Array com os nomes dos arquivos HTML na pasta atual
