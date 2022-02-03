import { FastifyRequest } from 'fastify';
import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { BROWSER, LANGUAGE, OS } from '../models/enums.model';

/**
 * Creamos las siguientes funciones, las cuales nos ayudaran
 * a obtener la información que necesitamos, en este caso dicha
 * información proviene del request.headers['user-agent'] y
 * request.headers['accept-language']
 */

export const getBrowser = (request: FastifyRequest): BROWSER => {
  let browser: BROWSER = BROWSER.UNKNOWN;
  const userAgent = request.headers['user-agent'];

  if (userAgent) {
    if (userAgent.includes('Chrome')) {
      browser = BROWSER.CHROME;
    } else if (userAgent.includes('Safari')) {
      browser = BROWSER.SAFARI;
    } else if (userAgent.includes('Firefox')) {
      browser = BROWSER.FIREFOX;
    } else if (userAgent.includes('Postman')) {
      browser = BROWSER.POSTMAN;
    } else {
      browser = BROWSER.UNKNOWN;
    }
  }

  return browser;
};

export const getOS = (request: FastifyRequest): OS => {
  let os: OS = OS.UNKNOWN;
  const userAgent = request.headers['user-agent'];

  if (userAgent) {
    if (userAgent.includes('Mac')) {
      os = OS.MAC;
    } else if (userAgent.includes('Windows')) {
      os = OS.WINDOWS;
    } else if (userAgent.includes('Linux')) {
      os = OS.UBUNTU;
    }
  }

  return os;
};

export const getLanguage = (request: FastifyRequest): LANGUAGE => {
  let lang: LANGUAGE = LANGUAGE.UNKNOW;
  const userAgent = request.headers['accept-language'];

  if (userAgent) {
    if (userAgent.includes('ES')) {
      lang = LANGUAGE.ES;
    } else if (userAgent.includes('EN')) {
      lang = LANGUAGE.EN;
    } else if (userAgent.includes('DE')) {
      lang = LANGUAGE.DE;
    } else if (userAgent.includes('PT')) {
      lang = LANGUAGE.PT;
    } else if (userAgent.includes('FR')) {
      lang = LANGUAGE.FR;
    }
  }

  return lang;
};

/**
 * Utilizando la fusión de declaraciones, añade los accesorios de tu plugin
 * a las interfaces de FastifyRequest
 */
declare module 'fastify' {
  // Debe hacer referencia a la interfaz y no al tipo
  interface FastifyRequest {
    browser: BROWSER;
    os: OS;
    lang: LANGUAGE;
  }
}

/**
 * Exportamos nuestro middleware para poder acceder desde cualquier parte
 * de nuestra aplicación a los datos del entorno.
 *
 * Para usar este middleware, deberemos añadir un hook a nuestra app
 * para que cuando hagamos peticiones (onRequest) el hook se dispare. Al ejecutarse,
 * la request se modificará para añadir nuestro browser, operating system y language
 *
 * Por último deberemos registrar este middleware en nuestro fichero app.ts
 */
export const middlewareEnviroment: FastifyPluginAsync = fastifyPlugin(async (app) => {
  app.addHook('onRequest', async (req, res) => {
    req.browser = getBrowser(req);
    req.os = getOS(req);
    req.lang = getLanguage(req);
  });
});
