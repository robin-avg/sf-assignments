import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Customerr,
} from '../models';
import {UserRepository} from '../repositories';

export class UserCustomerrController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/customerr', {
    responses: {
      '200': {
        description: 'Customerr belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customerr)},
          },
        },
      },
    },
  })
  async getCustomerr(
    @param.path.number('id') id: typeof User.prototype.Uid,
  ): Promise<Customerr> {
    return this.userRepository.userList(id);
  }
}
