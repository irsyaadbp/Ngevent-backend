"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = exports.RegisterDto = void 0;
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../entities/user.entity");
class RegisterDto {
}
__decorate([
    class_validator_1.IsEmail()
], RegisterDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString()
], RegisterDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString()
], RegisterDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString()
], RegisterDto.prototype, "fullname", void 0);
__decorate([
    class_validator_1.IsEnum(user_entity_1.Role)
], RegisterDto.prototype, "role", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber()
], RegisterDto.prototype, "favorite_id", void 0);
exports.RegisterDto = RegisterDto;
class LoginDto {
}
__decorate([
    class_validator_1.IsString()
], LoginDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString()
], LoginDto.prototype, "password", void 0);
exports.LoginDto = LoginDto;
//# sourceMappingURL=auth.dto.js.map