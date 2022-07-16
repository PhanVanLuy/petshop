import {HistoryType} from '../constants/history-type';

export class History {
    name: string;
    type: HistoryType;
    timestamp: string;

  constructor(type: HistoryType, name: string, timestamp: string) {
    this.name = name;
    this.type = type;
    this.timestamp = timestamp;
  }
}
