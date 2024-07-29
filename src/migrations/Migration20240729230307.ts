import { Migration } from '@mikro-orm/migrations';

export class Migration20240729230307 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "owner" ("uuid" uuid not null default gen_random_uuid(), "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "owner_pkey" primary key ("uuid"));');
    this.addSql('alter table "owner" add constraint "owner_email_unique" unique ("email");');

    this.addSql('create table "pet" ("uuid" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "slug" varchar(255) not null, "image_url" varchar(255) not null, "birth_date" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "pet_pkey" primary key ("uuid"));');
    this.addSql('create index "pet_slug_index" on "pet" ("slug");');

    this.addSql('create table "pet_owner" ("owner_uuid" uuid not null, "pet_uuid" uuid not null, "type" text check ("type" in (\'primary\', \'other\')) not null default \'primary\', constraint "pet_owner_pkey" primary key ("owner_uuid", "pet_uuid"));');

    this.addSql('alter table "pet_owner" add constraint "pet_owner_owner_uuid_foreign" foreign key ("owner_uuid") references "owner" ("uuid") on update cascade;');
    this.addSql('alter table "pet_owner" add constraint "pet_owner_pet_uuid_foreign" foreign key ("pet_uuid") references "pet" ("uuid") on update cascade;');
  }

}
