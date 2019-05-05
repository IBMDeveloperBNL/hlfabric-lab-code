/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - CreateProjectPledge
 * A transaction named CreateProjectPledge
 */
@model({ name: 'CreateProjectPledge' })
export class CreateProjectPledge {
  constructor(data?: Partial<CreateProjectPledge>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({ required: true })
  pledgeNumber: string;

  /**
   *
   */
  @property({ required: true })
  name: string;

  /**
   *
   */
  @property({ required: true })
  description: string;

  /**
   *
   */
  @property({ required: true })
  fundsRequired: string;

  /**
   *
   */
  @property({ required: true })
  aidOrg: string;
}

