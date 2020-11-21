"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const core_1 = require("@mikro-orm/core");
const user_1 = require("./user");
const lesson_1 = require("./lesson");
// id,language,language_code
let Language = class Language {
    constructor() {
        this.users = new core_1.Collection(this);
        this.lessons = new core_1.Collection(this);
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Language.prototype, "id", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], Language.prototype, "language_code", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], Language.prototype, "langauge", void 0);
__decorate([
    core_1.ManyToMany(() => user_1.User, user => user.languages),
    __metadata("design:type", Object)
], Language.prototype, "users", void 0);
__decorate([
    core_1.OneToMany(() => lesson_1.Lesson, (lesson) => lesson.language),
    __metadata("design:type", Object)
], Language.prototype, "lessons", void 0);
Language = __decorate([
    core_1.Entity()
], Language);
exports.Language = Language;
