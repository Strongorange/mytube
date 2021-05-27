import express from "express";
import morgan from "morgan";

const PORT = 5000;

const app = express();

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};

app.use(morgan("dev"));
app.get("/", handleHome);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
