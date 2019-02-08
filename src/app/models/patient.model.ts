import {Condition} from './condition.model';

export class Patient {
    id: number;
    mobilePhone?: string;
    firstName: string;
    lastName: string;
    streerAdress?: string;
    city: string;
    state: string;
    postalCode: string;
    conditions: Condition;
    status: string;
    risk: string;
}