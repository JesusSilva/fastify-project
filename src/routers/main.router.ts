import { FastifyPluginAsync } from 'fastify';

const home = (req: any, res: any) => {
  req.log.info('Get /');
  res.view('views/welcome', {
    title: 'Página de Inicio.',
    OS: req.os,
    browser: req.browser,
    language: req.lang,
  });
};

export const main_router: FastifyPluginAsync = async (server) => {
  server.get('/', home);
};
