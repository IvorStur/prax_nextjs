import { sql, Kysely } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
  CREATE TABLE products_photos (
    id integer primary key autoincrement not null,
    product_id integer not null,
    url text not null,
    foreign key (product_id) references products(id)
  );
  `.execute(db)
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`
  
  `.execute(db)
}
