# Create-React-Extension [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/VasilyShelkov/create-react-extension/blob/master/CONTRIBUTING.md)

Create React browser extensions with no build configuration.

This is a fork of [create-react-app](https://github.com/facebook/create-react-app) to make creating Browser Extensions in React more accessible and following
[Create-React-App's(CRA) philosophy](https://github.com/facebook/create-react-app#philosophy), especially **convention over configuration**.

## Features

- [x] [Same CRA Developer Experience](https://github.com/facebook/create-react-app#whats-included) for your browser extension projects (~~service worker functionality~~)
- [x] [Webpack dev server](https://github.com/webpack/webpack-dev-server) hot reloads extension on changes (NOTE: contentScript hot reloading not supported)
- [x] [Supports any combination of background, content, options and popup chrome extensions](#only-1-new-convention)
- [x] [Automated fork watcher](https://github.com/wei/pull) to stay updated with the original CRA
- [ ] Add support for [automated deployments](https://github.com/LinusU/wext-shipit) and docs to help users with what to do after having built their extension.
- [ ] Add e2e test suite similar to the [original CRA](https://github.com/facebook/create-react-app/tree/master/test) and run with automated pipeline.
- [ ] Add some kind of dependency watcher (e.g. [greenkeeper](https://greenkeeper.io/)) to stay up to date with the dependencies that are not managed by CRA

see [Create a browser extension](#creating-a-browser-extension) for a more in depth start guide
see [CRA user guide](https://facebook.github.io/create-react-app/) for more information on different configurations and functionality available.

If something doesn’t work, please [file an issue](https://github.com/VasilyShelkov/create-react-extension/issues/new).

## Quick Overview

```sh
npx create-react-app my-browser-extension --scripts-version react-browser-extension-scripts --template browser-extension
cd my-browser-extension
npm start
```

If you've previously installed `create-react-app` globally via `npm install -g create-react-app`, we recommend you uninstall the package using `npm uninstall -g create-react-app` to ensure that npx always uses the latest version.

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

Then open Chrome, and unpack the newly created `/dev` folder to see your extension added locally to your browser.<br>
When you’re ready to ship your extension, create an optimized build with `npm run build`.

<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/facebook/create-react-app@27b42ac7efa018f2541153ab30d63180f5fa39e0/screencast.svg' width='600' alt='npm start'>
</p>

## What do I need to know to start building my extension ?

It follows mostly the [same conventions as CRA](https://github.com/facebook/create-react-app#get-started-immediately).

### Only 1 new convention

There are [different types of chrome extensions](https://developer.chrome.com/extensions/getstarted) which can be any combination of:

- [Popup UI](https://developer.chrome.com/extensions/user_interface#popup) which renders your `index.js` when you click on your extension in the browser extension icon.
- [Background script](https://developer.chrome.com/extensions/background_pages) which will run in the background from `/background/index.js` and can be use for things like [state-management](https://github.com/tshaddix/webext-redux).
- [Content script](https://developer.chrome.com/extensions/content_scripts) from `/contentScript/index.js` which will run on configured web pages
- [Options UI](https://developer.chrome.com/extensions/options) which renders your `/options/` when you click on your extension in the browser extension icon.
- [Dev tools page](https://developer.chrome.com/extensions/devtools) :negative_squared_cross_mark: Does not support yet

These are all controlled by the all important [`/public/manifest.json`](https://github.com/VasilyShelkov/create-react-extension/blob/master/packages/react-scripts/template/public/manifest.json) which is [configurable](https://developer.chrome.com/extensions/manifest) by you to control what kind of extension you want build.

**Do not delete any of the entry files, this is a convention to remind you what your extensions could be. The build will notify you and fail if you remove any of these important files.**

## Creating a Browser Extension

**You’ll need to have Node 10.16.0 or later version on your local development machine** (but it’s not required on the server). We recommend using the latest LTS version. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

To create a new browser extension, you may choose one of the following methods:

### npx

```sh
npx create-react-app my-browser-extension --scripts-version react-browser-extension-scripts --template browser-extension
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

### npm

```sh
npm init react-app my-browser-extension --scripts-version react-browser-extension-scripts --template browser-extension
```

_`npm init <initializer>` is available in npm 6+_

### Yarn

```sh
yarn create react-app my-browser-extension --scripts-version react-browser-extension-scripts --template browser-extension
```

_[`yarn create <starter-kit-package>`](https://yarnpkg.com/lang/en/docs/cli/create/) is available in Yarn 0.25+_

It will create a directory called `my-browser-extension` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-browser-extension
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── img
│   │   ├── icon-16.png
│   │   ├── icon-48.png
│   │   ├── icon-128.png
│   ├── popup.html
│   ├── options.html
│   └── manifest.json
└── src
    ├── background
    │   ├── index.js
    ├── contentScripts
    │   ├── index.js
    ├── options
    │   ├── index.js
    │   ├── Options.js
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
```

No configuration or complicated folder structures, only the files you need to build your extension.<br>
Once the installation is done, you can open your project folder:

```sh
cd my-browser-extension
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the browser extension in development mode. You will see a `/dev` folder has been created in your project with the extension.<br>

To view the extension in your browser, [open up chrome and unpack extension](https://developer.chrome.com/extensions/getstarted#manifest).

The extension will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/marionebl/create-react-app@9f6282671c54f0874afd37a72f6689727b562498/screencast-error.svg' width='600' alt='Build errors'>
</p>

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

## User Guide

You can find detailed instructions on using Create React App and many tips in [its documentation](https://facebook.github.io/create-react-app/).

## How to Update to New Versions?

Please refer to the [User Guide](https://facebook.github.io/create-react-app/docs/updating-to-new-releases) for this and other information.

## Philosophy

- **One Dependency:** There is only one build dependency. It uses webpack, Babel, ESLint, and other amazing projects, but provides a cohesive curated experience on top of them.

- **No Configuration Required:** You don't need to configure anything. A reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.

- **No Lock-In:** You can “eject” to a custom setup at any time. Run a single command, and all the configuration and build dependencies will be moved directly into your project, so you can pick up right where you left off.

## What’s Included?

Your environment will have everything you need to build a modern single-page React app:

- React, JSX, ES6, TypeScript and Flow syntax support.
- Language extras beyond ES6 like the object spread operator.
- Autoprefixed CSS, so you don’t need `-webkit-` or other prefixes.
- A fast interactive unit test runner with built-in support for coverage reporting.
- A live development server that warns about common mistakes.
- A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.
- An offline-first [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) and a [web app manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/), meeting all the [Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app) criteria. (_Note: Using the service worker is opt-in as of `react-scripts@2.0.0` and higher_)
- Hassle-free updates for the above tools with a single dependency.

Check out [this guide](https://github.com/nitishdayal/cra_closer_look) for an overview of how these tools fit together.

The tradeoff is that **these tools are preconfigured to work in a specific way**. If your project needs more customization, you can ["eject"](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject) and customize it, but then you will need to maintain this configuration.

## Check out [this awesome browser extensions list](https://github.com/fregante/Awesome-WebExtensions) for more great packages to help you create a great web extension

## Contributing

We'd love to have your helping hand on `create-react-extension`! See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## Acknowledgements

We are grateful to everyone who has been a part of the following existing related projects for their ideas and collaboration:

- [Create-React-App](https://github.com/facebook/create-react-app)
- [How to Fork CRA Post](https://codeburst.io/customizing-create-react-app-done-right-4a22683f2e09) to help me create this successfully
- [React-chrome-extension-boilerplate](https://github.com/jhen0409/react-chrome-extension-boilerplate) and [create-chrome-extension](https://github.com/schovi/create-chrome-extension), both of unfortunately don't look like they're actively supported, but have been inspiration and shown an appetite for building extensions in the community.
- I have no doubt this will grow as the project grows.

## License

Create React Extension is open source software [licensed as MIT](https://github.com/VasilyShelkov/create-react-extension/blob/master/LICENSE).
