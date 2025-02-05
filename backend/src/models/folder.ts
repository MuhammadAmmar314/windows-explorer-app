import type { AnyMySqlColumn } from 'drizzle-orm/mysql-core';
import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const folders = mysqlTable('folders', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  parentId: int('parent_id').references((): AnyMySqlColumn => folders.id)
});
