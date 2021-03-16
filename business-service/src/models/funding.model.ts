import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Funding
 * Funding
 */
@model({name: 'Funding'})
export class Funding {
  constructor(data?: Partial<Funding>) {
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
  fundingType: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'number',
}})
  nextFundingDueInDays: number;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'number',
}})
  approvedFunding: number;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'number',
}})
  totalFundsReceived: number;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'number',
}})
  fundsPerInstallment: number;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  govOrgId: string;

}

export interface FundingRelations {
  // describe navigational properties here
}

export type FundingWithRelations = Funding & FundingRelations;


