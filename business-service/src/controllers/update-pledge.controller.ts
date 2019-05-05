/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { UpdatePledge } from '../models/update-pledge.model';
import { BlockChainModule } from '../blockchainClient';
import { ResponseMessage } from '../models/response-message.model';

let blockchainClient = new BlockChainModule.BlockchainClient();

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by UpdatePledge
 * A transaction named UpdatePledge
 */
export class UpdatePledgeController {
  constructor() { }

  /**
   *
   *

   * @param requestBody Model instance data
   * @returns Request was successful
   */
  @operation('post', '/UpdatePledge', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ResponseMessage } } }
      }
    }
  })
  async updatePledgeCreate(@requestBody() requestBody: UpdatePledge): Promise<ResponseMessage> {
    try {
      let networkObj = await blockchainClient.connectToNetwork();

      if (networkObj && !(networkObj.stack)) {
        // Construct data object that serves as
        let inputObj = {
          function: 'updatePledge',
          contract: networkObj.contract,
          pledgeId: requestBody.pledgeId,
          fundingType: requestBody.fundingType,
          approvedFunding: requestBody.approvedFunding,
          fundsPerInstallment: requestBody.fundsPerInstallment
        };

        await blockchainClient.updatePledge(inputObj);
      } else {
        // Couldn't connect to network, so passing this object on to catch clause...
        throw new Error(networkObj.message);
      }

      let responseMessage: ResponseMessage = new ResponseMessage({ message: 'Updated project pledge ' + requestBody.pledgeId });
      return responseMessage;

    } catch (error) {
      let responseMessage: ResponseMessage = new ResponseMessage({ message: error.message, statusCode: '400' });
      return responseMessage;
    }

  }

}

