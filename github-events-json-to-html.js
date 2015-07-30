var GithubEventsJSONToHTML = {};

(function() {
    Date.prototype.isToday = function() {
        var today = new Date();

        return today.getYear() == this.getYear() && today.getMonth() == this.getMonth() && today.getDate() == this.getDate();
    };

    Date.prototype.isThisYear = function() {
        return new Date().getYear() == this.getYear();
    };

    Date.prototype.getMonthInWords = function() {
        return ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"][this.getMonth()];
    };

    Date.prototype.prettyPrint = function() {
        if (this.isToday())
            return "" + this.getHours() + ":" + this.getMinutes();
        else if (this.isThisYear())
            return "" + this.getMonthInWords() + " " + this.getDate();
        else
            return "" + this.getYear() + " " + this.getMonthInWords() + " " + this.getDate();
    };

    GithubEventsJSONToHTML.parse = function(events) {
        var markUp = "<div class='github-public-activity'>";

        markUp += "<div class='heading'>";
        markUp += events[0].actor.login + "'s public activity:";
        markUp += "</div>";

        for (var index in events) {
            var event = events[index];
            markUp += "<div class='event'>";

            markUp += "<img src='" + event.actor.avatar_url + "' width='34px'>";


            markUp += "<div class='event-info-container'>";
            
            markUp += "<div class='event-info'>";
            markUp += "<a href='" + event.actor.url + "'>" + event.actor.login + "</a>"
            switch(event.type) {
                case "PushEvent":
                    markUp += " commited to <a href='" + event.repo.url + "'>" + event.repo.name + "</a>";
                    break;

                case "CreateEvent":
                    markUp += " created <a href='" + event.repo.url + "'>" + event.repo.name + "</a>";
                    break;

                case "WatchEvent":
                    markUp += " wacthed <a href='" + event.repo.url + "'>" + event.repo.name + "</a>";
                    break;

                case "PullRequestEvent":
                    markUp += " opened a pull request for <a href='" + event.repo.url + "'>" + event.repo.name + "</a>";
                    break;

                case "ForkEvent":
                    markUp += " forked <a href='" + event.repo.url + "'>" + event.repo.name + "</a>";
                    break;

                case "IssuesEvent":
                    markUp += " raised an issue about <a href='" + event.repo.url + "'>" + event.repo.name + "</a>";
                    break;

                case "GollumEvent":
                    markUp += event.payload.pages[0].action + " <a href='" + event.repo.url + "'>" + event.repo.name + "</a>";
                    break;
            }
            markUp += "</div>";

            markUp += "<div class='event-details'>";
            switch(event.type) {
                case "PushEvent":
                    markUp += event.payload.commits[0].message + " - " + new Date(event.created_at).prettyPrint();
                    break;

                case "CreateEvent":
                    markUp += event.payload.description + " - " + new Date(event.created_at).prettyPrint();
                    break;

                case "WatchEvent":
                    markUp += " starred the repository - " + new Date(event.created_at).prettyPrint();
                    break;

                case "PullRequestEvent":
                    markUp += event.payload.pull_request.body + " - " + new Date(event.created_at).prettyPrint();
                    break;

                case "ForkEvent":
                    markUp += " forked the repository - " + new Date(event.created_at).prettyPrint();
                    break;

                case "IssuesEvent":
                    markUp += event.payload.issue.body + " - " + new Date(event.created_at).prettyPrint();
                    break;

                case "GollumEvent":
                    markUp += event.payload.pages[0].action + " - " + new Date(event.created_at).prettyPrint();
                    break;
            }
            markUp += "</div>";

            markUp += "</div>";

            markUp += "</div>";
        };

        return markUp;
    };   
})();