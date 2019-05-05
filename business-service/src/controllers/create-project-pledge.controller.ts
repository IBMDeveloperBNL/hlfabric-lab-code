/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { CreateProjectPledge } from '../models/create-project-pledge.model';
import { BlockChainModule } from '../blockchainClient';
import { ResponseMessage } from '../models/response-message.model';

let blockchainClient = new BlockChainModule.BlockchainClient();

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by CreateProjectPledge
 * A transaction named CreateProjectPledge
 */
export class CreateProjectPledgeController {
  constructor() { }

  /**
   *
   *

   * @param requestBody Model instance data
   * @returns Request was successful
   */
  @operation('post', '/CreateProjectPledge', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ResponseMessage } } }
      }
    }
  })
  async createProjectPledgeCreate(@requestBody() requestBody: CreateProjectPledge): Promise<ResponseMessage> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      if (networkObj && !(networkObj.stack)) {
        // Construct data object that serves as
        let inputObj = {
          function: 'createProjectPledge',
          contract: networkObj.contract,
          pledgeNumber: requestBody.pledgeNumber,
          name: requestBody.name,
          desc: requestBody.description,
          fundsRequired: requestBody.fundsRequired,
          aidOrg: requestBody.aidOrg
        };

        await blockchainClient.createProjectPledge(inputObj);
      } else {
        // Couldn't connect to network, so passing this object on to catch clause...
        throw new Error(networkObj.message);
      }

      let responseMessage: ResponseMessage = new ResponseMessage({ message: 'added project pledge' });
      return responseMessage;

    } catch (error) {
      let responseMessage: ResponseMessage = new ResponseMessage({ message: error, statusCode: '400' });
      return responseMessage;
    }
  }
}

