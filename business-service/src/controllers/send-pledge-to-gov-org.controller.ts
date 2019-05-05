/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { SendPledgeToGovOrg } from '../models/send-pledge-to-gov-org.model';
import { BlockChainModule } from '../blockchainClient';
import { ResponseMessage } from '../models/response-message.model';

let blockchainClient = new BlockChainModule.BlockchainClient();

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by SendPledgeToGovOrg
 * A transaction named SendPledgeToGovOrg
 */
export class SendPledgeToGovOrgController {
  constructor() { }

  /**
   *
   *

   * @param requestBody Model instance data
   * @returns Request was successful
   */
  @operation('post', '/SendPledgeToGovOrg', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ResponseMessage } } }
      }
    }
  })
  async sendPledgeToGovOrgCreate(@requestBody() requestBody: SendPledgeToGovOrg): Promise<ResponseMessage> {
    try {
      let networkObj = await blockchainClient.connectToNetwork();

      if (networkObj && !(networkObj.stack)) {
        // Construct data object that serves as
        let inputObj = {
          function: 'sendPledgeToGovOrg',
          contract: networkObj.contract,
          pledgeId: requestBody.pledgeId
        };

        await blockchainClient.sendPledgeToGovOrg(inputObj);
      } else {
        // Couldn't connect to network, so passing this object on to catch clause...
        throw new Error(networkObj.message);
      }

      let responseMessage: ResponseMessage = new ResponseMessage({ message: 'Sent project pledge ' + requestBody.pledgeId + ' to government org for review...' });
      return responseMessage;

    } catch (error) {
      let responseMessage: ResponseMessage = new ResponseMessage({ message: error, statusCode: '400' });
      return responseMessage;
    }
  }

}

