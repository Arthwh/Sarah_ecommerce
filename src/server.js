import express from 'express';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js"
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(userRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app
