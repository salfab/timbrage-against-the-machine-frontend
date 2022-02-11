export class Ticket {
    
    public jiraLink = '';
    // create constant somewhere
    private jiraBaseUrl = 'https://di.vaudoise.ch/secure/CreateWorklog!default.jspa?key=';

    private readonly regexp = new RegExp('(\\w+)-(\\d+)');

    constructor(public issueKey: string, public ignoreInTimeCalculation = false) {
        this.jiraLink = this.buildJiraLink();
    }

    private buildJiraLink(): string {
        // right now, issueKey can be polluted, so let's have a hack to extract the real key.
        // we'll clean it later: 
        //const matches = this.issueKey.match('(\w+)-(\d+)');
        const matches = this.regexp.exec(this.issueKey);
        if (matches === null) {
            return "";
        }
        return this.jiraBaseUrl + matches[0];
    } 
}