import { findByFolderId, findById } from "../repositories/fileRepository";

export async function fetchAllFiles(folderId: number){
    return await findByFolderId(folderId);
}

export async function fetchFileById(id: number){
    return await findById(id);
}