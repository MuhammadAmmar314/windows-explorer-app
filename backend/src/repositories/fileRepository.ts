import { eq } from 'drizzle-orm';
import { db } from '../db';
import type { File } from '../models/file';
import { files } from '../models/file';

export async function findByFolderId(folderId: number): Promise<File[]> {
  return db.select().from(files).where(eq(files.folderId, folderId));
}

export async function findById(id: number): Promise<File | undefined> {
  const [file] = await db.select().from(files).where(eq(files.id, id)).limit(1);
  return file;
}