import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Customerr} from '../models';
import {CustomerrRepository} from '../repositories';

export class CustomerController {
  constructor(
    @repository(CustomerrRepository)
    public customerrRepository : CustomerrRepository,
  ) {}

  @post('/customerrs')
  @response(200, {
    description: 'Customerr model instance',
    content: {'application/json': {schema: getModelSchemaRef(Customerr)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerr, {
            title: 'NewCustomerr',
            //exclude: ['id'],
          }),
        },
      },
    })
    customerr: Omit<Customerr, 'id'>,
  ): Promise<Customerr> {
    return this.customerrRepository.create(customerr);
  }

  @get('/customerrs/count')
  @response(200, {
    description: 'Customerr model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Customerr) where?: Where<Customerr>,
  ): Promise<Count> {
    return this.customerrRepository.count(where);
  }

  @get('/customerrs')
  @response(200, {
    description: 'Array of Customerr model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customerr, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Customerr) filter?: Filter<Customerr>,
  ): Promise<Customerr[]> {
    return this.customerrRepository.find(filter);
  }

  @patch('/customerrs')
  @response(200, {
    description: 'Customerr PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerr, {partial: true}),
        },
      },
    })
    customerr: Customerr,
    @param.where(Customerr) where?: Where<Customerr>,
  ): Promise<Count> {
    return this.customerrRepository.updateAll(customerr, where);
  }

  @get('/customerrs/{id}')
  @response(200, {
    description: 'Customerr model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Customerr, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Customerr, {exclude: 'where'}) filter?: FilterExcludingWhere<Customerr>
  ): Promise<Customerr> {
    return this.customerrRepository.findById(id, filter);
  }

  @patch('/customerrs/{id}')
  @response(204, {
    description: 'Customerr PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerr, {partial: true}),
        },
      },
    })
    customerr: Customerr,
  ): Promise<void> {
    await this.customerrRepository.updateById(id, customerr);
  }

  @put('/customerrs/{id}')
  @response(204, {
    description: 'Customerr PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() customerr: Customerr,
  ): Promise<void> {
    await this.customerrRepository.replaceById(id, customerr);
  }

  @del('/customerrs/{id}')
  @response(204, {
    description: 'Customerr DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.customerrRepository.deleteById(id);
  }
}
