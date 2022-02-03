import dotenv from 'dotenv';

dotenv.config();

const checkEnvironment = (environment: string) => {
  if (!process.env[environment]) {
    throw new Error(`Please define the Enviroment variable ${environment}`);
  } else {
    return process.env[environment] as string;
  }
};

export const ROOT: string = checkEnvironment('ROOT');
export const PORT: number = parseInt(checkEnvironment('PORT'));
export const DDBB: string = checkEnvironment('DDBB') + '' + checkEnvironment('NAME');

export const GITHUB: { [key: string]: string } = {
  CLIENT_ID: checkEnvironment('GITHUB_ID'),
  CLIENT_SECRET: checkEnvironment('GITHUB_SECRET'),
  CALLBACK: checkEnvironment('GITHUB_CALLBACK'),
};
