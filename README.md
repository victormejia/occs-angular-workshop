## OC|CS Angular Essentials Workshop

We will be building a dashboard to track The Grid's most prominent hackers!

![app](https://raw.githubusercontent.com/victormejia/fluent-angular-testing-workshop/master/screenshots/app-screenshot.png)

### Setup

#### 1. Please install the following on your machine:
  * Node 8.x
  * npm 5.x
  * Angular CLI: `npm install -g @angular/cli`
  * Latest Chrome
  * Latest Chrome Canary (Beta)
  * **highly** recommend downloading Visual Studio Code: https://code.visualstudio.com/
    * install the following extensions:
    * [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
    * [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
    * [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
    * [angular2-inline](https://marketplace.visualstudio.com/items?itemName=natewallace.angular2-inline)
    * [Sass](https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented)
    * [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)

#### 2. Scaffold a new Angular project using the CLI

```bash
ng new occs-workshop --style=scss --routing
```

This adds support for Sass and enables routing.

#### 3. Install the following project dependencies:

```bash
npm install semantic-ui-card semantic-ui-input semantic-ui-reset semantic-ui-table npm-run-all json-server faker @types/faker -S
```

Configure the CLI to bundle the Semantic UI dependencies by updating the `styles` in `.angular-cli.json`

```js
"styles": [
  "styles.scss",
  "../node_modules/semantic-ui-table/table.min.css",
  "../node_modules/semantic-ui-reset/reset.min.css",
  "../node_modules/semantic-ui-input/input.min.css",
  "../node_modules/semantic-ui-card/card.min.css"
]
```

#### 4. Configure json-server for a quick mock API

  * Grab `db.json` from this repo, and place it at the root of your project
  * Create a `proxy.conf.json` with the following contents:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

  * Create a `routes.json` with the following contents:

```json
{
  "/api/*": "/$1"
}
```

We have created a new API route `/api`, and the available route is `localhost:3000/api/hackers`. Since running `ng serve` spins up a webpack dev server, we run it with a proxy, so that that when we make a request to something like `localhost:4200/api/hackers`, it will route that to `localhost:3000/api/hackers`.

  * Configure the following `npm` scripts:

```json
"start": "run-p start:server start:client"
"start:client": "ng serve --proxy-config proxy.conf.json --open"
"start:server": "json-server --watch db.json --routes routes.json"
```

#### 5. Add some quick styles:

  * Drop `<link href="https://fonts.googleapis.com/css?family=Titillium+Web" rel="stylesheet">` in your index.html
  * Add the following to `styles.scss`

```css
body {
  background-color: #f9f9f9 !important;
  font-size: 15px;
  font-family: 'Titillium Web', sans-serif !important;
}
```

#### 6. Run it :boom:
Run `npm start`.

In your browser, `localhost:3000/api/hackers` should display the list of hackers:

![db](https://raw.githubusercontent.com/victormejia/occs-angular-workshop/setup/screenshots/db.png)

Your Angular app will be live at `localhost:4200`:

![app](https://raw.githubusercontent.com/victormejia/occs-angular-workshop/setup/screenshots/start.png)


Your changes should look like this: https://github.com/victormejia/occs-angular-workshop/commit/f62e54aa2ea924d8183687ef18290c81b78807bf