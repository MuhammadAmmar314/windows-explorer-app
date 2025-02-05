import { fetchAllFolders, fetchSubFolders, insertFolder } from '../services/folderService';

export const getFolders = async () => {
  return await fetchAllFolders();
};

export const getSubFoldersById = async ({ params }: { params: { id: number } }) => {
  return await fetchSubFolders(params.id);
};

export const addFolder = async ({ request }: { request: Request }) => {
  const { name, parentId } = await request.json();

  if(!name){
    return new Response('Folder name is required', {status: 400});
  }

  const folder = await insertFolder(name, parentId || null);
  return new Response(JSON.stringify(folder), { status: 201 });
}