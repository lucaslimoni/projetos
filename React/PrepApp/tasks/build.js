const path = require('path');
const util = require('util');
const fs = require('fs-extra');
const readdir = util.promisify(fs.readdir);
const adminDirectoryName = 'admin';

async function build() {
  const basePath = path.dirname(__dirname);
  const buildPath = path.resolve(basePath, 'build');
  const buildLegacy = path.resolve(basePath, 'legacy');
  const adminPath = path.join(buildPath, adminDirectoryName);

  // Copia o app para o diretório correspondente
  let resources = await readdir(buildPath);
  resources = resources.filter(element => element != adminDirectoryName);

  await fs.ensureDir(adminPath);

  for (let key in resources) {
    const name = resources[key];
    await fs.move(path.join(buildPath, name), path.join(adminPath, name));
  }

  // Adiciona a interface legada para o novo padrão
  let resourcesLegacy = await readdir(buildLegacy);
  resourcesLegacy = resourcesLegacy.filter(element => !element.startsWith('.'));

  for (let key in resourcesLegacy) {
    const name = resourcesLegacy[key];
    await fs.copy(path.join(buildLegacy, name), path.join(buildPath, name), {
      overwrite: true,
    });
  }
}

try {
  build();
} catch (e) {}
