const { JSDOM } = require("jsdom");
const fs = require("fs");

describe("Estrutura HTML", () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync("index.html", "utf-8");
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  test("Deve conter um elemento <head>", () => {
    expect(document.querySelector("head")).not.toBeNull();
  });

  test("Deve conter um elemento <body>", () => {
    expect(document.querySelector("body")).not.toBeNull();
  });

  test("Deve conter um título válido", () => {
    const titleElement = document.querySelector("title");
    expect(titleElement).not.toBeNull();
    expect(titleElement.textContent.trim()).not.toBe("");
  });
});
