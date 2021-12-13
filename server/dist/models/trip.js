"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var tripSchema = new Schema({
    origin: {
        type: {
            address: { type: String, required: true },
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
        required: true,
    },
    destination: {
        address: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    startTime: { type: Date, required: true },
    arrivalTime: Date,
    status: { type: String, required: true },
    estimatedTime: String,
    estimatedDistance: String,
    rider: {
        type: {
            _id: String,
            email: String,
            name: String,
        },
        required: true,
    },
    driver: {
        _id: String,
        email: String,
        name: String,
        typeIdentification: {
            type: {
                value: { type: String },
                label: { type: Number },
            },
        },
        identification: String,
        carType: String,
        plateNumber: String,
        description: String,
        profileImage: String,
    },
    chattings: [{
            text: { type: String, required: true },
            time: { type: Date, required: true },
            ownerId: { type: String, required: true },
        }],
});
exports.default = model('Trip', tripSchema);
