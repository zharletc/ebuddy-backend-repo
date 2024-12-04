"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const service_account_json_1 = __importDefault(require("../service-account.json"));
const serviceAccountConfig = service_account_json_1.default;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccountConfig),
});
const db = firebase_admin_1.default.firestore();
exports.default = db;
