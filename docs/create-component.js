const readline = require("readline");

const askQuestion = function (query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const main = async function() {
  const fs = require("fs");
  const path = require("path");
  const name = await askQuestion("name-of-component: ");
  if(!name.match(/^[a-z\-]+$/g)) {
    throw new Error("Name must be lowercase and hyphen-separated only");
  }
  const protoz = {
    html: path.resolve(`${__dirname}/src/components/prototype/prototype.html`),
    css: path.resolve(`${__dirname}/src/components/prototype/prototype.css`),
    js: path.resolve(`${__dirname}/src/components/prototype/prototype.js`),
  }
  const componentPath = path.resolve(`${__dirname}/src/components/${name}`);
  let outputStat = undefined;
  
  try {
    await fs.promises.lstat(componentPath);
  } catch (error) {
    await fs.promises.mkdir(componentPath);
    await fs.promises.lstat(componentPath);
  }
  const outputz = {
    html: path.resolve(`${__dirname}/src/components/${name}/${name}.html`),
    css: path.resolve(`${__dirname}/src/components/${name}/${name}.css`),
    js: path.resolve(`${__dirname}/src/components/${name}/${name}.js`),
  }
  const html = await fs.promises.readFile(protoz.html, "utf8");
  const css = await fs.promises.readFile(protoz.css, "utf8");
  const js = await fs.promises.readFile(protoz.js, "utf8");

  const contentz = {
    html: html.replace(/\$prototype/g, name),
    css: css.replace(/\$prototype/g, name),
    js: js.replace(/\$prototype/g, name),
  };
  
  await fs.promises.writeFile(outputz.html, contentz.html, "utf8");
  await fs.promises.writeFile(outputz.css, contentz.css, "utf8");
  await fs.promises.writeFile(outputz.js, contentz.js, "utf8");
  
}

main();