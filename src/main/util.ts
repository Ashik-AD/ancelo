/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from 'fs/promises';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}
type JsonReadWritePromise = Error | { write?: boolean; data?: string };
export function JsonReadWrite(
  filePath: string,
  mode?: 'READ' | 'WRITE',
  data?: any
): Promise<JsonReadWritePromise> {
  return new Promise(async (resolve, reject) => {
    try {
      const fsMode = mode ?? 'READ';
      const resolvedPath = path.resolve(__dirname, filePath);
      if (fsMode == 'READ') {
        const fileContent = await fs.readFile(resolvedPath, {
          encoding: 'utf8',
        });

        resolve({ data: fileContent ? JSON.parse(fileContent) : [] });
      }
      const serialized = JSON.stringify(data);
      await fs.writeFile(resolvedPath, serialized);
      resolve({ write: true });
    } catch (error) {
      reject(error);
    }
  });
}
