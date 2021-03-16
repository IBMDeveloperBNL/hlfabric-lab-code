import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - CreateProjectPledge
 * CreateProjectPledge
 */
@model({name: 'CreateProjectPledge'})
export class CreateProjectPledge {
  constructor(data?: Partial<CreateProjectPledge>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  aidOrg: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  pledgeNumber: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  name: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  description: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  fundsRequired: string;

}

export interface CreateProjectPledgeRelations {
  // describe navigational properties here
}

export type CreateProjectPledgeWithRelations = CreateProjectPledge & CreateProjectPledgeRelations;


