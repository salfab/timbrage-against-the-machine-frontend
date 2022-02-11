import { TimeRange } from './../model/time-range';
import { TimerangeService } from './../timerange.service';
import { TimerangeMode } from './../model/timerange-mode';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-timerange-selector',
    templateUrl: './timerange-selector.component.html',
    styleUrls: ['./timerange-selector.component.scss']
})
export class TimerangeSelectorComponent implements OnInit {
    
    @Input()
    public initialDate!: Date;

    @Input()
    public mode!: TimerangeMode;

    public startDate!: Date;

    public endDate!: Date;

    @Output()
    public timerangeChanged = new EventEmitter<TimeRange>();


    public description: string = '';

    constructor(private timeRangeService: TimerangeService) { }

    ngOnInit(): void {
        const timeRange = this.timeRangeService.getTimeRange(this.mode, this.initialDate);
        this.populateFromTimeRange(timeRange);
    }

    private populateFromTimeRange(timeRange: TimeRange) {
        this.startDate = timeRange.startDate;
        this.endDate = timeRange.endDate;
        this.description = timeRange.description;
    }

    public changeToNextRange() {
        const timeRange = this.timeRangeService.next(this.mode,this.startDate);
        this.populateFromTimeRange(timeRange);
        this.timerangeChanged.emit(timeRange);
    }

    public changeToPreviousRange() {
        const timeRange = this.timeRangeService.previous(this.mode,this.startDate);
        this.populateFromTimeRange(timeRange);
        this.timerangeChanged.emit(timeRange);
    }

}
