import { Funding } from './funding';
export declare class ProjectPledge {
    /**
     *
     */
    pledgeNumber: string;
    /**
     *
     */
    name: string;
    /**
     *
     */
    description?: string;
    /**
     *
     */
    fundsRequired: number;
    /**
     *
     */
    status: string;
    /**
     *
     */
    aidOrg: string;
    /**
     *
     */
    funds?: Funding;
}
