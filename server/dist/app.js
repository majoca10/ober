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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var https_1 = __importDefault(require("https"));
var apollo_server_express_1 = require("apollo-server-express");
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var graphql_passport_1 = require("graphql-passport");
var verifyToken_1 = __importDefault(require("./utils/verifyToken"));
var typeDef_1 = __importDefault(require("./graphql/typeDef"));
var resolvers_1 = __importDefault(require("./graphql/resolvers"));
var passport_2 = require("./passport");
var auth_1 = __importDefault(require("./graphql/directives/auth"));
var fs_1 = __importDefault(require("fs"));
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
mongoose_1.default.connect('mongodb://127.0.0.1:27017/uber', options)
    .then(function () { return console.log('Successfully connected to mongodb'); })
    .catch(function (e) { return console.error(e); });
var pubsub = new apollo_server_express_1.PubSub();
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDef_1.default,
    resolvers: resolvers_1.default,
    schemaDirectives: {
        isAuthorized: auth_1.default,
    },
    context: function (_a) {
        var req = _a.req, res = _a.res, connection = _a.connection;
        if (connection) {
            return { data: connection.context, pubsub: pubsub };
        }
        console.log(req);
        return (0, graphql_passport_1.buildContext)({ req: req, res: res, pubsub: pubsub });
    },
    subscriptions: {
        onConnect: function (connectionParams, webSocket, context) { return __awaiter(void 0, void 0, void 0, function () {
            var Authorization, token, _a, data, isDriver;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Authorization = connectionParams.Authorization;
                        token = Authorization === null || Authorization === void 0 ? void 0 : Authorization.split('Bearer ')[1];
                        if (!token) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, verifyToken_1.default)(token)];
                    case 1:
                        _a = _b.sent(), data = _a.data, isDriver = _a.isDriver;
                        return [2 /*return*/, { currentUser: { data: data, isDriver: isDriver } }];
                    case 2: throw new apollo_server_express_1.AuthenticationError('Missing token');
                }
            });
        }); },
        onDisconnect: function (webSocket, context) {
        },
    }
});
var app = (0, express_1.default)();
var path = '/graphql';
(0, passport_2.localStrategy)();
(0, passport_2.jwtStrategy)();
app.use(path, passport_1.default.initialize());
app.use(path, function (req, res, next) {
    return passport_1.default.authenticate('jwt', { session: false }, function (error, info) {
        if (info) {
            req.user = info;
        }
        next();
    })(req, res, next);
});
server.applyMiddleware({ app: app, path: path });
var httpsServer = https_1.default.createServer({
    key: fs_1.default.readFileSync('private.key'),
    cert: fs_1.default.readFileSync('api_enlaruta_online.crt'),
}, app);
server.installSubscriptionHandlers(httpsServer);
httpsServer.listen(process.env.PORT, function () {
    console.log("\uD83D\uDE80 Server ready at https://localhost:".concat(process.env.PORT).concat(server.graphqlPath));
    console.log("\uD83D\uDE80 Subscriptions ready at wss://localhost:".concat(process.env.PORT).concat(server.subscriptionsPath));
});
