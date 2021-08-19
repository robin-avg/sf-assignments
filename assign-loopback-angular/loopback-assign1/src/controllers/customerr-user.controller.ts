import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Customerr,
  User,
} from '../models';
import {CustomerrRepository} from '../repositories';

export class CustomerrUserController {
  constructor(
    @repository(CustomerrRepository) protected customerrRepository: CustomerrRepository,
  ) { }

  @get('/customerrs/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Customerr has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.customerrRepository.users(id).find(filter);
  }

  @post('/customerrs/{id}/users', {
    responses: {
      '200': {
        description: 'Customerr model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customerr.prototype.cid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInCustomerr',
            exclude: ['Uid'],
            optional: ['custID']
          }),
        },
      },
    }) user: Omit<User, 'Uid'>,
  ): Promise<User> {
    return this.customerrRepository.users(id).create(user);
  }

  @patch('/customerrs/{id}/users', {
    responses: {
      '200': {
        description: 'Customerr.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.customerrRepository.users(id).patch(user, where);
  }

  @del('/customerrs/{id}/users', {
    responses: {
      '200': {
        description: 'Customerr.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.customerrRepository.users(id).delete(where);
  }
}
