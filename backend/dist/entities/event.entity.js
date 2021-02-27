"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const order_entity_1 = require("./order.entity");
let Event = class Event {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Event.prototype, "id", void 0);
__decorate([
    typeorm_1.Column()
], Event.prototype, "event_name", void 0);
__decorate([
    typeorm_1.Column()
], Event.prototype, "poster", void 0);
__decorate([
    typeorm_1.Column()
], Event.prototype, "location", void 0);
__decorate([
    typeorm_1.Column("text")
], Event.prototype, "description", void 0);
__decorate([
    typeorm_1.Column()
], Event.prototype, "event_date", void 0);
__decorate([
    typeorm_1.Column()
], Event.prototype, "category_id", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 4, scale: 2, default: 0 })
], Event.prototype, "ticket_price", void 0);
__decorate([
    typeorm_1.ManyToOne(() => category_entity_1.Category, (cat) => cat.events),
    typeorm_1.JoinColumn({ name: "category_id" })
], Event.prototype, "category", void 0);
__decorate([
    typeorm_1.OneToMany(() => order_entity_1.Order, (order) => order.event)
], Event.prototype, "order", void 0);
__decorate([
    typeorm_1.CreateDateColumn()
], Event.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn()
], Event.prototype, "updated_at", void 0);
Event = __decorate([
    typeorm_1.Entity()
], Event);
exports.Event = Event;
//# sourceMappingURL=event.entity.js.map