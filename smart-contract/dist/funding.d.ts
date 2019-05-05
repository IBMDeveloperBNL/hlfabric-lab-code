export declare class Funding {
    /**
     *
     */
    fundingType: 'WEEKLY' | 'MONTHLY' | 'SEMIANNUALY' | 'ANNUALY';
    /**
     *
     */
    nextFundingDueInDays: number;
    /**
     *
     */
    approvedFunding: number;
    /**
     *
     */
    totalFundsReceived: number;
    /**
     *
     */
    fundsPerInstallment: number;
    /**
     *
     */
    govOrgId: string;
}
