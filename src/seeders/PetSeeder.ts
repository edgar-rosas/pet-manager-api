import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Pet } from "../modules/pet/pet.entity.js";

export class PetSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Pet, {
      name: "pet-1",
      slug: "pet-1",
      imageUrl: "",
      birthDate: new Date(),
      owners: [
        {
          firstName: "Name",
          lastName: "Last",
          email: "email",
        },
        {
          firstName: "Name 2",
          lastName: "Last 2",
          email: "email-2",
        },
      ],
    });
  }
}
