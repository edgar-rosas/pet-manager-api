import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import { Pet } from "../pet/pet.entity.js";
import { PetOwner } from "../common/pet-owner.entity.js";

@Entity()
export class Owner {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  uuid!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Unique({ name: "owner_email_unique" })
  @Property()
  email!: string;

  @Property()
  password!: string;

  @ManyToMany({ entity: () => Pet, pivotEntity: () => PetOwner })
  pets = new Collection<Pet>(this);

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
