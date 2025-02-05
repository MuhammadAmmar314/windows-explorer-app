import { Elysia } from 'elysia';
import { addFolder, getFolders, getSubFoldersById } from '../controllers/folderController';

export const folderRoutes = new Elysia()
  .get('/folders', getFolders)
  .get('/folders/:id', getSubFoldersById)
  .post('/addFolder', addFolder);
