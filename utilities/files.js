import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

export function createFiles(directory, template, truncate = false) {
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  for (const key of Object.keys(template)) {
    const filename = key.toLowerCase().includes('exports')
      ? directory + 'index.ts'
      : directory + key + '.ts';

    if (typeof truncate !== 'undefined' && truncate) {
      writeFileSync(filename, template[key]);
    } else {
      if (existsSync(filename)) {
        continue;
      } else {
        writeFileSync(filename, template[key]);
      }
    }
  }
}
