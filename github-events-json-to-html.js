Date.prototype.isToday = function () {
    var today = new Date();

    return today.getYear() == this.getYear() &&
        today.getMonth() == this.getMonth() &&
        today.getDate() == this.getDate();
};

Date.prototype.isThisYear = function () {
    return (new Date().getYear()) == this.getYear();
};

Date.prototype.getMonthInWords = function () {
    return ["Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"][this.getMonth()];
};

Date.prototype.prettyPrint = function () {
    if (this.isToday()) {
        return "today " + get2DigitsZeroPadded(this.getHours()) + ":" + get2DigitsZeroPadded(this.getMinutes());
    } else if (this.isThisYear()) {
        return this.getMonthInWords() +
            " " + this.getDate();
    } else {
        return this.getYear() +
            " " + this.getMonthInWords() +
            " " + get2DigitsZeroPadded(this.getDate());
    }

    function get2DigitsZeroPadded(input) {
        return (""+input).length < 2 ? "0" + input : input; 
    }
};

var GithubEventsJSONToHTML = (function () {
    return {
        parse: function (events) {
            if (typeof marked == "undefined") {
                var marked = function(string) {
                    return string;
                }
            }

            var markUp = "";

            markUp += "<div class='github-public-activity'>";

            markUp += "<h2 class='heading'>";

            markUp += events[0].actor.login + "'s public activity";

            markUp += "</h2>";

            for (var index in events) {
                var event = events[index];

                markUp += "<div class='event'>";

                markUp += "<img src='" + event.actor.avatar_url + "' width='34px'>";

                markUp += "<div class='event-info-container'>";
                
                markUp += "<div class='event-info'>";

                markUp += "<a href='https://github.com/" + event.actor.login + "' target='_new'>" + event.actor.login + "</a>";
                
                switch (event.type) {
                case "PushEvent":
                    markUp += " commited to <a href='https://github.com/" + event.repo.name + "' target='_new'>" + event.repo.name + "</a>";
                    break;
                case "CreateEvent":
                    markUp += " created <a href='https://github.com/" + event.repo.name + "' target='_new'>" + event.repo.name + "</a>";
                    break;
                case "WatchEvent":
                    markUp += " started watching <a href='https://github.com/" + event.repo.name + "' target='_new'>" + event.repo.name + "</a>";
                    break;
                case "PullRequestEvent":
                    markUp += " " + event.payload.action + " a pull request for <a href='https://github.com/" + event.repo.name + "' target='_new'>" + event.repo.name + "</a>";
                    break;
                case "ForkEvent":
                    markUp += " forked <a href='https://github.com/" + event.repo.name + "' target='_new'>" + event.repo.name + "</a>";
                    break;
                case "IssuesEvent":
                    markUp += " " + event.payload.action + " an issue about <a href='https://github.com/" + event.repo.name + "' target='_new'>" + event.repo.name + "</a>";
                    break;
                case "GollumEvent":
                    markUp += event.payload.pages[0].action + " <a href='https://github.com/" + event.repo.name + "' target='_new'>" + event.repo.name + "</a>";
                    break;
                case "IssueCommentEvent":
                    markUp += " commented on <a href='https://github.com/" + event.repo.name + "' target='_new'>" + event.repo.name + "</a>";
                    break;
                }

                markUp += "</div>";

                markUp += "<div class='event-details'>";
                
                switch (event.type) {
                case "PushEvent":
                    markUp += marked(event.payload.commits[0].message) + " - " + new Date(event.created_at).prettyPrint();
                    break;
                case "CreateEvent":
                    markUp += marked(event.payload.description) + " - " + new Date(event.created_at).prettyPrint();
                    break;
                case "WatchEvent":
                    markUp += " Starred the repository - " + new Date(event.created_at).prettyPrint();
                    break;
                case "PullRequestEvent":
                    markUp += marked(event.payload.pull_request.body) + " - " + new Date(event.created_at).prettyPrint();
                    break;
                case "ForkEvent":
                    markUp += " Forked the repository - " + new Date(event.created_at).prettyPrint();
                    break;
                case "IssuesEvent":
                    markUp += marked(event.payload.issue.body) + " - " + new Date(event.created_at).prettyPrint();
                    break;
                case "GollumEvent":
                    markUp += event.payload.pages[0].action + " - " + new Date(event.created_at).prettyPrint();
                    break;
                case "IssueCommentEvent":
                    markUp += marked(event.payload.comment.body) + " - " + new Date(event.created_at).prettyPrint();
                    break;
                }
                
                markUp += "</div>";

                markUp += "</div>";

                markUp += "</div>";
            };

            return markUp;
        }
    };
})();
