/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - SendPledgeToGlobalCitizen
 * A transaction named SendPledgeToGlobalCitizen
 */
@model({ name: 'SendPledgeToGlobalCitizen' })
export class SendPledgeToGlobalCitizen {
  constructor(data?: Partial<SendPledgeToGlobalCitizen>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *@param pledgeId
   */
  @property({ required: true })
  pledgeId: string;

}

