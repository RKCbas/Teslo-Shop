const { error } = require("console");
const { writeFileSync, mkdirSync } = require("fs");

const targetPath = "./src/environments/environment.ts";
const targetPathDev = "./src/environments/environment.development.ts";

const envFileContent = `
export const environment = {
  baseUrl: 'http://localhost:3000/api'
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
