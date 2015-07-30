# github-events-json-to-html

It converts the JSON about your events on GitHub to HTML.

## Usage:

Hit `https://api.github.com/users/<YourUsername>/events/public` and pass the response `JSON` to
			
    htmlToBeAddedInDOM = GithubEventsJSONToHTML.parse(data);

and then append or bind it to your DOM.

**Note:** It currently supports only 7 types of events, feel free to contribute.