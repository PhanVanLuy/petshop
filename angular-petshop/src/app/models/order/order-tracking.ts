import {Information} from '../information';
import {BillingInformation} from './billing-information';
import {OrderItem} from './order-item';
import {Timestamps} from './timestamps';

export interface OrderTracking {
    id: string;
    status: string;
    refundRequest?: boolean;
    refundRequestTime?: any;
    timestamps: Timestamps;
    value: number;
    information: Information;
    billingInformation: BillingInformation;
    orderItems: OrderItem[];
}
