/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Funding {
    /**
     *
     */
    @Property()
    fundingType: 'WEEKLY' | 'MONTHLY' | 'SEMIANNUALY' | 'ANNUALY';
  
    /**
     *
     */
    @Property()
    nextFundingDueInDays: number;

    /**
     *
     */
    @Property()
    approvedFunding: number;

    /**
     *
     */
    @Property()
    totalFundsReceived: number;

    /**
     *
     */
    @Property()
    fundsPerInstallment: number;
  
    /**
     *
     */
    @Property()
    govOrgId: string;
}
