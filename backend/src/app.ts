import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


////Error middleware should always be last middleware in the middleware stack
app.use(errorHandler);

export default app;