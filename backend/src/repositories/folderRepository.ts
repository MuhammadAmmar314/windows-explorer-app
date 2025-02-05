import { eq } from 'drizzle-orm';
import { db } from '../db';
import { folders } from '../models/folder';

export async function getAllFolders() {
    return await db.select().from(folders);
}

export async function getSubFolders(parentId: number) {
    return await db.select().from(folders).where(eq(folders.parentId, parentId));
}

export async function addFolder(name: string, parentId: number | null = null){
    return await db.insert(folders).values({ name, parentId });
}