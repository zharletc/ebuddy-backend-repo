"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Periksa apakah emulator sedang digunakan
const isEmulator = !!process.env.FIRESTORE_EMULATOR_HOST;
if (!firebase_admin_1.default.apps.length) {
    if (isEmulator) {
        // Inisialisasi untuk Emulator
        firebase_admin_1.default.initializeApp();
        console.log('Using Firestore Emulator');
    }
    else {
        // Inisialisasi untuk Produksi (dengan service-account.json)
        const serviceAccount = require('../service-account.json');
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(serviceAccount),
        });
        console.log('Using Firestore Production');
    }
}
const db = firebase_admin_1.default.firestore();
// Konfigurasi Firestore jika menggunakan Emulator
if (isEmulator) {
    db.settings({
        host: process.env.FIRESTORE_EMULATOR_HOST,
        ssl: false,
    });
}
exports.default = db;
