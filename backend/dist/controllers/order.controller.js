"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const pagination_1 = require("../common/pagination");
const order_entity_1 = require("../entities/order.entity");
const moment_1 = require("moment");
const event_entity_1 = require("../entities/event.entity");
class OrderController {
    constructor() {
        this.repository = typeorm_1.getRepository(order_entity_1.Order);
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const pagination = new pagination_1.Pagination().pagination(params);
                const limit = pagination.limit;
                const page = pagination.page;
                const offset = pagination.offset;
                const sortBy = params.sortBy || "updated_at";
                const orderBy = (params.orderBy || "DESC").toUpperCase();
                let whereParam = { order_number: typeorm_1.Like("%" + (params.search || "") + "%") };
                if (params.user_id) {
                    whereParam.user_id = params.user_id;
                }
                if (params.startDate && params.endDate) {
                    whereParam = Object.assign(Object.assign({}, whereParam), { event_date: typeorm_1.Between(params.startDate, params.endDate) });
                }
                const [allOrder, count] = yield this.repository.findAndCount({
                    where: whereParam,
                    relations: ["event"],
                    order: { [sortBy]: orderBy },
                    take: limit,
                    skip: offset,
                });
                return res.json({
                    success: true,
                    message: count > 0 ? "Success get all data" : "Data empty",
                    count: count,
                    currentPage: page,
                    perPage: limit,
                    allPage: Math.ceil(count / limit),
                    data: allOrder,
                });
            }
            catch (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.params;
                if (params.id) {
                    const category = yield this.repository.findOne({ id: params.id }, { relations: ["user", "event"] });
                    if (category === null || category === void 0 ? void 0 : category.id) {
                        return res.json({
                            success: true,
                            message: "Success get order",
                            data: category,
                        });
                    }
                    else {
                        return res.json({
                            success: false,
                            message: "Order id not found",
                        });
                    }
                }
                else {
                    return res.json({
                        success: false,
                        message: "Order id cant be empty",
                    });
                }
            }
            catch (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
        });
        this.createNew = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const _b = req.body, { id } = _b, data = __rest(_b, ["id"]);
                const orderNumber = moment_1.default().format("DDMMYYYY-HHmmss");
                const eventById = yield typeorm_1.getRepository(event_entity_1.Event).findOne({
                    id: data.event_id,
                });
                if (eventById === null || eventById === void 0 ? void 0 : eventById.id) {
                    const newOrder = yield this.repository.save(Object.assign(Object.assign({}, data), { order_number: orderNumber, user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, event_date: eventById.event_date }));
                    return res.json({
                        success: true,
                        message: "Order created",
                        data: newOrder,
                    });
                }
                else {
                    return res.json({
                        success: false,
                        message: "Event not found",
                    });
                }
            }
            catch (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _c = req.body, { id } = _c, data = __rest(_c, ["id"]);
                const selectedOrder = yield this.repository.findOne({ id });
                if (!(selectedOrder === null || selectedOrder === void 0 ? void 0 : selectedOrder.id)) {
                    return res.json({
                        success: false,
                        message: "Order not found",
                    });
                }
                let attended_date = selectedOrder.attended_date;
                if (data.status === order_entity_1.Status.ATTENDED) {
                    if (selectedOrder.status === order_entity_1.Status.BOOKED) {
                        attended_date = new Date();
                    }
                    else {
                        return res.json({
                            success: false,
                            message: "You already attended",
                        });
                    }
                }
                const updated = yield this.repository.save(Object.assign(Object.assign(Object.assign({}, selectedOrder), data), { attended_date }));
                return res.json({
                    success: true,
                    message: "Order updated",
                    data: updated,
                });
            }
            catch (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
        });
    }
}
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map