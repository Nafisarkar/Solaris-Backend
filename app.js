require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");
const { xss } = require("express-xss-sanitizer");
const baseRouter = require("./routes/base.route");
const userRouter = require("./routes/user.route");
const seedUserRouter = require("./seed/seeduser");
const seedProductRouter = require("./seed/seedproduct");
const productRouter = require("./routes/product.route");
const app = express();

app.use(
  cors({
    origin: process.env.FRONT_URI,
    credentials: true,
  })
);

app.use(xss());
app.use(cookieParser(process.env.COOKIE_SIGN_KEY));
app.use(morgan("dev"));
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 1 minutes
//   max: process.env.RATE_LIMITE, // limit each IP to 100 requests per windowMs
// });

// app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/seed/user", seedUserRouter);
app.use("/seed/product", seedProductRouter);
app.use(baseRouter);

module.exports = app;
