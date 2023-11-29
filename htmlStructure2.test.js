const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Função para verificar a estrutura básica do HTML
function hasBasicHTMLStructure(document) {
  const htmlTag = document.querySelector("html");
  const headTag = document.querySelector("head");
  const bodyTag = document.querySelector("body");
  const h1 = document.querySelector("h1");

  return htmlTag && headTag && bodyTag && h1;
}

describe("Estrutura HTML", () => {
  const directoryPath = "./"; // Altere para o caminho do seu diretório

  // Função para buscar arquivos HTML no diretório
  function findHTMLFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.filter((file) => path.extname(file) === ".html");
  }

  let dom;
  let document;

  beforeAll(() => {
    const htmlFiles = findHTMLFiles(directoryPath);

    if (htmlFiles.length === 0) {
      throw new Error("Nenhum arquivo HTML encontrado no diretório.");
    }

    const html = fs.readFileSync(
      path.join(directoryPath, htmlFiles[0]),
      "utf-8"
    );
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  test.each(findHTMLFiles(directoryPath))("Arquivo: %s", (fileName) => {
    const html = fs.readFileSync(path.join(directoryPath, fileName), "utf-8");
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    expect(hasBasicHTMLStructure(doc)).toBeTruthy();
  });
});
