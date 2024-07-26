import {
  Collection,
  Entity,
  Index,
  ManyToMany,
  OptionalProps,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Owner } from "../owner/owner.entity.js";

@Entity()
export class Pet {
  [OptionalProps]?: "createdAt" | "updatedAt";

  constructor(petParams: Pet) {
    this.uuid = petParams.uuid;
    this.name = petParams.name;
    this.slug = petParams.slug;
    this.imageUrl = petParams.imageUrl;
    this.birthDate = petParams.birthDate;
    this.owners = petParams.owners;
    this.createdAt = petParams.createdAt;
    this.updatedAt = petParams.updatedAt;
  }

  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  uuid!: string;

  @Property()
  name!: string;

  @Index({ name: "pet_slug_index" })
  @Property()
  slug!: string;

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
