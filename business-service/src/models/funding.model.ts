/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Funding
 * A concept named Funding
 */
@model({ name: 'Funding' })
export class Funding {
  constructor(data?: Partial<Funding>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({ required: true })
  fundingType: 'WEEKLY' | 'MONTHLY' | 'SEMIANNUALY' | 'ANNUALY';

  /**
   *
   */
  @property({ required: true })
  nextFundingDueInDays: number;

  /**
   *
   */
  @property({ required: true })
  approvedFunding: number;

  /**
   *
   */
  @property({ required: true })
  totalFundsReceived: number;

  /**
   *
   */
  @property({ required: true })
  fundsPerInstallment: number;

  /**
   *
   */
  @property({ required: true })
  govOrgId: string;
}

