import axios from "axios";

interface Folder {
  name: string;
  parentId?: number | null;
}

export async function fetchAllFolders() {
  const response = await axios.get("/folders");
  return response.data;
}

export async function fetchFolderById(id: number) {
  const response = await axios.get(`/folders/${id}`);
  return response.data;
}

export async function AddFolder(folder: Folder){
  try{
    const response = await axios.post(`/addFolder`, {
      name: folder.name,
      parentId: folder.parentId || null
    });

    return response.data;
  } catch(error) {
    console.error('Error adding folder', error);
    throw error;
  }
}