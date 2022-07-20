import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RoleEnum } from 'src/roles/roles.enum';

export default class CreateRole implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countUser = await connection
      .createQueryBuilder()
      .select()
      .from(Role, 'Role')
      .where('"Role"."id" = :id', { id: RoleEnum.USER })
      .getCount();

    if (countUser === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([{ id: RoleEnum.USER, name: 'User' }])
        .execute();
    }

    const countAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(Role, 'Role')
      .where('"Role"."id" = :id', { id: RoleEnum.MANAGER })
      .getCount();

    if (countAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([{ id: RoleEnum.MANAGER, name: 'Admin' }])
        .execute();
    }
  }
}
