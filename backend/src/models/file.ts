import { sql } from 'drizzle-orm';
import { bigint, datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { folders } from './folder';

export const files = mysqlTable('files', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  size: bigint('size', { mode: 'number' }).notNull(),
  lastModified: datetime('last_modified').default(sql`CURRENT_TIMESTAMP`).notNull(),
  folderId: int('folder_id').notNull().references(() => folders.id),
});

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
