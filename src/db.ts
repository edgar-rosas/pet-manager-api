import { EntityManager, EntityRepository, MikroORM, Options } from '@mikro-orm/postgresql';
import {Pet} from "./modules/pet/pet.entity.js";
import {Owner} from "./modules/owner/owner.entity.js";

export interface Services {
    orm: MikroORM;
    em: EntityManager;
    pet: EntityRepository<Pet>;
    owner: EntityRepository<Owner>;
}

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
    if (cache) {
        return cache;
    }

    const orm = await MikroORM.init(options);

    return cache = {
        orm,
        em: orm.em,
        pet: orm.em.getRepository(Pet),
        owner: orm.em.getRepository(Owner),
    };
}