import express from "express";
import { logger, protector, protocolLogger, timeLogger } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import storyRouter from "./routers/storyRouter";
import userRouter from "./routers/userRouter";

const PORT = 5000;

const app = express();

app.use(logger);
app.use(timeLogger);
app.use(protocolLogger);
app.use(protector);

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/stories", storyRouter);

const handleListening = () => {
  console.log(`✅ server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
