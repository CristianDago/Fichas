import express from "express";
import cors from "cors";
import path from "path";
import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import patientRoute from "./routes/patient.route";
import { httpErrorHandle } from "./middlewares/http.error.handle.middleware";

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS?.split(","),
  allowedHeaders: process.env.CORS_HEADERS?.split(","),
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/patients", patientRoute);

app.use(httpErrorHandle);

export default app;
