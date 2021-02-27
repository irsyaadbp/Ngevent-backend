"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const order_entity_1 = require("./order.entity");
var Role;
(function (Role) {
    Role["USER"] = "user";
    Role["ADMIN"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column()
], User.prototype, "fullname", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: Role,
        default: Role.USER,
    })
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], User.prototype, "favorite_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => category_entity_1.Category, (cat) => cat.users),
    typeorm_1.JoinColumn({ name: "favorite_id" })
], User.prototype, "favorite_category", void 0);
__decorate([
    typeorm_1.OneToMany(() => order_entity_1.Order, (order) => order.user)
], User.prototype, "orders", void 0);
__decorate([
    typeorm_1.CreateDateColumn()
], User.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn()
], User.prototype, "updated_at", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map