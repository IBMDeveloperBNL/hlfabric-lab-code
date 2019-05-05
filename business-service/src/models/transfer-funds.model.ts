/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - TransferFunds
 * A transaction named TransferFunds
 */
@model({ name: 'TransferFunds' })
export class TransferFunds {
  constructor(data?: Partial<TransferFunds>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({ required: true })
  pledgeId: string;
}

