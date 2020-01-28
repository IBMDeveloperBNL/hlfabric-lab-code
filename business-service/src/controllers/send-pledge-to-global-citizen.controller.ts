/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { SendPledgeToGlobalCitizen } from '../models/send-pledge-to-global-citizen.model';
import { BlockChainModule } from '../blockchainClient';
import { ResponseMessage } from '../models/response-message.model';

let blockchainClient = new BlockChainModule.BlockchainClient();

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by SendPledgeToGlobalCitizen
 * A transaction named SendPledgeToGlobalCitizen
 */
export class SendPledgeToGlobalCitizenController {
  constructor() { }

  /**
   *
   *

   * @param requestBody Model instance data
   * @argument pledgeId testing testing
   * @returns Request was successful
   */
  @operation('post', '/SendPledgeToGlobalCitizen', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ResponseMessage } } }
      }
    }
  })
  async sendPledgeToGlobalCitizenCreate(@requestBody() requestBody: SendPledgeToGlobalCitizen): Promise<ResponseMessage> {
    try {
      let networkObj = await blockchainClient.connectToNetwork();

      if (networkObj && !(networkObj.stack)) {
        // Construct data object that serves as
        let inputObj = {
          function: 'sendPledgeToGlobalCitizen',
          contract: networkObj.contract,
          pledgeId: requestBody.pledgeId
        };

        await blockchainClient.sendPledgeToGlobalCitizen(inputObj);
      } else {
        // Couldn't connect to network, so passing this object on to catch clause...
        throw new Error(networkObj.message);
      }

      let responseMessage: ResponseMessage = new ResponseMessage({ message: 'Sent project pledge ' + requestBody.pledgeId + ' to citizen org for review...' });
      return responseMessage;

    } catch (error) {
      let responseMessage: ResponseMessage = new ResponseMessage({ message: error, statusCode: '400' });
      return responseMessage;
    } finally {
      await blockchainClient.disconnectFromNetwork();
    }
  }
}

