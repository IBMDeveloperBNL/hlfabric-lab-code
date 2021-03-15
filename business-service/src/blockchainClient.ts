import {BlockEvent, Contract, ContractEvent, ContractListener, DefaultCheckpointers, Gateway, ListenerOptions, Network, TransactionEvent, Wallet, Wallets} from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';

const configPath = path.join(process.cwd(), './local_fabric/config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

let appAdmin: string = config.appAdmin;
let gatewayDiscovery = config.gatewayDiscovery;
let connection_file: string = config.connection_file;

// connect to the connection file
const ccpPath = path.join(process.cwd(), './local_fabric/' + connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// Gateway to interact with the blockchain network
const gateway: Gateway = new Gateway();

// Channel and contract name
const CHANNEL = 'mychannel';
const CONTRACT = 'global-citizen';

export module BlockChainModule {

  export class BlockchainClient {
    async connectToNetwork() {
      try {
        // A wallet stores a collection of identities for use
        const wallet: Wallet = await Wallets.newFileSystemWallet('./local_fabric/wallet');

        await gateway.connect(ccp, {wallet, identity: appAdmin, discovery: gatewayDiscovery});

        // Connect to our local fabric
        const network: Network = await gateway.getNetwork('mychannel');

        console.log('**********************************************************************************************************');
        console.log('--> connecting to channel: ' + CHANNEL);

        // Get the contract we have installed on the peer
        const contract: Contract = network.getContract(CONTRACT);

        const listener: ContractListener = async (event: ContractEvent) => {
          if (event.eventName === 'PledgeEvent') {
            if (event.payload) {
              const eventPayload = JSON.parse(event.payload.toString('utf8'));
              const eventTransaction: TransactionEvent = event.getTransactionEvent();
              const eventBlock: BlockEvent = eventTransaction.getBlockEvent();

              // Output the PledgeEvent
              console.log('\n--> ******** received pledge event ********');
              console.log(`-->    type: ${eventPayload.type}`);
              console.log(`-->    pledgeId: ${eventPayload.pledgeId}`);
              console.log(`-->    name: ${eventPayload.name}`);
              console.log(`-->    description: ${eventPayload.description}`);
              console.log(`-->    fundsRequired: ${eventPayload.fundsRequired}`);

              if (eventPayload.funds) {
                console.log(`-->       fundingType: ${eventPayload.funds.fundingType}`);
                console.log(`-->       approvedFunding: ${eventPayload.funds.approvedFunding}`);
                console.log(`-->       totalFundsReceived: ${eventPayload.funds.totalFundsReceived}`);
                console.log(`-->       fundsPerInstallment: ${eventPayload.funds.fundsPerInstallment}`);
              }

              console.log(`-->    pledge status: ${eventPayload.status}`);
              console.log(`--> `);
              console.log(`-->    block number: ${eventBlock.blockNumber}`);
              console.log(`-->    transaction ID: ${eventTransaction.transactionId}`);
              console.log(`-->    transaction status: ${eventTransaction.status}`);
              console.log('--> ******** processed pledge event ********\n');
            }
          }
        };

        // Define file based checkpointer to keep track of last block and transactions in that block, that have been seen by this client.
        const options: ListenerOptions = {
          checkpointer: await DefaultCheckpointers.file('./checkpoint.json')
        }

        // Add the listener defined above to the contract so that it can receive smart contract events emitted by the chaincode
        await contract.addContractListener(listener, options);

        // Define network object that contains both the contract and the network object
        const networkObj = {
          contract: contract,
          network: network
        };

        return networkObj;
      } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

        return error;
      }
    }

    disconnectFromNetwork() {
      // Properly disconnecting from the network when finished
      console.log('--> disconnecting from channel: ' + CHANNEL);
      console.log('**********************************************************************************************************');
      console.log(' ');

      return gateway.disconnect();
    }

    async createProjectPledge(args: any) {
      // Calling createProjectPledge transaction in the smart contract
      console.log('--> invoking createProjectPledge(ctx, "' + args.aidOrg + '", "' + args.pledgeNumber + '", "' + args.name + '", "' + args.desc + '", "' + args.fundsRequired + '")');
      return await args.contract.submitTransaction(args.function, args.aidOrg, args.pledgeNumber, args.name, args.desc, args.fundsRequired);
    }

    async sendPledgeToGlobalCitizen(args: any) {
      // Calling sendPledgeToGlobalCitizen transaction in the smart contract
      console.log('--> invoking sendPledgeToGlobalCitizen(ctx, "' + args.pledgeId + '")');
      return await args.contract.submitTransaction(args.function, args.pledgeId);
    }

    async sendPledgeToGovOrg(args: any) {
      // Calling sendPledgeToGovOrg transaction in the smart contract
      console.log('--> invoking sendPledgeToGovOrg(ctx, "' + args.pledgeId + '")');
      return await args.contract.submitTransaction(args.function, args.pledgeId);
    }

    async updatePledge(args: any) {
      // Calling updatePledge transaction in the smart contract
      console.log('--> invoking updatePledge(ctx, "' + args.pledgeId + '", "' + args.fundingType + '", "' + args.approvedFunding + '", "' + args.fundsPerInstallment + '")');
      return await args.contract.submitTransaction(args.function, args.pledgeId, args.fundingType, args.approvedFunding, args.fundsPerInstallment);
    }

    async transferFunds(args: any) {
      // Calling transferFunds transaction in the smart contract
      console.log('--> invoking transferFunds(ctx, "' + args.pledgeId + '")');
      return await args.contract.submitTransaction(args.function, args.pledgeId);
    }

    async queryProject(args: any) {
      try {
        // Calling readProjectPledge transaction in the smart contract
        console.log('--> invoking readProjectPledge(ctx, "' + args.id + '")');
        let response = await args.contract.evaluateTransaction(args.function, args.id);
        console.log('--> result:\n');
        console.log(JSON.parse(response));
        console.log('');

        return JSON.parse(response);
      } catch (error) {
        console.log(error.message);

        return error;
      }
    }
  }
}
