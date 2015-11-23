# github-events-json-to-html

It converts the JSON about your events from GitHub API to HTML.

## Usage:

Hit `https://api.github.com/users/<YourUsername>/events/public` and pass the response `JSON` to
			
    htmlToBeAddedInDOM = GithubEventsJSONToHTML.parse(data);

and then append or bind it to your DOM.

If used with `marked.js`, it will convert markdown to markup.

Refer [example](example/scripts/example.js).

**Note:** It currently supports only 8 types of events, feel free to contribute.
