"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDto = void 0;
const class_validator_1 = require("class-validator");
class OrderDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber()
], OrderDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNumber()
], OrderDto.prototype, "event_id", void 0);
__decorate([
    class_validator_1.IsNumber()
], OrderDto.prototype, "qty", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString()
], OrderDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsNumber({ maxDecimalPlaces: 2 })
], OrderDto.prototype, "total_price", void 0);
exports.OrderDto = OrderDto;
//# sourceMappingURL=order.dto.js.map