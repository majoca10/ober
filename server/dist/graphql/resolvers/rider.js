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
exports.default = {
    Query: {
        rider: function (parent, args, context, info) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, services_1.Rider.getRiderInfo({ email: args.email })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
    },
    Mutation: {
        loginRider: function (_, payload, context) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, services_1.Rider.login(context, payload)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        createRider: function (parent, payload, context) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, services_1.Rider.signup(payload)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        driverCall: function (parent, args, _a) {
            var req = _a.req, pubsub = _a.pubsub;
            return __awaiter(this, void 0, void 0, function () {
                var riderEmail, trip, driverIds;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            riderEmail = req.user.data.email;
                            return [4 /*yield*/, services_1.Trip.openTrip(__assign(__assign({}, args), { riderEmail: riderEmail }))];
                        case 1:
                            trip = _b.sent();
                            return [4 /*yield*/, services_1.Driver.getDriverList({ lat: args.origin.latitude, lng: args.origin.longitude, callRadius: 0.03 })];
                        case 2:
                            driverIds = _b.sent();
                            driverIds = driverIds.map(function (v) { return v._id.toString(); });
                            pubsub.publish(subscriptions_1.CALL_REQUESTED, { driverListen: { trip: trip, driverIds: driverIds } });
                            return [2 /*return*/, { result: 'success', trip: trip }];
                    }
                });
            });
        },
        driverRecall: function (parent, args, _a) {
            var _b, _c;
            var req = _a.req, pubsub = _a.pubsub;
            return __awaiter(this, void 0, void 0, function () {
                var trip, driverIds;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, services_1.Trip.get(args)];
                        case 1:
                            trip = _d.sent();
                            return [4 /*yield*/, services_1.Driver.getDriverList({ lat: (_b = trip === null || trip === void 0 ? void 0 : trip.origin) === null || _b === void 0 ? void 0 : _b.latitude, lng: (_c = trip === null || trip === void 0 ? void 0 : trip.origin) === null || _c === void 0 ? void 0 : _c.longitude, callRadius: 0.05 })];
                        case 2:
                            driverIds = _d.sent();
                            driverIds = driverIds.map(function (v) { return v._id.toString(); });
                            pubsub.publish(subscriptions_1.CALL_REQUESTED, { driverListen: { trip: trip, driverIds: driverIds } });
                            return [2 /*return*/, { result: 'success', trip: trip }];
                    }
                });
            });
        },
        notifyRiderState: function (parent, args, context) {
            return __awaiter(this, void 0, void 0, function () {
                var trip;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, services_1.Trip.get({ id: args.tripId })];
                        case 1:
                            trip = _a.sent();
                            context.pubsub.publish(subscriptions_1.MATCHED_RIDER_STATE, { matchedRiderState: __assign(__assign({}, args), { trip: trip }) });
                            return [2 /*return*/, true];
                    }
                });
            });
        },
    },
    Subscription: {
        matchedRiderState: {
            subscribe: apollo_server_express_1.withFilter(function (_, __, context) {
                return context.pubsub.asyncIterator([subscriptions_1.MATCHED_RIDER_STATE]);
            }, function (payload, variables) {
                return payload.matchedRiderState.tripId === variables.tripId;
            }),
        },
        driverResponded: {
            subscribe: apollo_server_express_1.withFilter(function (parent, args, context) {
                return context.pubsub.asyncIterator([subscriptions_1.DRIVER_RESPONDED]);
            }, function (payload, variables, context) {
                return payload.driverResponded.rider._id.toString() === context.data.currentUser.data._id.toString();
            }),
        },
    },
};
