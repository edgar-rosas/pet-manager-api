import { Owner } from "../owner/owner.entity.js";
import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { Pet } from "../pet/pet.entity.js";

export enum OwnerType {
  PRIMARY = "primary",
  SECONDARY = "other",
}

@Entity()
export class PetOwner {
  @ManyToOne({ primary: true })
  pet!: Pet;

  @ManyToOne({ primary: true })
  owner!: Owner;

  @Enum(() => OwnerType)
  type = OwnerType.PRIMARY;
}
