"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("./event.entity");
const user_entity_1 = require("./user.entity");
let Category = class Category {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Category.prototype, "id", void 0);
__decorate([
    typeorm_1.Column()
], Category.prototype, "category_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Category.prototype, "description", void 0);
__decorate([
    typeorm_1.CreateDateColumn()
], Category.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn()
], Category.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.OneToMany(() => event_entity_1.Event, (event) => event.category)
], Category.prototype, "events", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_entity_1.User, (user) => user.favorite_category)
], Category.prototype, "users", void 0);
Category = __decorate([
    typeorm_1.Entity()
], Category);
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map