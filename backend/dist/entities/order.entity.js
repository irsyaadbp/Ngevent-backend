"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Status = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("./event.entity");
const user_entity_1 = require("./user.entity");
var Status;
(function (Status) {
    Status["BOOKED"] = "Booked";
    Status["ATTENDED"] = "Attended";
})(Status = exports.Status || (exports.Status = {}));
let Order = class Order {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Order.prototype, "id", void 0);
__decorate([
    typeorm_1.Column()
], Order.prototype, "event_id", void 0);
__decorate([
    typeorm_1.Column()
], Order.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column()
], Order.prototype, "order_number", void 0);
__decorate([
    typeorm_1.Column()
], Order.prototype, "qty", void 0);
__decorate([
    typeorm_1.Column({ type: "decimal", precision: 4, scale: 2, default: 0 })
], Order.prototype, "total_price", void 0);
__decorate([
    typeorm_1.Column()
], Order.prototype, "event_date", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: Status,
        default: Status.BOOKED,
    })
], Order.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: true })
], Order.prototype, "attended_date", void 0);
__decorate([
    typeorm_1.ManyToOne(() => event_entity_1.Event, (event) => event.id),
    typeorm_1.JoinColumn({ name: "event_id" })
], Order.prototype, "event", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.id),
    typeorm_1.JoinColumn({ name: "user_id" })
], Order.prototype, "user", void 0);
__decorate([
    typeorm_1.CreateDateColumn()
], Order.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn()
], Order.prototype, "updated_at", void 0);
Order = __decorate([
    typeorm_1.Entity()
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map