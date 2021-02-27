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
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
class Upload {
    constructor() {
        this.cloudinary = cloudinary_1.default.v2;
        this.uploadImage = ({ file, options, }) => __awaiter(this, void 0, void 0, function* () {
            return this.cloudinary.uploader.upload(file, Object.assign({ use_filename: true }, options));
        });
        this.cloudinary.config({
            cloud_name: process.env.CD_CLOUD_NAME,
            api_key: process.env.CD_API_KEY,
            api_secret: process.env.CD_SECRET,
        });
    }
}
exports.default = Upload;
//# sourceMappingURL=upload.js.map