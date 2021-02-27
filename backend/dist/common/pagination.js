"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
class Pagination {
    pagination(params) {
        const limit = Number(params.perPage) || 10;
        const page = Number(params.page) || 1;
        const offset = limit * (page - 1);
        return {
            limit,
            offset,
            page,
        };
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map