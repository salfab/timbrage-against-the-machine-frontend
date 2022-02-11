

    export interface CalendarEvent {
        objectId: string;
        startTime: Date;
        endTime: Date;
        lastModifiedTime: Date;
        eventTimeZone: string;
        utcOffset: number;
        eventType: string;
        subject: string;
        isOnlineMeeting: boolean;
        organizerName: string;
        organizerAddress: string;
        categories: any[];
        isResponseRequested: boolean;
        attendees: any[];
        isReminderSet: boolean;
        showAs: string;
        attachments: any[];
        conflictingMeetings: any[];
        isOrganizer: boolean;
        isAppointment: boolean;
        iCalUID: string;
        cleanGlobalObjectId: string;
        doNotForward: boolean;
        joinOnlineMeetingUrl: string;
        location: string;
        myResponseType: string;
        onlineMeetingConferenceId: string;
        onlineMeetingTollNumber: string;
        skypeTeamsData: string;
        skypeTeamsMeetingUrl: string;
        schedulingServiceUpdateUrl: string;
        isCancelled?: boolean;
        isPrivate?: boolean;
        teamsVtcTenantId: string;
        clientOptimisticEventId: string;
    }


