import { addFolder, getAllFolders, getSubFolders } from '../repositories/folderRepository';

export async function fetchAllFolders() {
    return await getAllFolders();
}

export async function fetchSubFolders(parentId: number) {
    return await getSubFolders(parentId);
}

export async function insertFolder(folderName:string, parentId:number){
    return await addFolder(folderName, parentId);
}