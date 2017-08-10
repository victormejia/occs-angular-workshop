# OC|CS Angular Essentials Workshop

We will be building a dashboard to track The Grid's most prominent hackers!

![app](https://raw.githubusercontent.com/victormejia/fluent-angular-testing-workshop/master/screenshots/app-screenshot.png)

## Setup
<details>
  <summary>Details</summary>

### 1. Please install the following on your machine:
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

### 2. Scaffold a new Angular project using the CLI

```bash
ng new occs-workshop --style=scss --routing
```

This adds support for Sass and enables routing.

### 3. Install the following project dependencies:

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

### 4. Configure json-server for a quick mock API

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

### 5. Add some quick styles:

  * Drop `<link href="https://fonts.googleapis.com/css?family=Titillium+Web" rel="stylesheet">` in your index.html
  * Add the following to `styles.scss`

```css
body {
  background-color: #f9f9f9 !important;
  font-size: 15px;
  font-family: 'Titillium Web', sans-serif !important;
}
```

### 6. Run it :boom:
Run `npm start`.

In your browser, `localhost:3000/api/hackers` should display the list of hackers:

![db](https://raw.githubusercontent.com/victormejia/occs-angular-workshop/setup/screenshots/db.png)

Your Angular app will be live at `localhost:4200`:

![app](https://raw.githubusercontent.com/victormejia/occs-angular-workshop/setup/screenshots/start.png)


Your changes should look like this: https://github.com/victormejia/occs-angular-workshop/commit/f62e54aa2ea924d8183687ef18290c81b78807bf
</details>

## TypeScript Intro

<details>
  <summary>Details</summary>

TypeScript is a typed superset of JavaScript. Your current JavaScript code will be understood by TS, and you can sprinkle in types as you'd like. JavaScript has types, but is dynamic and TS allows you to enforce typing at both dev and compile time.

Let's start with the built in types:

### `string`

```js
const name: string = 'Victor';
```

### `number`

```js
function add(x: number, y: number) {
  return x + y;
}
```

### `boolean`

```js
const married: boolean = true;
```

### `Array<T>` or `T[]`

```js
export class ProductListComponent {

  products: string[]

  constructor() {}
}
```

### `any`
You can declare a type to be of `any`:

```js
function clone(src: any) {
  ...
}
```

### `Object`
Or say it's an object:

```js
function clone(src: Object) {
  ...
}
```

## Beyond the basics

### you can specify that functions return a value

```js
function add(x, y): number {
  return x + y
}
```

### Property Initiliazers

Property initializers work out of the box in TS (current at stage-2), and they are used quite often in Angular.

```js
class ProductListComponent {
  products: string[] = ['A', 'B'];

  constructor() {
  }
}
```

### `public/private` modifier in constructor

Giving a modifier to a parameter automatically assigns that as a property on your instance:

```js
class ProductListComponent {
  products: string[] = ['A', 'B'];

  constructor(public http) {
  }

  methodA() {
    // you have access to this.http
  }
}
```

### Interfaces

Interfaces are a powerful way to describe your data. It enforces structure to your models without needlessly creating classes.

```js
interface Hacker {
  id: string;
  name: string;
  inDanger: boolean;
  email?: string;
  password?: string;
}

// the following would give an error because "password" is a required property and not optional
const hackerA: Hacker = {
  id: 1,
  name: 'Ron',
  inDanger: false,
}
```

### enums

```js
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
```

string enum types also supported, although in this case a plain object suffices:

```js
enum ActionType {
  AddUser = 'ADD_USER',
  DeleteUser = 'DELETE_USER',
  RenameUser = 'RENAME_USER',
}
```

vs.

```js
const ActionType = {
  AddUser: 'ADD_USER',
  DeleteUser: 'DELETE_USER',
  RenameUser: 'RENAME_USER'
}
```
</details>

## Your First Component

<details>
  <summary>Details</summary>

Let's generate the app's header component:

```bash
ng generate component header
```

This will automatically generate a component for you with selector `app-header`. Then we can add a property on this component:

```js
export class HeaderComponent implements OnInit {

  title = 'The Grid';

  constructor() { }

  ngOnInit() {
  }

}
```

The template is simple:

```html
<header id="particles">
  <h2>{{ title }}</h2>
</header>
```

and sprinkle some styles on `header.component.scss`

```css
header {
  height: 50px;
  background: #1A2129;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 1;

  h2 {
    color: #fff;
    margin: 0;
    padding: 10px;
    position: absolute;
    left: 10px;
  }
}
```

Finally, replace the boilerplate html in `app.component.html`

```html
<app-header></app-header>
<router-outler></router-outlet>
```

Lots going on here. In Angular you can (one-way) data bind properties using the `{{ title }}` syntax. Also, Angular gives you scoped-styled components out of the box!

![scoped styles](https://d3vv6lp55qjaqc.cloudfront.net/items/3V070b1W2p3H2M250A38/Screen%20Shot%202017-08-10%20at%2011.12.45%20AM.png?X-CloudApp-Visitor-Id=b09e9af6ac0bf9f72590951057fdf698&v=326ab08a)

This can be configured by changing the `ViewEncapsulation`:

![view encapsulation](https://d3vv6lp55qjaqc.cloudfront.net/items/0o381o3K1T2v261x1j1C/Screen%20Shot%202017-08-10%20at%2011.13.42%20AM.png?X-CloudApp-Visitor-Id=b09e9af6ac0bf9f72590951057fdf698&v=61ecb08a)

Reference Commit: https://github.com/victormejia/occs-angular-workshop/commit/4c9d640a65448b954656d9362028caf3ffe8c6dc
</details>
