"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var services_1 = require("../../services");
var subscriptions_1 = require("../subscriptions");
var MATCHED_DRIVER_STATE = 'MATCHED_DRIVER_STATE';
exports.default = {
    Query: {
        driver: function (_, args, context) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!context.req.user) {
                                throw new apollo_server_express_1.AuthenticationError('No authorization');
                            }
                            ;
                            return [4 /*yield*/, services_1.Driver.getDriverInfo({ email: args.email })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
    },
    Mutation: {
        createDriver: function (_, args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, services_1.Driver.signup(args)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        loginDriver: function (_, payload, context) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, services_1.Driver.login(context, payload)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        sendResponse: function (_, args, context) {
            return __awaiter(this, void 0, void 0, function () {
                var driverId, result, trip_1, trip;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            driverId = context.req.user.data._id;
                            return [4 /*yield*/, services_1.Trip.checkStatus(args)];
                        case 1:
                            result = _a.sent();
                            if (!(result === 'success')) return [3 /*break*/, 3];
                            return [4 /*yield*/, services_1.Trip.setMatchedDriver({ driverId: driverId, tripId: args.tripId })];
                        case 2:
                            trip_1 = _a.sent();
                            context.pubsub.publish(subscriptions_1.DRIVER_RESPONDED, { driverResponded: trip_1 });
                            return [2 /*return*/, { result: result, trip: trip_1 }];
                        case 3: return [4 /*yield*/, services_1.Trip.get({ id: args.tripId })];
                        case 4:
                            trip = _a.sent();
                            return [2 /*return*/, { result: result, trip: trip }];
                    }
                });
            });
        },
        driverStateNotify: function (_, args, context) {
            return __awaiter(this, void 0, void 0, function () {
                var trip;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, services_1.Trip.get({ id: args.tripId })];
                        case 1:
                            trip = _a.sent();
                            context.pubsub.publish(MATCHED_DRIVER_STATE, { matchedDriverState: __assign(__assign({}, args), { trip: trip }) });
                            return [2 /*return*/, args];
                    }
                });
            });
        },
        updateDriverPosition: function (_, args, _a) {
            var req = _a.req;
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, services_1.Driver.updateDriverPosition(__assign({ driverId: req.user.data._id }, args))];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, { result: 'success' }];
                        case 2:
                            error_1 = _b.sent();
                            return [2 /*return*/, { result: 'fail' }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
    },
    Subscription: {
        driverListen: {
            subscribe: apollo_server_express_1.withFilter(function (_, args, context) {
                return context.pubsub.asyncIterator([subscriptions_1.CALL_REQUESTED]);
            }, function (payload, variables, context) {
                if (payload.driverListen.driverIds) {
                    return payload.driverListen.driverIds.includes(context.data.currentUser.data._id.toString());
                }
                return false;
            }),
        },
        matchedDriverState: {
            subscribe: apollo_server_express_1.withFilter(function (_, __, context) {
                return context.pubsub.asyncIterator([MATCHED_DRIVER_STATE]);
            }, function (payload, variables) {
                return payload.matchedDriverState.tripId.toString() === variables.tripId.toString();
            }),
        },
    },
};
