const fs = require("fs");
const { JSDOM } = require("jsdom");
const path = require("path");

// Diretório atual
const directory = path.join(__dirname, "../");

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

    test("doctype", () => {
      // Verificar se o doctype é HTML
      const doctype = dom.window.document.doctype;
      expect(doctype.name).toBe("html");
    });

    test("<html>", () => {
      // Obter elementos h1 do DOM
      const h1Elements = dom.window.document.querySelectorAll("html");
      // Verificar se há pelo menos um elemento h1
      expect(h1Elements.length).toBe(1);
    });

    test("<head>", () => {
      // Obter elementos h1 do DOM
      const h1Elements = dom.window.document.querySelectorAll("head");
      // Verificar se há pelo menos um elemento h1
      expect(h1Elements.length).toBe(1);
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

    test("<body>", () => {
      // Obter elementos h1 do DOM
      const h1Elements = dom.window.document.querySelectorAll("body");
      // Verificar se há pelo menos um elemento h1
      expect(h1Elements.length).toBe(1);
    });
  });
});
