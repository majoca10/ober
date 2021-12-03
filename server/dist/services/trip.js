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
var repositories_1 = require("../repositories");
exports.default = {
    get: function (_a) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repositories_1.Trip.findById(id)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        e_1 = _b.sent();
                        throw e_1.message;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    getStatus: function (_a) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repositories_1.Trip.findOneStatus(id)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_2 = _b.sent();
                        throw e_2.message;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    create: function (payload) { return __awaiter(void 0, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, repositories_1.Trip.create(__assign({}, payload))];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_3 = _a.sent();
                    throw e_3.message;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    checkStatus: function (args) { return __awaiter(void 0, void 0, void 0, function () {
        var data, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, repositories_1.Trip.findOneStatus(args.tripId)];
                case 1:
                    data = _a.sent();
                    if ((data === null || data === void 0 ? void 0 : data.status) === 'open') {
                        return [2 /*return*/, 'success'];
                    }
                    return [2 /*return*/, data === null || data === void 0 ? void 0 : data.status];
                case 2:
                    e_4 = _a.sent();
                    throw e_4.message;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    cancel: function (_a) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var trip, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repositories_1.Trip.update(id, { status: 'cancel' })];
                    case 1:
                        trip = _b.sent();
                        return [2 /*return*/, { result: 'canceled', trip: trip }];
                    case 2:
                        e_5 = _b.sent();
                        throw e_5.message;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    setMatchedDriver: function (_a) {
        var driverId = _a.driverId, tripId = _a.tripId;
        return __awaiter(void 0, void 0, void 0, function () {
            var driver, e_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, repositories_1.Driver.findById({ id: driverId })];
                    case 1:
                        driver = _b.sent();
                        return [4 /*yield*/, repositories_1.Trip.update(tripId, { status: 'matched', driver: driver })];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        e_6 = _b.sent();
                        throw e_6.message;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    openTrip: function (args) { return __awaiter(void 0, void 0, void 0, function () {
        var riderEmail, origin, destination, startTime, estimatedTime, estimatedDistance, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    riderEmail = args.riderEmail, origin = args.origin, destination = args.destination, startTime = args.startTime, estimatedTime = args.estimatedTime, estimatedDistance = args.estimatedDistance;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, repositories_1.Trip.open(riderEmail, origin, destination, startTime, estimatedTime, estimatedDistance)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_7 = _a.sent();
                    throw e_7;
                case 4: return [2 /*return*/];
            }
        });
    }); },
    setStatus: function (args) { return __awaiter(void 0, void 0, void 0, function () {
        var tripId, newTripStatus, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    tripId = args.tripId, newTripStatus = args.newTripStatus;
                    return [4 /*yield*/, repositories_1.Trip.setStatus(tripId, newTripStatus)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_8 = _a.sent();
                    throw e_8;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getChattings: function (tripId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositories_1.Trip.getChattings(tripId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    addChatting: function (tripId, chatting) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositories_1.Trip.addChatting(tripId, chatting)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    setArrivals: function (tripId, arrivalTime, destination) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositories_1.Trip.setArrivals(tripId, arrivalTime, destination)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    getMyTrip: function (userId, isDriver, statuses) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositories_1.Trip.getMyTrip(userId, isDriver, statuses)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
};
