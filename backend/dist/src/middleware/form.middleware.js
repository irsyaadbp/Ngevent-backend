"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const moment_1 = __importDefault(require("moment"));
const storage = multer_1.default.diskStorage({
    filename: function (req, file, callback) {
        const fileName = moment_1.default().format("DD-MM-YYYY") +
            "_" +
            file.originalname.toLowerCase().split(" ").join("-");
        callback(null, fileName);
    },
});
const upload = multer_1.default({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
    limits: {
        fileSize: 4 * 1000 * 1000,
    },
});
const formMiddleware = (req, res, next) => {
    const multerUpload = upload.single("image");
    multerUpload(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        next();
    });
};
exports.formMiddleware = formMiddleware;
//# sourceMappingURL=form.middleware.js.map