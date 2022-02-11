import { AssignedMeeting } from './assigned-meeting';




export class ChangeAssignedMeetingsEvent {
    /**
     *
     */
    constructor(public assignedMeetings: AssignedMeeting[], public deassignedMeetings: AssignedMeeting[]) {
    }

}
