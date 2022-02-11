import { Injectable } from '@angular/core';
import { TimeRange } from './model/time-range';
import { TimerangeMode } from './model/timerange-mode';

@Injectable({
    providedIn: 'root'
})
export class TimerangeService {
    next(mode: TimerangeMode, currentStartDate: Date): TimeRange {
        if (mode === TimerangeMode.monthly) {
            const month = currentStartDate.getMonth() + 1;
            const year = currentStartDate.getFullYear();
            return this.buildTimeRangeForMonth(month, year);

        } else {
            throw new Error('weekly time range is not supported yet.')
        }
    }

    previous(mode: TimerangeMode, currentStartDate: Date): TimeRange {
        if (mode === TimerangeMode.monthly) {
            const month = currentStartDate.getMonth() - 1;
            const year = currentStartDate.getFullYear();

            return this.buildTimeRangeForMonth(month, year);
        } else {
            throw new Error('weekly time range is not supported yet.')
        }
    }
    
    private buildTimeRangeForMonth(month: number, year:number) {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
        const description = startDate.toLocaleString('default', { month: 'long' });
        return new TimeRange(startDate, endDate, description);
    }

    public getTimeRange(mode: TimerangeMode, dateInRange: Date) {
        if (mode === TimerangeMode.monthly) {
            return this.buildTimeRangeForMonth(dateInRange.getMonth(), dateInRange.getFullYear());
        } else {
            throw new Error('weekly time range is not supported yet.')
        }
    }

    constructor() { }

}
