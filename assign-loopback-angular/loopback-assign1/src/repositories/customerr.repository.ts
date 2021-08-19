import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgreSqlDataSource} from '../datasources';
import {Customerr, CustomerrRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class CustomerrRepository extends DefaultCrudRepository<
  Customerr,
  typeof Customerr.prototype.cid,
  CustomerrRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Customerr.prototype.cid>;

  constructor(
    @inject('datasources.postgreSql') dataSource: PostgreSqlDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Customerr, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
