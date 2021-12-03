"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var driverSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    carType: { type: String, required: true },
    plateNumber: { type: String, unique: true, required: true },
    description: String,
    profileImage: String,
    latitude: Number,
    longitude: Number,
});
exports.default = model('Driver', driverSchema);
