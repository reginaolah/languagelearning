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
exports.Lesson = void 0;
const core_1 = require("@mikro-orm/core");
const user_1 = require("./user");
const language_1 = require("./language");
const studentlesson_1 = require("./studentlesson");
let Lesson = class Lesson {
    constructor() {
        this.studentlessons = new core_1.Collection(this);
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Lesson.prototype, "id", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", Number)
], Lesson.prototype, "price", void 0);
__decorate([
    core_1.ManyToOne(() => user_1.User),
    __metadata("design:type", user_1.User)
], Lesson.prototype, "teacher", void 0);
__decorate([
    core_1.ManyToOne(() => language_1.Language),
    __metadata("design:type", language_1.Language)
], Lesson.prototype, "language", void 0);
__decorate([
    core_1.OneToMany(() => studentlesson_1.StudentLesson, (studentlesson) => studentlesson.lesson),
    __metadata("design:type", Object)
], Lesson.prototype, "studentlessons", void 0);
Lesson = __decorate([
    core_1.Entity()
], Lesson);
exports.Lesson = Lesson;
