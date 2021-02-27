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
exports.EventDto = void 0;
const class_validator_1 = require("class-validator");
class EventDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EventDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EventDto.prototype, "event_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EventDto.prototype, "poster", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EventDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EventDto.prototype, "location", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], EventDto.prototype, "event_date", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EventDto.prototype, "category_id", void 0);
__decorate([
    class_validator_1.IsNumber({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], EventDto.prototype, "ticket_price", void 0);
exports.EventDto = EventDto;
