"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const server = (0, express_1.default)();
const port = process.env.PORT || 3000;
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.static('public'));
server.use('/user', userRouter_1.default);
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
