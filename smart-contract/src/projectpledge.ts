/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';
import { Funding } from './funding';

@Object()
export class ProjectPledge {

    /**
     *
     */
    @Property()
    pledgeNumber: string;

    /**
     *
     */
    @Property()
    name: string;

    /**
     *
     */
    @Property()
    description?: string;

    /**
     *
     */
    @Property()
    fundsRequired: number;

    /**
     *
     */
    @Property()
    status: string;

    /**
     *
     */
    @Property()
    aidOrg: string;

    /**
     *
     */
    @Property()
    funds?: Funding;
}
