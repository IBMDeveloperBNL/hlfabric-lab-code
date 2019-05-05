/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - GovOrg
 * A participant named GovOrg
 */
@model({ name: 'GovOrg' })
export class GovOrg {
  constructor(data?: Partial<GovOrg>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The instance identifier for this type
   */
  @property({ required: true })
  govOrgId: string;

  // /**
  // * The identifier of an instance of fundedPledges
  // */
  // @property.array(String, { required: true })
  // fundedPledges: [];

  // /**
  // * The identifier of an instance of projectPledge
  // */
  // @property.array(String, { required: true })
  // projectPledge: [];

}

