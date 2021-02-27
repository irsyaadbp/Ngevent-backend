import dotenv from "dotenv";
import app from "./config/app";

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Ngevent backend listening on port : ${PORT}`);
});
