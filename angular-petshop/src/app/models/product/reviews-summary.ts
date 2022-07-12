import {ReviewShort} from './review-short';

export interface ReviewsSummary {
    average: number;
    count: number;
    fiveCount: number;
    fourCount: number;
    threeCount: number;
    twoCount: number;
    oneCount: number;
    reviews: ReviewShort[];
}
