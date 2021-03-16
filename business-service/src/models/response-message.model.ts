import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - ResponseMessage
 * ResponseMessage
 */
@model({name: 'ResponseMessage'})
export class ResponseMessage {
  constructor(data?: Partial<ResponseMessage>) {
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
  message: string;

  /**
   *
   */
  @property({required: true, jsonSchema: {
  type: 'string',
}})
  statusCode: string;

}

export interface ResponseMessageRelations {
  // describe navigational properties here
}

export type ResponseMessageWithRelations = ResponseMessage & ResponseMessageRelations;


