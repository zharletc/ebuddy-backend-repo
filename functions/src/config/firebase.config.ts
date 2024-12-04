import admin from 'firebase-admin';

// Periksa apakah emulator sedang digunakan
const isEmulator = !!process.env.FIRESTORE_EMULATOR_HOST;

if (!admin.apps.length) {
    if (isEmulator) {
        // Inisialisasi untuk Emulator
        admin.initializeApp();
        console.log('Using Firestore Emulator');
    } else {
        // Inisialisasi untuk Produksi (dengan service-account.json)
        const serviceAccount = require('../service-account.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('Using Firestore Production');
    }
}

const db = admin.firestore();

// Konfigurasi Firestore jika menggunakan Emulator
if (isEmulator) {
    db.settings({
        host: process.env.FIRESTORE_EMULATOR_HOST,
        ssl: false,
    });
}

export default db;
