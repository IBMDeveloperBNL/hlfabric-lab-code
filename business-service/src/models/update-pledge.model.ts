/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - UpdatePledge
 * A transaction named UpdatePledge
 */
@model({ name: 'UpdatePledge' })
export class UpdatePledge {
  constructor(data?: Partial<UpdatePledge>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({ required: true })
  pledgeId: string;

  /**
   *
   */
  @property({ required: true })
  fundingType: 'WEEKLY' | 'MONTHLY' | 'SEMIANNUALY' | 'ANNUALY';

  /**
   *
   */
  @property({ required: true })
  approvedFunding: string;

  /**
   *
   */
  @property({ required: true })
  fundsPerInstallment: string;
}

