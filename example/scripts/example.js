$(document).ready(function () {
    var url = "https://api.github.com/users/tfKamran/events/public";
    
    $.get(url).done(function (data) {
        $("body").append(GithubEventsJSONToHTML.parse(data));
    });
});
