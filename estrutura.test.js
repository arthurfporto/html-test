const fs = require("fs");
const { JSDOM } = require("jsdom");
const path = require("path");

// Diretório atual
const directory = path.join(__dirname);

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

const htmlFileNames = getAllHTMLFileNames(directory);

htmlFileNames.forEach((pagina) => {
  describe(`Estrutura ${pagina}`, () => {
    let dom;

    beforeAll(() => {
      // Carregar o conteúdo do arquivo HTML para teste
      const htmlContent = fs.readFileSync(pagina, "utf8");
      // Criar um ambiente DOM usando jsdom
      dom = new JSDOM(htmlContent);
    });

    test("<title>", () => {
      // Obter elemento title do DOM
      const titleElement = dom.window.document.querySelector("title");
      // Verificar se existe o elemento title
      expect(titleElement).not.toBeNull();

      // Verificar se o texto dentro da tag title não está vazio
      const titleText = titleElement.textContent.trim();
      expect(titleText).not.toBe("");
    });
  });
});
