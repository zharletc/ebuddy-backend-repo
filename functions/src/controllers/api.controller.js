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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserData = exports.updateUserData = void 0;
const firebase_config_1 = __importDefault(require("../config/firebase.config"));
const moment_1 = __importDefault(require("moment"));
// import jwt from 'jsonwebtoken';
// const JWT_SECRET = 'de410b80bd3c1197d7e9b9b08baf0db7e44dd3e1469e3ac05e060169cc46f723';
// export const generateToken = async (req: Request, res: Response) => {
//     const payload = {
//         id: '1',
//         name: 'Admin',
//         role: 'admin',
//         email: 'admin@gmail.com'
//     };
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).send({ success: true, message: "Token generated successfully", token });
// };
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, role, email } = req.body;
    const userCollection = firebase_config_1.default.collection('users');
    let userRef;
    if (id) {
        userRef = yield userCollection.doc(id).set({ name, role, email }, { merge: true });
        const data = (yield userCollection.doc(id).get()).data();
        const user = {
            id: id,
            name: data === null || data === void 0 ? void 0 : data.name,
            email: data === null || data === void 0 ? void 0 : data.email,
            role: data === null || data === void 0 ? void 0 : data.role,
            createdAt: (0, moment_1.default)(data === null || data === void 0 ? void 0 : data.createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
        };
        res.status(200).send({ success: true, message: "Success to update user", data: user });
    }
    else {
        userRef = yield userCollection.add({ name, role, email, createdAt: new Date() });
        const data = (yield userCollection.doc(userRef.id).get()).data();
        const user = {
            id: userRef.id,
            name: data === null || data === void 0 ? void 0 : data.name,
            email: data === null || data === void 0 ? void 0 : data.email,
            role: data === null || data === void 0 ? void 0 : data.role,
            createdAt: (0, moment_1.default)(data === null || data === void 0 ? void 0 : data.createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
        };
        res.status(200).send({ success: true, message: "Success to creae user", data: user });
    }
});
exports.updateUserData = updateUserData;
const fetchUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = [];
    const userCollection = firebase_config_1.default.collection('users');
    const snapshot = yield userCollection.get();
    snapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
            id: doc.id,
            name: data.name,
            email: data.email,
            role: data.role,
            createdAt: (0, moment_1.default)(data.createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
        });
    });
    res.status(200).send({ success: true, message: "Success to fetch user", data: users });
});
exports.fetchUserData = fetchUserData;
