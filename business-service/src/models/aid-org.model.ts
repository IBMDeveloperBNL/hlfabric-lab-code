/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';
import { ProjectPledge } from './project-pledge.model';

/**
 * The model class is generated from OpenAPI schema - AidOrg
 * A participant named AidOrg
 */
@model({ name: 'AidOrg' })
export class AidOrg {
  constructor(data?: Partial<AidOrg>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The instance identifier for this type
   */
  @property({ required: true })
  aidOrgId: string;

  //  /**
  //   * The identifier of an instance of projectPledge
  //   */
  //  @property.array(String, { required: true })
  //  projectPledge: [];
}

