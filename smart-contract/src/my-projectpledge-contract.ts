/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { ProjectPledge } from './projectpledge';
import { Funding } from './funding';

// Variables used in smart contract
const AIDORG = 'Org1MSP';
const CITIZENORG = 'Org1MSP';
const GOVORG = 'Org1MSP';

// Enumerate commercial paper state values
const ppState = {
    INITIALSTATE: 'INITIALSTATE',
    GLOBALCITIZENREVIEW: 'GLOBALCITIZENREVIEW',
    GOVORGREVIEW: 'GOVORGREVIEW',
    PROPOSALFUNDED: 'PROPOSALFUNDED'
};

@Info({ title: 'MyProjectPledgeContract', description: 'Smart Contract for global citizen code pattern' })
export class MyProjectPledgeContract extends Contract {
    @Transaction(false)
    public async init(ctx: Context): Promise<void> {
        console.log('Initialise smart contract..');
    }

    @Transaction(false)
    @Returns('boolean')
    public async projectPledgeExists(ctx: Context, pledgeId: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(pledgeId);
        return (!!data && data.length > 0);
    }

    @Transaction()
    async createProjectPledge(ctx: Context, aidOrg: string, pledgeNumber: string, name: string, description: string, fundsRequired: number): Promise<void> {
        const pledgeId: string = aidOrg + ':' + pledgeNumber;
        const exists: boolean = await this.projectPledgeExists(ctx, pledgeId);

        if (exists) {
            throw new Error(`The project pledge ${pledgeId} already exists`);
        }

        // create an instance of the project pledge
        let pledge: ProjectPledge = new ProjectPledge();

        pledge.pledgeNumber = pledgeNumber;
        pledge.aidOrg = aidOrg;
        pledge.name = name;
        pledge.description = description;
        pledge.fundsRequired = fundsRequired;
        pledge.status = ppState.INITIALSTATE;

        const buffer: Buffer = Buffer.from(JSON.stringify(pledge));
        await ctx.stub.putState(pledgeId, buffer);

        // define and set pledgeEvent
        let pledgeEvent = {
            type: "Create ProjectPledge",
            pledgeId: pledgeId,
            name: pledge.name,
            description: pledge.description,
            fundsRequired: pledge.fundsRequired,
            status: pledge.status,
        };

        await ctx.stub.setEvent('PledgeEvent', Buffer.from(JSON.stringify(pledgeEvent)));        
    }

    @Transaction(false)
    @Returns('ProjectPledge')
    public async readProjectPledge(ctx: Context, pledgeId: string): Promise<ProjectPledge> {
        const exists: boolean = await this.projectPledgeExists(ctx, pledgeId);
        if (!exists) {
            throw new Error(`The project pledge ${pledgeId} does not exists`);
        }

        let data: Uint8Array = await ctx.stub.getState(pledgeId);
        const pledge: ProjectPledge = JSON.parse(data.toString()) as ProjectPledge;

        return pledge;
    }    

    @Transaction()
    async sendPledgeToGlobalCitizen(ctx: Context, pledgeId: string): Promise<void> {
        // obtaining the MSP ID from the caller identity to determine which participant the user belongs to
        const orgMSPID: string = ctx.clientIdentity.getMSPID();

        //Obtain project pledge from the worldstate
        await this.readProjectPledge(ctx, pledgeId).then(pledge => {
            console.log(`Resolved project pledge ${pledgeId} from world state. Ready to update`);

            if ((pledge.status === ppState.INITIALSTATE) && (orgMSPID === AIDORG)) {
                pledge.status = ppState.GLOBALCITIZENREVIEW;

                const buffer = Buffer.from(JSON.stringify(pledge));
                ctx.stub.putState(pledgeId, buffer);

                // define and set pledgeEvent
                let pledgeEvent = {
                    type: "Send ProjectPledge to Global Citizen",
                    pledgeId: pledgeId,
                    name: pledge.name,
                    description: pledge.description,
                    fundsRequired: pledge.fundsRequired,
                    status: pledge.status,
                };
                
                ctx.stub.setEvent('PledgeEvent', Buffer.from(JSON.stringify(pledgeEvent)));        

            } else {
                throw new Error('The project pledge cannot move to GLOBALCITIZENREVIEW state. Check current owner and state.');
            }
        });
    }

