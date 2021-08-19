import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgreSqlDataSource} from '../datasources';
import {User, UserRelations, Customerr, Role} from '../models';
import {CustomerrRepository} from './customerr.repository';
import {RoleRepository} from './role.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.Uid,
  UserRelations
> {

  public readonly userList: BelongsToAccessor<Customerr, typeof User.prototype.Uid>;

  public readonly role: BelongsToAccessor<Role, typeof User.prototype.Uid>;

  constructor(
    @inject('datasources.postgreSql') dataSource: PostgreSqlDataSource, @repository.getter('CustomerrRepository') protected customerrRepositoryGetter: Getter<CustomerrRepository>, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(User, dataSource);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
    this.userList = this.createBelongsToAccessorFor('userList', customerrRepositoryGetter,);
    this.registerInclusionResolver('userList', this.userList.inclusionResolver);
  }
}
