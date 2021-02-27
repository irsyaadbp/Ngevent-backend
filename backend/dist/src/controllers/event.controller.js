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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const pagination_1 = require("../common/pagination");
const event_entity_1 = require("../entities/event.entity");
const upload_1 = __importDefault(require("../common/upload"));
class EventController {
    constructor() {
        this.repository = typeorm_1.getRepository(event_entity_1.Event);
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const pagination = new pagination_1.Pagination().pagination(params);
                const limit = pagination.limit;
                const page = pagination.page;
                const offset = pagination.offset;
                const sortBy = params.sortBy || "updated_at";
                const orderBy = (params.orderBy || "DESC").toUpperCase();
                let whereParam = { event_name: typeorm_1.Like("%" + (params.search || "") + "%") };
                if (params.category_id) {
                    whereParam.category_id = params.category_id;
                }
                if (params.startDate && params.endDate) {
                    whereParam = Object.assign(Object.assign({}, whereParam), { event_date: typeorm_1.Between(params.startDate, params.endDate) });
                }
                if (params.priceStart && params.priceEnd) {
                    whereParam = Object.assign(Object.assign({}, whereParam), { ticket_price: typeorm_1.Between(params.priceStart, params.priceEnd) });
                }
                const [allEvents, count] = yield this.repository.findAndCount({
                    where: whereParam,
                    relations: ["category"],
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
                    data: allEvents,
                });
            }
            catch (err) {
                console.log(err);
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
                    const category = yield this.repository.findOne({
                        id: params.id,
                    }, { relations: ["category"] });
                    if (category === null || category === void 0 ? void 0 : category.id) {
                        return res.json({
                            success: true,
                            message: "Success get event",
                            data: category,
                        });
                    }
                    else {
                        return res.json({
                            success: false,
                            message: "Event id not found",
                            data: undefined,
                        });
                    }
                }
                else {
                    return res.json({
                        success: false,
                        message: "Event id cant be empty",
                        data: undefined,
                    });
                }
            }
            catch (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                    data: undefined,
                });
            }
        });
        this.createNew = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const { id } = data, newData = __rest(data, ["id"]);
                try {
                    if (req.file) {
                        const cloudinary = new upload_1.default();
                        const poster = yield cloudinary.uploadImage({ file: req.file.path });
                        const newEvent = yield this.repository.save(Object.assign(Object.assign({}, newData), { poster: poster.url }));
                        return res.status(201).json({
                            success: false,
                            message: "Event created",
                            data: newEvent,
                        });
                    }
                    else {
                        return res.status(400).json({
                            success: false,
                            message: "Poster can't be empty",
                        });
                    }
                }
                catch (errUpload) {
                    console.log(errUpload);
                    return res.status(400).json({
                        success: false,
                        message: errUpload.message,
                    });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { id } = _a, data = __rest(_a, ["id"]);
                if (id) {
                    const selectedEvent = yield this.repository.findOne({
                        id,
                    });
                    if (!(selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.id)) {
                        return res.json({
                            success: false,
                            message: "Event not found",
                        });
                    }
                    try {
                        let poster = selectedEvent.poster;
                        if (req.file) {
                            const cloudinary = new upload_1.default();
                            const uploadPoster = yield cloudinary.uploadImage({
                                file: req.file.path,
                            });
                            poster = uploadPoster.url;
                        }
                        const updated = yield this.repository.save(Object.assign(Object.assign(Object.assign({}, selectedEvent), data), { poster }));
                        return res.status(200).json({
                            success: false,
                            message: "Event updated",
                            data: updated,
                        });
                    }
                    catch (errUplod) {
                        return res.status(400).json({
                            success: false,
                            message: errUplod.message,
                        });
                    }
                }
                else {
                    return res.json({
                        success: false,
                        message: "Event id cant be empty",
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
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                if (id) {
                    yield this.repository.delete(id);
                    return res.json({
                        success: true,
                        message: "Delete event success",
                    });
                }
                else {
                    return res.json({
                        success: false,
                        message: "Event id cant be empty",
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
    }
}
exports.default = EventController;
//# sourceMappingURL=event.controller.js.map