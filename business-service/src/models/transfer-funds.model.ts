import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - TransferFunds
 * TransferFunds
 */
@model({name: 'TransferFunds'})
export class TransferFunds {
  constructor(data?: Partial<TransferFunds>) {
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

}

export interface TransferFundsRelations {
  // describe navigational properties here
}

export type TransferFundsWithRelations = TransferFunds & TransferFundsRelations;


