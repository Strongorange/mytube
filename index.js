import express from "express";

const PORT = 5000;

const app = express();

const logger = (req, res, next) => {
  console.log(`Path: ${req.url}`);
  next();
};

const timeLogger = (req, res, next) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  console.log(`Time: ${year}.${month}.${day}`);
  next();
};

const protocolLogger = (req, res, next) => {
  const url = req.url;
  const protocol = req.protocol;
  if (protocol === "https") {
    console.log("Secure");
  } else {
    console.log("Insecure ❌");
  }
  next();
};

const protector = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    console.log("❌");
    return res.send("You can't access this page");
  }
  next();
};

const handleHome = (req, res) => {
  res.send("I LOVE MIDDLEWARES");
};

app.use(logger);
app.use(timeLogger);
app.use(protocolLogger);
app.use(protector);
app.get("/", handleHome);

const handleListening = () => {
  console.log(`✅ server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
