import 'reflect-metadata';
import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import config from '../typeorm.config';
import UserRepository from './repositories/user.repository';
import UserService from './services/users.service';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import './controllers/user.controller';
import './controllers/auth.controller';
import './controllers/product.controller';
import bodyParser from 'body-parser';
import AuthService from './services/auth.service';
import ProductRepository from './repositories/product.repository';
import ProductService from './services/product.service';
import cors from 'cors';
import multer from 'multer';

dotenv.config();

const expr: Express = express();
const port = process.env.PORT;

export const AppDataSource = new DataSource(config);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// container.registerSingleton(UserRepository);

// Register UserService and UserController with UserRepository dependency
// container.register(UserService, {
// useClass: UserService,
// deps: [UserRepository],
// });
// container.register(UserController, {
// useClass: UserController,
// deps: [UserService],
// });

// Get instance of UserController with all dependencies injected
// const userController = container.resolve(UserController);

// app.use(express.json());

// const userRepository = new UserRepository();
// const userService = new UserService(userRepository);
// const userController = new UserController(userService);

// const userController = container.resolve(UserController);

// const container = new Container();
// container.bind(UserService).toSelf();
// container.bind(UserRepository).toSelf();
// container.bind<UserController>(UserController).toSelf();

// const server = new InversifyExpressServer(container);
// const app = server.build();

// app.use(express.json());
// app.get('/users/:id', userController.findOneUser);
// app.post('/users/login', userController.login);

// router.post('/', userController.createExample);
// router.get('/:id', userController.getExampleById);
// router.put('/:id', userController.updateExample);
// router.delete('/:id', userController.deleteExample);

// app.get('/users', userController.getAllUsers);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });

const bootstrap = async () => {
  const container = new Container();
  container.bind(UserRepository).toSelf();
  container.bind(UserService).toSelf();
  container.bind(AuthService).toSelf();
  container.bind(ProductRepository).toSelf();
  container.bind(ProductService).toSelf();
  expr.use(bodyParser.json());
  expr.use(bodyParser.urlencoded({ extended: true }));
  expr.use(cors());

  const fileStorage = multer({
    storage: multer.diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        // Rename the file
        cb(null, file.originalname);
      },
    }),
  });

  const server = new InversifyExpressServer(container, null, null, expr);
  const app = server.build();
  app.listen(3000, () => {
    console.log('server is running on port 3000');
  });
};

bootstrap();
