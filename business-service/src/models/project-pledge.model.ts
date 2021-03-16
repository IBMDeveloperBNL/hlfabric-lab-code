import {model, property} from '@loopback/repository';
import {Funding} from './funding.model';

/**
 * The model class is generated from OpenAPI schema - ProjectPledge
 * ProjectPledge
 */
@model({name: 'ProjectPledge'})
export class ProjectPledge {
  constructor(data?: Partial<ProjectPledge>) {
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

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  name: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  decription: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'number',
}})
  fundsRequired: number;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  status: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  aidOrg: string;

  /**
   *
   */
  @property.array(Funding, {jsonSchema: {
  type: 'array',
  items: {
    $ref: '#/components/schemas/Funding',
  },
}})
  funds?: Funding[];

}

export interface ProjectPledgeRelations {
  // describe navigational properties here
}

export type ProjectPledgeWithRelations = ProjectPledge & ProjectPledgeRelations;


