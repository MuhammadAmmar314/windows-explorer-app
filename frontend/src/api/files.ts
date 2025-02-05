import axios from 'axios';

export interface File {
  id: number;
  name: string;
  size: number;
  lastModified: string;
}

export const fetchFilesByFolderId = async (folderId: number): Promise<File[]> => {
  const response = await axios.get(`/files/${folderId}`);
  return response.data;
};