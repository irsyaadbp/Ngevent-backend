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
const category_entity_1 = require("../entities/category.entity");
const pagination_1 = require("../common/pagination");
class CategoryController {
    constructor() {
        this.repository = typeorm_1.getRepository(category_entity_1.Category);
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const pagination = new pagination_1.Pagination().pagination(params);
                const limit = pagination.limit;
                const page = pagination.page;
                const offset = pagination.offset;
                const sortBy = params.sortBy || "updated_at";
                const orderBy = (params.orderBy || "DESC").toUpperCase();
                const [allCategories, count] = yield this.repository.findAndCount({
                    where: { category_name: typeorm_1.Like("%" + (params.search || "") + "%") },
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
                    data: allCategories,
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
                    const category = yield this.repository.findOne({ id: params.id });
                    if (category === null || category === void 0 ? void 0 : category.id) {
                        return res.json({
                            success: true,
                            message: "Success get category",
                            data: category,
                        });
                    }
                    else {
                        return res.json({
                            success: false,
                            message: "category id not found",
                            data: undefined,
                        });
                    }
                }
                else {
                    return res.json({
                        success: false,
                        message: "category id cant be empty",
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
                if (!(yield this.isCategoryExist(data.category_name))) {
                    const { id } = data, newData = __rest(data, ["id"]);
                    const newCategory = yield this.repository.save(newData);
                    return res.status(201).json({
                        success: false,
                        message: "Category created",
                        data: newCategory,
                    });
                }
                else {
                    return res.json({
                        success: false,
                        message: "Category already exist",
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
                const _a = req.body, { id } = _a, data = __rest(_a, ["id"]);
                if (id) {
                    const category = yield this.repository.findOne({
                        category_name: data.category_name,
                    });
                    if ((category === null || category === void 0 ? void 0 : category.id) && (category === null || category === void 0 ? void 0 : category.id) !== id) {
                        return res.json({
                            success: false,
                            message: "Category name already exist",
                        });
                    }
                    const selectedCategory = yield this.repository.findOne({
                        id,
                    });
                    if (!(selectedCategory === null || selectedCategory === void 0 ? void 0 : selectedCategory.id)) {
                        return res.json({
                            success: false,
                            message: "Category not found",
                        });
                    }
                    const updated = yield this.repository.save(Object.assign(Object.assign({}, selectedCategory), data));
                    return res.status(200).json({
                        success: false,
                        message: "Category updated",
                        data: updated,
                    });
                }
                else {
                    return res.json({
                        success: false,
                        message: "Category id cant be empty",
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
                        message: "Delete category success",
                    });
                }
                else {
                    return res.json({
                        success: false,
                        message: "Category id cant be empty",
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
        this.isCategoryExist = (value) => __awaiter(this, void 0, void 0, function* () {
            return ((yield this.repository.count({ where: { category_name: value } })) !== 0);
        });
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map