export const logger = (req, res, next) => {
  console.log(`Path: ${req.url}`);
  next();
};

export const timeLogger = (req, res, next) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  console.log(`Time: ${year}.${month}.${day}`);
  next();
};

export const protocolLogger = (req, res, next) => {
  const url = req.url;
  const protocol = req.protocol;
  if (protocol === "https") {
    console.log("Secure");
  } else {
    console.log("Insecure ❌");
  }
  next();
};

export const protector = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    console.log("❌");
    return res.send("You can't access this page");
  }
  next();
};
