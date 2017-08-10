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

## Component Inputs

<details>
  <summary>Details</summary>

Let's get to now generating a table of hackers. Start by generating a `hacker-list` component:

```bash
ng generate component hacker-list
```

We will also be configuring the Router. For the root route, we want to render this component, so in `app-routing.module.ts`, import this new component and change the router's config:

```js
import { HackerListComponent } from './hacker-list/hacker-list.component';

const routes: Routes = [
  {
    path: '',
    component: HackerListComponent
  }
];
```

Wrap the `router-outlet` so we can add some styling around it:

```html
<div class="app">
  <div class="content">
    <router-outlet></router-outlet>
  </div>
</div>
```

```css
.app {
  margin-top: 80px;

  .content {
    max-width: 900px;
    padding: 10px;
    margin: 20px auto;
  }
}
```

The `HackerList` component should have a property `hackers` of type `Array<Hacker>`:

```js
hackers: Array<Hacker>;
```

Create a `hacker.model.ts` in `app/core`, which will hold the interface to describe `Hacker` objects

```js
export interface Hacker {
  id: string;
  name: string;
  dob: string;
  address: string;
  cityStateZip: string;
  avatar: string;
  phone: string;
  statusMessage: string;
  status?: string;
  specialty: string;
  ip: string;
  email: string;
  password: string;
}
```

The `?` here tells it that the `status` property will be optional.

In your component, any data fetching/setting should be done in the `OnInit` lifecycle hook (the `ngOnInit` method). Assign the following objects to the the `hackers` property:

```js
{
  id: '0bf594d6-2d36-47de-af83-91c0c816a905',
  name: 'Ignacio',
  dob: '1956-12-07T15:30:00.333Z',
  address: '7269 Bradtke Coves',
  cityStateZip: 'West Cade, Tennessee 36631',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ninjad3m0/128.jpg',
  phone: '(367) 277-3869',
  statusMessage: 'We need to back up the digital SSL port!',
  specialty: 'calculating feed',
  ip: '173.68.118.11',
  email: 'Ignacio_Littel.Haag@gmail.com',
  password: 'kxHxzucqwmvV3y9'
},
{
  id: '70dd6f38-fd14-4dfd-bd43-3b07586ce49e',
  name: 'Price',
  dob: '1960-06-01T11:01:12.720Z',
  address: '85066 Ona Shores',
  cityStateZip: 'Cartwrightview, South Carolina 24722',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ashocka18/128.jpg',
  phone: '(775) 232-7260',
  statusMessage: 'Use the optical RAM pixel, then you can navigate the online protocol!',
  specialty: 'bypassing pixel',
  ip: '187.154.44.205',
  email: 'Price.Donnelly9_Thompson37@gmail.com',
  password: 'ttRXuJjmsm9NLdG',
  status: 'warning'
}
```

In the component's template, we can now render a table. In the table body, use the `*ngFor` directive to render a row for each hacker. For now, render empty `td` cells.

```html
<table class="ui selectable celled table">
  <thead>
    <tr>
      <th>Status</th>
      <th>Name</th>
      <th>Specialty</th>
      <th>Secret Address</th>
      <th class="phone">Phone</th>
      <th>DOB</th>
      <th>Last Message</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let hacker of hackers">
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
```

We could render all the necessary fields here, but let's take a step further a create a component to render the table cells for each hacker.

```bash
ng generate component hacker
```

This component needs an input to render its data. In Angular, inputs to components are denoted by square brackets `[]`:

```html
<app-contact [contact]="contactInfo"></app-contact>
```

Here, we are passing in the `contactInfo` object as the `contact` property on the component.

Update the template of the `Hacker` component to render the data:

```html
<td>{{hacker.status}}</td>
<td>{{hacker.name}}</td>
<td>{{hacker.specialty}}</td>
<td>{{hacker.address}} {{hacker.cityStateZip}}</td>
<td>{{hacker.phone}}</td>
<td>{{hacker.dob}}</td>
<td>{{hacker.statusMessage}}</td>
```

Let's now use this component in the `hacker-list` component:

```html
<tr app-hacker [hacker]="hacker" *ngFor="let hacker of hackers"></tr>`
```

We aren't using the component in the usual `<app-hacker></app-hacker>` way. The reason here is that there really isn't an easy way to replace the wrapper with its contents (think `replace` from Angular 1.x)

![hacker](https://d3vv6lp55qjaqc.cloudfront.net/items/1c0j1u2h3R3Y381k2P2X/%5Bf27e7b49b0038d2ed88665f6084cdad8%5D_Screen+Shot+2017-08-10+at+3.11.41+PM.png?X-CloudApp-Visitor-Id=b09e9af6ac0bf9f72590951057fdf698&v=47fd550a)

To over come this, we can still use the component, except we must update the selector:

```js
selector: '[app-hacker], // tslint:disable-line'
```

The current `tslint` configuration doesn't allow this, so we can suppres this error.

If you've installed the Angular Language Service extension, you'll see an error in your editor:

![error](https://d3vv6lp55qjaqc.cloudfront.net/items/1Y3m3V3i240h2Y0T3E0V/Screen%20Shot%202017-08-10%20at%202.58.54%20PM.png?X-CloudApp-Visitor-Id=b09e9af6ac0bf9f72590951057fdf698&v=f43f648d)

It's giving you a real-time hint, and if you try to run this you'll see this error in your console:

![error](https://d3vv6lp55qjaqc.cloudfront.net/items/021U1C2l1b3E331b1e3t/Screen%20Shot%202017-08-10%20at%203.00.58%20PM.png?X-CloudApp-Visitor-Id=b09e9af6ac0bf9f72590951057fdf698&v=0d0156f2)

We need to tell the component that it has inputs, and we do so by using the `@Input` decorator when declaring the `hacker` property on the `Hacker` component.

```js
@Input() hacker: Hacker;
```

Result:

![result](https://d3vv6lp55qjaqc.cloudfront.net/items/1N3v0I3U1R37160P0I3G/Screen%20Shot%202017-08-10%20at%203.37.10%20PM.png?X-CloudApp-Visitor-Id=b09e9af6ac0bf9f72590951057fdf698&v=9a223d82)

Reference commit: https://github.com/victormejia/occs-angular-workshop/commit/726b65b8c0459517ffbe57c4ea1eabbd0517bc47

</details>