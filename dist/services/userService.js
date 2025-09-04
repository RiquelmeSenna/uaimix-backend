"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginuser = exports.createUserService = void 0;
const userModel = __importStar(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hasUser = yield userModel.findUserByEmail(data.email);
    if (hasUser) {
        throw new Error("User already exists");
    }
    const passwordHash = yield bcrypt_1.default.hash(data.password, 10);
    if (data.document) {
        const doc = data.document.replace(/\D/g, ""); // remove caracteres não numéricos
        if (doc.length === 11) {
            data.CPF = doc;
        }
        else if (doc.length === 14) {
            data.CNPJ = doc;
        }
        else {
            throw new Error("Invalid document length. Must be CPF (11) or CNPJ (14)");
        }
    }
    else {
        throw new Error("Document (CPF/CNPJ) is required");
    }
    const newUser = yield userModel.createUser(Object.assign(Object.assign({}, data), { password: passwordHash }));
    if (!newUser) {
        throw new Error("Failed to create user");
    }
    return newUser;
});
exports.createUserService = createUserService;
const loginuser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid email");
    }
    const userLogged = yield userModel.signIn(user.email, user.password);
    const passwordHash = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordHash) {
        throw new Error('Wrong password');
    }
    return userLogged;
});
exports.loginuser = loginuser;
