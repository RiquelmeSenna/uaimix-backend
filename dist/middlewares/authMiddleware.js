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
exports.authMiddleware = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
require("../types/requestType");
const sign = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(email, process.env.JWT_SECRET);
});
exports.sign = sign;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers['authorization'];
    if (!header) {
        res.json({ error: 'Mande um header de autorização' });
        return;
    }
    const token = header.split(' ')[1];
    const verify = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (error, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            res.status(401).json({ error: 'Mande um token válido' });
            return;
        }
        try {
            const email = decoded;
            const user = yield (0, userModel_1.findUserByEmail)(email);
            if (!user) {
                res.status(400).json({ error: 'Usuario não encontrado' });
                return;
            }
            req.UserEmail = user.email;
            next();
        }
        catch (error) {
            res.status(401).json({ error: 'Token inválido' });
        }
    }));
});
exports.authMiddleware = authMiddleware;