    @Transaction()
    async sendPledgeToGovOrg(ctx: Context, pledgeId: string): Promise<void> {
        // obtaining the MSP ID from the caller identity to determine which participant the user belongs to
        const orgMSPID: string = ctx.clientIdentity.getMSPID();

        //Obtain project pledge from the worldstate
        await this.readProjectPledge(ctx, pledgeId).then(pledge => {
            console.log(`Resolved project pledge ${pledgeId} from world state. Ready to update`);

            if ((pledge.status === ppState.GLOBALCITIZENREVIEW) && (orgMSPID === CITIZENORG)) {
                pledge.status = ppState.GOVORGREVIEW;

                const buffer = Buffer.from(JSON.stringify(pledge));
                ctx.stub.putState(pledgeId, buffer);

                // define and set pledgeEvent
                let pledgeEvent = {
                    type: "Send ProjectPledge to Government Org",
                    pledgeId: pledgeId,
                    name: pledge.name,
                    description: pledge.description,
                    fundsRequired: pledge.fundsRequired,
                    status: pledge.status,
                };
                
                ctx.stub.setEvent('PledgeEvent', Buffer.from(JSON.stringify(pledgeEvent)));        

            } else {
                throw new Error('The project pledge cannot move to GOVORGREVIEW state. Check current owner and state.');
            }
        });
    }

    @Transaction()
    async updatePledge(ctx: Context, pledgeId: string, fundingType: 'WEEKLY' | 'MONTHLY' | 'SEMIANNUALY' | 'ANNUALY', approvedFunding: number, fundsPerInstallment: number): Promise<void> {
        // obtaining the MSP ID from the caller identity to determine which participant the user belongs to
        const orgMSPID: string = ctx.clientIdentity.getMSPID();

        //Obtain project pledge from the worldstate
        await this.readProjectPledge(ctx, pledgeId).then(pledge => {
            console.log(`Resolved project pledge ${pledgeId} from world state. Ready to update`);

            if ((pledge.status === ppState.GOVORGREVIEW) && (orgMSPID === GOVORG)) {
                // Updating project pledge with funding details
                let daysToAdd = 0;
                let fund: Funding = new Funding();

                switch (fundingType) {
                    case 'WEEKLY':
                        daysToAdd = 7;
                        break;
                    case 'MONTHLY':
                        daysToAdd = 30;
                        break;
                    case 'SEMIANNUALY':
                        daysToAdd = 180;
                        break;
                    case 'ANNUALY':
                        daysToAdd = 365;
                        break;
                }

                // Fill funding object based on input parameters
                fund.fundingType = fundingType;
                fund.nextFundingDueInDays = daysToAdd;
                fund.approvedFunding = approvedFunding;
                fund.totalFundsReceived = 0;
                fund.fundsPerInstallment = fundsPerInstallment;
                fund.govOrgId = GOVORG;

                pledge.funds = fund;
                pledge.status = ppState.PROPOSALFUNDED;

                const buffer = Buffer.from(JSON.stringify(pledge));
                ctx.stub.putState(pledgeId, buffer);

                // define and set pledgeEvent
                let pledgeEvent = {
                    type: "Update ProjectPledge",
                    pledgeId: pledgeId,
                    name: pledge.name,
                    description: pledge.description,
                    fundsRequired: pledge.fundsRequired,
                    funds: pledge.funds,
                    status: pledge.status,
                };
                
                ctx.stub.setEvent('PledgeEvent', Buffer.from(JSON.stringify(pledgeEvent)));        
            } else {
                throw new Error('The project pledge cannot move to PROPOSALFUNDED state. Check current owner and state.');
            }
        });
    }

    @Transaction()
    async transferFunds(ctx: Context, pledgeId: string): Promise<void> {
        // obtaining the MSP ID from the caller identity to determine which participant the user belongs to
        const orgMSPID: string = ctx.clientIdentity.getMSPID();

        //Obtain project pledge from the worldstate
        await this.readProjectPledge(ctx, pledgeId).then(pledge => {
            console.log(`Resolved project pledge ${pledgeId} from world state. Ready to transfer funds`);

            if ((pledge.status === ppState.PROPOSALFUNDED) && (orgMSPID === GOVORG)) {
                pledge.funds.totalFundsReceived += pledge.funds.fundsPerInstallment;

                const buffer = Buffer.from(JSON.stringify(pledge));
                ctx.stub.putState(pledgeId, buffer);

                // define and set pledgeEvent
                let pledgeEvent = {
                    type: "Transfer Funds to ProjectPledge",
                    pledgeId: pledgeId,
                    name: pledge.name,
                    description: pledge.description,
                    fundsRequired: pledge.fundsRequired,
                    funds: pledge.funds,
                    status: pledge.status,
                };
                
                ctx.stub.setEvent('PledgeEvent', Buffer.from(JSON.stringify(pledgeEvent)));        

            } else {
                throw new Error('Unable to increment totals funds received.');
            }
        });
    }
}
