"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_contract_api_1 = require("fabric-contract-api");
const projectpledge_1 = require("./projectpledge");
const funding_1 = require("./funding");
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
let MyProjectPledgeContract = class MyProjectPledgeContract extends fabric_contract_api_1.Contract {
    async init(ctx) {
        console.log('Initialise smart contract..');
    }
    async projectPledgeExists(ctx, pledgeId) {
        const buffer = await ctx.stub.getState(pledgeId);
        return (!!buffer && buffer.length > 0);
    }
    async createProjectPledge(ctx, aidOrg, pledgeNumber, name, description, fundsRequired) {
        const pledgeId = aidOrg + ':' + pledgeNumber;
        const exists = await this.projectPledgeExists(ctx, pledgeId);
        if (exists) {
            throw new Error(`The project pledge ${pledgeId} already exists`);
        }
        // create an instance of the project pledge
        let pledge = new projectpledge_1.ProjectPledge();
        pledge.pledgeNumber = pledgeNumber;
        pledge.aidOrg = aidOrg;
        pledge.name = name;
        pledge.description = description;
        pledge.fundsRequired = fundsRequired;
        pledge.status = ppState.INITIALSTATE;
        const buffer = Buffer.from(JSON.stringify(pledge));
        await ctx.stub.putState(pledgeId, buffer);
    }
    async readProjectPledge(ctx, pledgeId) {
        const exists = await this.projectPledgeExists(ctx, pledgeId);
        if (!exists) {
            throw new Error(`The project pledge ${pledgeId} does not exists`);
        }
        const buffer = await ctx.stub.getState(pledgeId);
        const pledge = JSON.parse(buffer.toString());
        return pledge;
    }
    async sendPledgeToGlobalCitizen(ctx, pledgeId) {
        // obtaining the MSP ID from the caller identity to determine which participant the user belongs to
        const orgMSPID = ctx.clientIdentity.getMSPID();
        //Obtain project pledge from the worldstate
        await this.readProjectPledge(ctx, pledgeId).then(pledge => {
            console.log(`Resolved project pledge ${pledgeId} from world state. Ready to update`);
            if ((pledge.status === ppState.INITIALSTATE) && (orgMSPID === AIDORG)) {
                pledge.status = ppState.GLOBALCITIZENREVIEW;
                const buffer = Buffer.from(JSON.stringify(pledge));
                ctx.stub.putState(pledgeId, buffer);
            }
            else {
                throw new Error('The project pledge cannot move to GLOBALCITIZENREVIEW state. Check current owner and state.');
            }
        });
        console.log(`Updated project pledge ${pledgeId} to state GLOBALCITIZENREVIEW`);
    }
    async sendPledgeToGovOrg(ctx, pledgeId) {
        // obtaining the MSP ID from the caller identity to determine which participant the user belongs to
        const orgMSPID = ctx.clientIdentity.getMSPID();
        //Obtain project pledge from the worldstate
        await this.readProjectPledge(ctx, pledgeId).then(pledge => {
            console.log(`Resolved project pledge ${pledgeId} from world state. Ready to update`);
            if ((pledge.status === ppState.GLOBALCITIZENREVIEW) && (orgMSPID === CITIZENORG)) {
                pledge.status = ppState.GOVORGREVIEW;
                const buffer = Buffer.from(JSON.stringify(pledge));
                ctx.stub.putState(pledgeId, buffer);
            }
            else {
                throw new Error('The project pledge cannot move to GOVORGREVIEW state. Check current owner and state.');
            }
        });
        console.log(`Updated project pledge ${pledgeId} to state GOVORGREVIEW`);
    }
    async updatePledge(ctx, pledgeId, fundingType, approvedFunding, fundsPerInstallment) {
        // obtaining the MSP ID from the caller identity to determine which participant the user belongs to
        const orgMSPID = ctx.clientIdentity.getMSPID();
        //Obtain project pledge from the worldstate
        await this.readProjectPledge(ctx, pledgeId).then(pledge => {
            console.log(`Resolved project pledge ${pledgeId} from world state. Ready to update`);
            if ((pledge.status === ppState.GOVORGREVIEW) && (orgMSPID === GOVORG)) {
                // Updating project pledge with funding details
                let daysToAdd = 0;
                let fund = new funding_1.Funding();
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
            }
            else {
                throw new Error('The project pledge cannot move to PROPOSALFUNDED state. Check current owner and state.');
            }
        });
        console.log(`Updated project pledge ${pledgeId} with approved funding details and set state to PROPOSALFUNDED`);
    }
    async transferFunds(ctx, pledgeId) {
        // obtaining the MSP ID from the caller identity to determine which participant the user belongs to
        const orgMSPID = ctx.clientIdentity.getMSPID();
        //Obtain project pledge from the worldstate
        await this.readProjectPledge(ctx, pledgeId)
            .then(pledge => {
            console.log(`Resolved project pledge ${pledgeId} from world state. Ready to transfer funds`);
            if ((pledge.status === ppState.PROPOSALFUNDED) && (orgMSPID === GOVORG)) {
                pledge.funds.totalFundsReceived += pledge.funds.fundsPerInstallment;
                const buffer = Buffer.from(JSON.stringify(pledge));
                ctx.stub.putState(pledgeId, buffer);
            }
            else {
                throw new Error('Unable to increment totals funds received.');
            }
        });
        console.log(`Incremented total funds received for project pledge ${pledgeId}`);
    }
};
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], MyProjectPledgeContract.prototype, "init", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], MyProjectPledgeContract.prototype, "projectPledgeExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, Number]),
    __metadata("design:returntype", Promise)
], MyProjectPledgeContract.prototype, "createProjectPledge", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('ProjectPledge'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], MyProjectPledgeContract.prototype, "readProjectPledge", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], MyProjectPledgeContract.prototype, "sendPledgeToGlobalCitizen", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], MyProjectPledgeContract.prototype, "sendPledgeToGovOrg", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], MyProjectPledgeContract.prototype, "updatePledge", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], MyProjectPledgeContract.prototype, "transferFunds", null);
MyProjectPledgeContract = __decorate([
    fabric_contract_api_1.Info({ title: 'MyProjectPledgeContract', description: 'Smart Contract for global citizen code pattern' })
], MyProjectPledgeContract);
exports.MyProjectPledgeContract = MyProjectPledgeContract;
//# sourceMappingURL=my-projectpledge-contract.js.map