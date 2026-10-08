import dotenv from "dotenv";

dotenv.config();

const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./config/db.js");

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Cooksy backend running on http://localhost:${PORT}`);
});