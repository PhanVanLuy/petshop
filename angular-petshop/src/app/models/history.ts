import {HistoryType} from "../constants/history-type";

export interface History {
    id: string;
    type: HistoryType;
    timestamp: string;
}
