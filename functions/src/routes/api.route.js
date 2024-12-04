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
const express_1 = __importDefault(require("express"));
const api_controller_1 = require("../controllers/api.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const globalMiddleware_1 = require("../middlewares/globalMiddleware");
const router = express_1.default.Router();
// router.get("/get-token", globalMiddleware, async (req: Request, res: Response) => {
//     await generateToken(req, res);
// });
router.get("/fetch-user-data", globalMiddleware_1.globalMiddleware, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, api_controller_1.fetchUserData)(req, res);
}));
router.post("/update-user-data", globalMiddleware_1.globalMiddleware, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, api_controller_1.updateUserData)(req, res);
}));
exports.default = router;
