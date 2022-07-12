import {Option} from './option';

export interface Attribute {
    title: string;
    value: string;
    id: string;
    options: Option[];
}
