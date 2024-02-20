import fs from 'node:fs/promises'
import * as path from 'node:path'
import { migrationFolder } from '../../db/db-config'

const newEmptyMigrationFileContent = `\
import { sql, Kysely } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql\`
  
  \`.execute(db)
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql\`
  
  \`.execute(db)
}
` as const

async function createNewMigrationFile() {
  const currentDate = new Date()
  const fileName = `${currentDate.getFullYear()}${
    currentDate.getMonth() + 1
  }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}__new_migration_change_name_please.ts`

  await fs.writeFile(path.join(migrationFolder, fileName), newEmptyMigrationFileContent)
}

createNewMigrationFile()
