import express from "express";
import uploadRouter from "./uploadRoute.js";
import downloadRouter from "./downloadRoutes.js";

const v1Router = express.Router();

v1Router.use('/uploads', uploadRouter);
v1Router.use('/downloads', downloadRouter);

export default v1Router