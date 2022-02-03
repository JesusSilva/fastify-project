import { FastifyPluginAsync } from 'fastify';

const get_signin = (req: any, res: any) => {
  req.log.info('Get /signin');
  res.view('views/auth/signin', { title: 'Pagina de signin.' });
};

const post_signin = (req: any, res: any) => {
  req.log.info('Get /signin');
  res.view('views/auth/signin', { title: 'Pagina de signin.' });
};

const get_signup = (req: any, res: any) => {
  req.log.info('Get /signup');
  res.view('views/auth/signup', { title: 'Pagina de signup.' });
};

const post_signup = (req: any, res: any) => {
  req.log.info('Get /signup');
  res.view('views/auth/signup', { title: 'Pagina de signup.' });
};

export const auth_router: FastifyPluginAsync = async (server) => {
  server.get('/signin', get_signin);
  server.post('/signin', post_signin);
  server.get('/signup', get_signup);
  server.post('/signup', post_signup);
};
