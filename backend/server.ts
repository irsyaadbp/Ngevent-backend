import app from "./src/config/app";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Ngevent backend listening on port : ${PORT}`);
});
