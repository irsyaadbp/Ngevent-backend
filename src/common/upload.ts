import cloudinary from "cloudinary";

export default class Upload {
  public cloudinary = cloudinary.v2;
  constructor() {
    this.cloudinary.config({
      cloud_name: process.env.CD_CLOUD_NAME,
      api_key: process.env.CD_API_KEY,
      api_secret: process.env.CD_SECRET,
    });
  }

  public uploadImage = async ({
    file,
    options,
  }: {
    file: string;
    options?: cloudinary.UploadApiOptions | undefined;
  }) => {
    return this.cloudinary.uploader.upload(file, {
      use_filename: true,
      ...options,
    });
  };
}
