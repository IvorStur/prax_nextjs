import { sql, Kysely } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
  CREATE TABLE orders_products (
    id integer primary key autoincrement not null,
    order_id integer not null,
    product_id integer not null,
    count integer not null,
    total_price real not null,
    foreign key (order_id) references orders(id),
    foreign key (product_id) references products(id)
  );
  `.execute(db)
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`
  
  `.execute(db)
}
