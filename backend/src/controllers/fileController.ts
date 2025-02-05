import { fetchAllFiles, fetchFileById } from "../services/fileService";

export const getFilesByFolderId = async ({ params }: { params: {folderId:number} }) => {
    return await fetchAllFiles(params.folderId);
};

export const getFileById = async ({ params }: { params: {id:number} }) => {
    // Implementation to fetch a single file by id
    return await fetchFileById(params.id);
}