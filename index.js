require("dotenv").config();
const app = require("./app");
const connectDB = require("./utile/db.utile");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🎯 Server started on port http://localhost:${PORT}`);
  connectDB();
});
