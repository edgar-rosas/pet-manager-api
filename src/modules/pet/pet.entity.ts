import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Owner } from "../owner/owner.entity.js";

@Entity()
export class Pet {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  uuid!: string;

  @Property()
  name!: string;

  @Property()
  imageUrl!: string;

  @Property()
  birthDate = new Date();

  @ManyToMany({ entity: () => Owner, mappedBy: (o) => o.pets })
  owners = new Collection<Owner>(this);

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
