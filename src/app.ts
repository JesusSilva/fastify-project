import { FastifyPluginAsync } from 'fastify';
import mongoose from 'mongoose';

import fastifyStatic from 'fastify-static';
import path from 'path';
import pointOfView from 'point-of-view';
import formBodyPlugin from 'fastify-formbody';

import { DDBB } from './config';

import { main_router } from './routers/main.router';
import { auth_router } from './routers/auth.router';

export const main_app: FastifyPluginAsync = async (app) => {
  mongoose.connect(DDBB).then(() => app.log.info('Connected to MongoDB at ' + DDBB));

  app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/public/',
  });

  app.register(pointOfView, {
    engine: {
      handlebars: require('handlebars'),
    },
    layout: './views/layout/main.hbs',
    options: {
      partials: {
        menu: '/views/partials/menu.hbs',
      },
    },
  });

  app.register(formBodyPlugin);

  app.register(main_router);
  app.register(auth_router, { prefix: '/auth' });
};
