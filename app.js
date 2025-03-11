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

// Allow both development and production origins
const allowedOrigins = [
  process.env.FRONT_URI,
  "https://solarisposter.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Also add these headers to all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(xss());
app.use(cookieParser(process.env.COOKIE_SIGN_KEY));
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/seed/user", seedUserRouter);
app.use("/seed/product", seedProductRouter);
app.use(baseRouter);

module.exports = app;
