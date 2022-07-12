import {Information} from "./information";

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    information?: Information;
}
