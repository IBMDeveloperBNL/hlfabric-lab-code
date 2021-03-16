import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - UpdatePledge
 * UpdatePledge
 */
@model({name: 'UpdatePledge'})
export class UpdatePledge {
  constructor(data?: Partial<UpdatePledge>) {
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
  pledgeId: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  fundingType: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  approvedFunding: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  fundsPerInstallment: string;

}

export interface UpdatePledgeRelations {
  // describe navigational properties here
}

export type UpdatePledgeWithRelations = UpdatePledge & UpdatePledgeRelations;


