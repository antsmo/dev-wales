# Dev Wales

> A community-led website featuring a collection of resources for developers in Wales.

* [About this project]()
* [Getting started]()
* [Tech stack]()
* [Contributor guidelines]()

## About this project

Dev Wales is all about empowering the community by centralising useful information and resources.

We're building tools to help developers discover:

* Local meetups
* Tech companies
* Event speakers
* Job listings

The project is open source and we encourage members of the community to get involved and contribute where they can.

## Getting started

Clone the repository and run `npm install` to install the dependencies.

To start the server, run `npm start` and then visit `localhost:3000`.

## Tech stack

The application is a [Node.js Express](https://expressjs.com/) web server that renders static HTML templates.

Data is stored in an [Airtable](https://airtable.com/) database and cached locally by the application for 30 minutes. Once the cache has expired it won't refresh until a web page is requested.

HTML templates use the [Handlebars](https://handlebarsjs.com/) templating engine and live in the `/views` directory.

## Contributor guidelines

1. Fork it (https://github.com/dev-wales/dev-wales/fork)
2. Create your feature branch (git checkout -b feature/fooBar)
3. Commit your changes (git commit -m 'Add some fooBar')
4. Push to the branch (git push origin feature/fooBar)
5. Create a new Pull Request