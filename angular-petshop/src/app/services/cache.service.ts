import {Injectable} from '@angular/core';
import * as _ from 'underscore';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    constructor() {
    }

    public get(key) {
        try {
            const data = localStorage.getItem(key);
            return !_.isEmpty(data) ? JSON.parse(data) : [];
        } catch (e) {
            localStorage.setItem(key, JSON.stringify([]));
            return [];
        }
    }

    public getSingle(key) {
        try {
            const data = localStorage.getItem(key);
            return !_.isEmpty(data) ? JSON.parse(data) : null;
        } catch (e) {
            localStorage.setItem(key, JSON.stringify(''));
            return null;
        }
    }

    public set(data, key) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    public reset() {
        localStorage.clear();
    }
}
