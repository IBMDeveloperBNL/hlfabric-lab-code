import { Context, Contract } from 'fabric-contract-api';
import { ProjectPledge } from './projectpledge';
export declare class MyProjectPledgeContract extends Contract {
    init(ctx: Context): Promise<void>;
    projectPledgeExists(ctx: Context, pledgeId: string): Promise<boolean>;
    createProjectPledge(ctx: Context, aidOrg: string, pledgeNumber: string, name: string, description: string, fundsRequired: number): Promise<void>;
    readProjectPledge(ctx: Context, pledgeId: string): Promise<ProjectPledge>;
    sendPledgeToGlobalCitizen(ctx: Context, pledgeId: string): Promise<void>;
    sendPledgeToGovOrg(ctx: Context, pledgeId: string): Promise<void>;
    updatePledge(ctx: Context, pledgeId: string, fundingType: 'WEEKLY' | 'MONTHLY' | 'SEMIANNUALY' | 'ANNUALY', approvedFunding: number, fundsPerInstallment: number): Promise<void>;
    transferFunds(ctx: Context, pledgeId: string): Promise<void>;
}
