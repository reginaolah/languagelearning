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
const server_1 = require("../src/server");
const supertest_1 = __importDefault(require("supertest"));
describe('Language Learning Platform', () => {
    const user = { username: 'barna', password: 'passw', first_name: 'test', last_name: 'user', role: 'STUDENT' };
    let requestHandle;
    beforeEach(() => {
        requestHandle = supertest_1.default(server_1.app);
    });
    describe('Authentication', () => {
        it('should register', () => __awaiter(void 0, void 0, void 0, function* () {
            yield requestHandle.post('/users/signup').send(user).expect(200);
        }));
        it('should fail on same user registration', () => __awaiter(void 0, void 0, void 0, function* () {
            yield requestHandle.post('/users/signup').send(user).expect(409);
        }));
        it('should login with registered user', () => __awaiter(void 0, void 0, void 0, function* () {
            yield requestHandle.post('/users/signin').send(user).expect(200);
        }));
    });
});
