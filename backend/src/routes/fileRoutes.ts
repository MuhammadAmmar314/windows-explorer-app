import { Elysia } from "elysia";
import { getFileById, getFilesByFolderId } from "../controllers/fileController";

export const fileRoutes = new Elysia()
    .get('/files/:folderId', getFilesByFolderId)
    .get('/file/:id', getFileById);