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
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
exports.default = {
    findById: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Trip.findById(id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    create: function (payload) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Trip.create(payload)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    findOneStatus: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Trip.findById(id, 'status')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    update: function (id, payload) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Trip.findByIdAndUpdate(id, payload, { new: true })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    open: function (riderEmail, origin, destination, startTime, estimatedTime, estimatedDistance) { return __awaiter(void 0, void 0, void 0, function () {
        var fields, rider;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = '_id email name';
                    return [4 /*yield*/, models_1.Rider.findOne({ email: riderEmail }, fields).exec()];
                case 1:
                    rider = _a.sent();
                    if (!rider) return [3 /*break*/, 3];
                    return [4 /*yield*/, models_1.Trip.create({ rider: rider, origin: origin, destination: destination, startTime: startTime, estimatedTime: estimatedTime, estimatedDistance: estimatedDistance, status: 'open' })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [2 /*return*/, null];
            }
        });
    }); },
    setStatus: function (tripId, newTripStatus) { return __awaiter(void 0, void 0, void 0, function () {
        var trip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Trip.findOneAndUpdate({ _id: tripId }, { status: newTripStatus }, { new: true })];
                case 1:
                    trip = _a.sent();
                    return [2 /*return*/, trip];
            }
        });
    }); },
    getChattings: function (tripId) { return __awaiter(void 0, void 0, void 0, function () {
        var trip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Trip.findOne({ _id: tripId }, 'chattings')];
                case 1:
                    trip = _a.sent();
                    return [2 /*return*/, trip === null || trip === void 0 ? void 0 : trip.chattings];
            }
        });
    }); },
    addChatting: function (tripId, chatting) { return __awaiter(void 0, void 0, void 0, function () {
        var trip;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, models_1.Trip.findOneAndUpdate({ _id: tripId }, { $push: { chattings: chatting } }, { new: true })];
                case 1:
                    trip = _b.sent();
                    if (trip === null || trip === void 0 ? void 0 : trip.chattings) {
                        return [2 /*return*/, trip === null || trip === void 0 ? void 0 : trip.chattings[((_a = trip === null || trip === void 0 ? void 0 : trip.chattings) === null || _a === void 0 ? void 0 : _a.length) - 1]];
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    setArrivals: function (tripId, realArrivalTime, realDestination) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Trip.findOneAndUpdate({ _id: tripId }, { arrivalTime: realArrivalTime, destination: realDestination }, { new: true })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    getMyTrip: function (userId, isDriver, statuses) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isDriver) return [3 /*break*/, 2];
                    return [4 /*yield*/, models_1.Trip.findOne({ status: { $in: statuses }, 'driver._id': userId })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, models_1.Trip.findOne({ status: { $in: statuses }, 'rider._id': userId })];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
};
