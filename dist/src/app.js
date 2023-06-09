"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const typeorm_config_1 = __importDefault(require("../typeorm.config"));
const user_repository_1 = __importDefault(require("./repositories/user.repository"));
const users_service_1 = __importDefault(require("./services/users.service"));
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
require("./controllers/user.controller");
require("./controllers/auth.controller");
require("./controllers/product.controller");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_service_1 = __importDefault(require("./services/auth.service"));
const product_repository_1 = __importDefault(require("./repositories/product.repository"));
const product_service_1 = __importDefault(require("./services/product.service"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const expr = (0, express_1.default)();
const port = process.env.PORT;
exports.AppDataSource = new typeorm_1.DataSource(typeorm_config_1.default);
exports.AppDataSource.initialize()
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
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const container = new inversify_1.Container();
    container.bind(user_repository_1.default).toSelf();
    container.bind(users_service_1.default).toSelf();
    container.bind(auth_service_1.default).toSelf();
    container.bind(product_repository_1.default).toSelf();
    container.bind(product_service_1.default).toSelf();
    expr.use(body_parser_1.default.json());
    expr.use(body_parser_1.default.urlencoded({ extended: true }));
    expr.use((0, cors_1.default)());
    const fileStorage = (0, multer_1.default)({
        storage: multer_1.default.diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                // Rename the file
                cb(null, file.originalname);
            },
        }),
    });
    const server = new inversify_express_utils_1.InversifyExpressServer(container, null, null, expr);
    const app = server.build();
    app.listen(3000, () => {
        console.log('server is running on port 3000');
    });
});
bootstrap();
