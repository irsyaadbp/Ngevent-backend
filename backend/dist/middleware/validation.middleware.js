"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const http_exception_1 = require("../common/http-exception");
function validationMiddleware(type) {
    return (req, res, next) => {
        class_validator_1.validate(class_transformer_1.plainToClass(type, req.body)).then((errors) => {
            if (errors.length > 0) {
                const message = errors
                    .map((error) => Object.values(error.constraints || {}))
                    .join(", ");
                next(new http_exception_1.default(400, message, message));
            }
            else {
                next();
            }
        });
    };
}
exports.default = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map