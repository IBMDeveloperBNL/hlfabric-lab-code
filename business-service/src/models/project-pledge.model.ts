/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';
import { Funding } from './funding.model';

/**
 * The model class is generated from OpenAPI schema - ProjectPledge
 * An asset named ProjectPledge
 */
@model({ name: 'ProjectPledge' })
export class ProjectPledge {
  constructor(data?: Partial<ProjectPledge>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The instance identifier for this type
   */
  @property({ required: true })
  pledgeId: string;

  /**
   *
   */
  @property({ required: true })
  name: string;

  /**
   *
   */
  @property({ required: true })
  decription: string;

  /**
   *
   */
  @property({ required: true })
  fundsRequired: number;

  /**
   *
   */
  @property({ required: true })
  status: 'INITIALSTATE' | 'GLOBALCITIZENREVIEW' | 'GOVORGREVIEW' | 'PROPOSALFUNDED';

  /**
   *
   */
  @property({ required: true })
  aidOrg: string;

  /**
   *
   */
  @property()
  funds?: Funding;
}

