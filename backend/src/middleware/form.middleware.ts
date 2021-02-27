import { NextFunction, Response } from "express";
import multer from "multer";
import { RequestWithUser } from "../interfaces/auth.interface.ts";
import moment from "moment";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    const fileName =
      moment().format("DD-MM-YYYY") +
      "_" +
      file.originalname.toLowerCase().split(" ").join("-");
    callback(null, fileName);
  },
});

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: {
    fileSize: 4 * 1000 * 1000, //expect 4mb
  },
});

export const formMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const multerUpload = upload.single("image");
  multerUpload(req, res, function (err: any) {
    if (err) {
      // A Multer error occurred when uploading.
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Everything is fine
    next();
  });
};
