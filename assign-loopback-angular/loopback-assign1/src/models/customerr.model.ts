import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Customerr extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  cid?: number;

  @property({
    type: 'string',
    required: true,
  })
  customer_name: string;

  @property({
    type: 'string',
    required: true,
  })
  customer_address: string;

  @hasMany(() => User, {keyTo: 'custID'})
  users: User[];

  constructor(data?: Partial<Customerr>) {
    super(data);
  }
}

export interface CustomerrRelations {
  // describe navigational properties here
}

export type CustomerrWithRelations = Customerr & CustomerrRelations;
