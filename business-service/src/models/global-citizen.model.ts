/* tslint:disable:no-any */
import { model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - GlobalCitizen
 * A participant named GlobalCitizen
 */
@model({ name: 'GlobalCitizen' })
export class GlobalCitizen {
  constructor(data?: Partial<GlobalCitizen>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The instance identifier for this type
   */
  @property({ required: true })
  citizenId: string;

  // /**
  // * The identifier of an instance of projectPledge
  //  */
  // @property.array(String, { required: true })
  // projectPledge: [];

}

