import 'dotenv/config';
import express from 'express';
import http from 'http';
import https from 'https';
import { ApolloServer, AuthenticationError, PubSub } from 'apollo-server-express';
import mongoose from 'mongoose';
import passport from 'passport';
import { buildContext } from 'graphql-passport';

import verifyToken from './utils/verifyToken';
import typeDefs from './graphql/typeDef';
import resolvers from './graphql/resolvers';
import { localStrategy, jwtStrategy } from './passport';
import IsAuthorizedDirective from './graphql/directives/auth';
import fs from 'fs';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect('mongodb://127.0.0.1:27017/uber', options)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    isAuthorized: IsAuthorizedDirective,
  },
  context: ({ req, res, connection }) => {
    if (connection) {
      return { data: connection.context, pubsub };
    }
    console.log(req)
    return buildContext({ req, res, pubsub });
  },
  subscriptions: {
    onConnect: async (connectionParams:{Authorization?:string}, webSocket, context) => {
      const { Authorization } = connectionParams;
      const token = Authorization?.split('Bearer ')[1];
      if (token) {
        const { data, isDriver } = await verifyToken(token);
        return { currentUser: { data, isDriver } };
      }
      throw new AuthenticationError('Missing token');
    },
    onDisconnect: (webSocket, context) => {
    },
  } });

const app = express();
const path = '/graphql';

localStrategy();
jwtStrategy();

app.use(path, passport.initialize());
app.use(path, (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (error, info) => {
    if (info) {
      req.user = info;
    }
    next();
  })(req, res, next));

server.applyMiddleware({ app, path });
const httpsServer = https.createServer({
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('api_enlaruta_online.crt'),
}, app);
server.installSubscriptionHandlers(httpsServer);

httpsServer.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at https://localhost:${process.env.PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at wss://localhost:${process.env.PORT}${server.subscriptionsPath}`);
  });
