import 'date-wizard';

declare module 'date-wizard' {
    interface DateDetails {
        hours: number;
        minutes: number;
        seconds: number;
    }

    function dateDetails(date: Date | string | number): DateDetails;

    function pad(s: number): string;
}

