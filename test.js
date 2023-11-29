const fs = require("fs");
const glob = require("glob");
const puppeteer = require("puppeteer");

async function runTests() {
  const htmlFiles = glob.sync("*.html"); // Substitua pelo caminho do seu diretório com os arquivos HTML

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const file of htmlFiles) {
    const fileContent = fs.readFileSync(file, "utf8");

    await page.setContent(fileContent);

    const testResult = await page.evaluate(() => {
      // Aqui você pode incluir seus testes usando JavaScript no contexto da página carregada
      // Por exemplo:
      const headExists = document.querySelector("head") !== null;
      const h1Exists = document.querySelector("h1") !== null;
      const bodyExists = document.querySelector("body") !== null;
      const titleValid =
        document.querySelector("title") &&
        document.querySelector("title").textContent.trim() !== "";

      return { headExists, bodyExists, titleValid, h1Exists };
    });

    console.log(`Testando arquivo: ${file}`);
    console.log("Resultado dos testes:", testResult);

    // Lógica para lidar com os resultados dos testes, como relatar falhas ou resultados em um arquivo de saída

    // Pode ser útil criar algum arquivo de saída com os resultados dos testes para referência futura
    // fs.writeFileSync('resultados.txt', `Arquivo: ${file}\nTestes: ${JSON.stringify(testResult)}\n\n`, { flag: 'a' });
  }

  await browser.close();
}
runTests();
