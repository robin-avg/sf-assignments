import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgreSqlDataSource} from '../datasources';
import {Role, RoleRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.rid,
  RoleRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Role.prototype.rid>;

  constructor(
    @inject('datasources.postgreSql') dataSource: PostgreSqlDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Role, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
