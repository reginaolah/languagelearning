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
exports.TeacherType = exports.UserRole = exports.User = void 0;
const core_1 = require("@mikro-orm/core");
const language_1 = require("./language");
const lesson_1 = require("./lesson");
const studentlesson_1 = require("./studentlesson");
const homework_1 = require("./homework");
let User = class User {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.languages = new core_1.Collection(this);
        this.studentlessons = new core_1.Collection(this);
        this.lessons = new core_1.Collection(this);
        this.homeworks = new core_1.Collection(this);
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    core_1.Property({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    core_1.Property({ nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "is_native", void 0);
__decorate([
    core_1.Enum({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    core_1.Property({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "intro", void 0);
__decorate([
    core_1.Enum(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", Object)
], User.prototype, "createdAt", void 0);
__decorate([
    core_1.Property({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    core_1.ManyToMany(() => language_1.Language, "users", { owner: true }),
    __metadata("design:type", Object)
], User.prototype, "languages", void 0);
__decorate([
    core_1.OneToMany(() => studentlesson_1.StudentLesson, (studentlesson) => studentlesson.user),
    __metadata("design:type", Object)
], User.prototype, "studentlessons", void 0);
__decorate([
    core_1.OneToMany(() => lesson_1.Lesson, (lesson) => lesson.teacher),
    __metadata("design:type", Object)
], User.prototype, "lessons", void 0);
__decorate([
    core_1.OneToMany(() => homework_1.Homework, (homework) => homework.owner),
    __metadata("design:type", Object)
], User.prototype, "homeworks", void 0);
User = __decorate([
    core_1.Entity()
], User);
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["Student"] = "STUDENT";
    UserRole["Teacher"] = "TEACHER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var TeacherType;
(function (TeacherType) {
    TeacherType["Professional"] = "PROFESSIONAL";
    TeacherType["Community"] = "COMMUNITY";
})(TeacherType = exports.TeacherType || (exports.TeacherType = {}));
