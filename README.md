# OC|CS Angular Essentials Workshop

We will be building a dashboard to track The Grid's most prominent hackers!

![app](https://raw.githubusercontent.com/victormejia/fluent-angular-testing-workshop/master/screenshots/app-screenshot.png)

## 0. Setup
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

## 1. TypeScript Intro

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

## 2. Your First Component

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

## 3. Built-in Directives & Event/Property Bindings

<details>
  <summary>Details</summary>

 Angular has very useful built-in directives. Let's explore them.

 **`*ngIf`**

Conditionally render a component/element.

 ```html
 <span class="loader" *ngIf="loading"></span>
 ```

 **`*ngFor`**

 Render a collection.

```html
<ul>
  <li *ngFor="let contact of contacts">{{contact.name}}</li>
</ul>
```

**`*ngClass`**
Dynamically set and change the CSS classes.

```html
<span class="pulse" [ngClass]="color"></span>
```

```html
<button [ngClass]="{bordered: isBordered}">Submit</button>
```

### Property Bindings

In Angular, you bind properties using `[]`. For instance:

```html
<div [style.background-color]="color"> Uses fixed `color` background</div>
```

### Event Bindings

You bind DOM events using `()`:

```html
<button (click)="validate()">Validate</button>
```

</details>

## 4. Component Inputs

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

## 5. Component Output

<details>
  <summary>Details</summary>

In Angular we use parenthesis `()` to specify action bindings. For instance, if you want to listen for the `click` event on a button, you can do as follows:

```html
<button (click)="handleClick($event)">Submit</button>
```

No `ng-click` or `ngClick` here, just pure DOM API. You bind DOM properties with `[]`, and events with `()`. Simple! The `$event` naming is a convention used, and you have to give it that special name to get the actual event object.

You can defined specific output actions for your components. We will be now defining a search component. It will listen for changes on a search term, and emit and event with that search term. We can start defining its usage as follows:

```html
<app-hacker-search (newSearch)="filterData($event)"><app-hacker-search>
```

`termChange` is an output from this component, and when triggered, it will call the `filterData` method on the parent component The `HackerSearch` component can emit any kind of data.

Start by generating a new component:

```bash
ng g c hacker-search
```

Add some markup and some styles:

```html
<div class="ui icon input">
  <input type="text" placeholder="Search..." />
</div>
```

```css
.input {
  width: 300px;

  input {
    font-family: "Titillium Web", sans-serif;
  }
}
```

And you can use this component in the `HackerList` component to make sure things are rendered fine:

```html
<app-hacker-search></app-hacker-search>
```

In the new component, you will need to import the `Output` and `EventEmitter` tokens:

```js
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
```

Next, we can define an emitter on this component:

```js
@Output() newSearch = new EventEmitter<string>();
```

We first need to start listening for `keyup` events from the input element, and we can call a method on the component itself:

```html
<input type="text" placeholder="Search..." (keyup)="handleChange($event)">
```

The `$event` naming is a convention used, and you have to give it that special name to get the actual event object. `handleChange` should be a method on the `HackerSearch` component. In this method, we don't do any filtering of any sort. The only thing we should is output a new event, using the component's custom emitter:

```js
handleChange(event) {
  this.newSearch.emit(event.target.value);
}
```

**Exercise**:
  * listen for the `newSearch` event, which should call a method on the `HackerList` component
  * filter the `this.hackers` list based on the term (search hacker name and status)

Reference Commit: https://github.com/victormejia/occs-angular-workshop/commit/86b497e75cb57936583f3ba63b9944d6914181f5

</details>

## 6. Services and Http

<details>
  <summary>Details</summary>

Angular v4 introduced an awesome new `HttpClient`, which has better typing, and also provides a way to intercept requests and responses in a middleware fashion.

When working with http in Angular, be sure to import the `HttpClientModule` from `@angular/common/http`, and include it in the `imports` of the `NgModule`.

```diff
  // app.module.ts

  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
+ import { HttpClientModule } from '@angular/common/http';
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { HeaderComponent } from './header/header.component';
  import { HackerListComponent } from './hacker-list/hacker-list.component';
  import { HackerComponent } from './hacker/hacker.component';
  import { HackerSearchComponent } from './hacker-search/hacker-search.component';

  @NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      HackerListComponent,
      HackerComponent,
      HackerSearchComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
+     HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
```

We will go ahead and create a `HackerService` where we can house all the calls to interface with our API. Let's place shared services in the `core/services` folder.

```bash
ng generate service core/services/hacker
```

You'll see an error: `WARNING Service is generated but not provided, it must be provided to be used`. This means you have to import it in `app.module.ts` and provide it to your app's module.

```diff
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { HttpClientModule } from '@angular/common/http';
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { HeaderComponent } from './header/header.component';
  import { HackerListComponent } from './hacker-list/hacker-list.component';
  import { HackerComponent } from './hacker/hacker.component';
  import { HackerSearchComponent } from './hacker-search/hacker-search.component';
+ import { HackerService } from './core/services/hacker.service';

  @NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      HackerListComponent,
      HackerComponent,
      HackerSearchComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
    ],
+   providers: [HackerService],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
```

In this service, we will inject the `HttpClient`, so we import it and inject it in the constructor. Remember, by giving it the `private` or `public` modifier, TypeScript will automatically assign it as a property on the service instance. The `@Injectable()` decorator allows this service to have injected dependencies.

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HackerService {

  constructor(private http: HttpClient) { }

  getHackers() {
    return this.http.get(`/api/hackers`);
  }
}
```

Inside the `getHackers` method, we can return the result of calling `get` on the `http` client, which returns an Observable (explained in a bit).

In your `HackerList` component, you can now import and inject the API service. In the `OnInit` hook, use the service to retrieve the data.

```js
import { Hacker } from '../core/hacker.model';
import { HackerService } from '../core/services/hacker.service';

...

export class HackerListComponent implements OnInit {

  hackers: Array<Hacker>;

  constructor(private api: HackerService) { }

  ngOnInit() {
    this.api.getHackers()
      .subscribe(data => {
        this.hackers = data;
      });
  }
}
```

In Angular, calls to the http methods actually return an Observable and not a Promise. You can think of an Observable as a stream of events, emitting values to anyone who has subscribed to it.

You might be getting the error below:

![error](https://d3vv6lp55qjaqc.cloudfront.net/items/1R1q002X2G2d1X1m0a0T/Screen%20Recording%202017-08-15%20at%2002.49%20PM.gif?X-CloudApp-Visitor-Id=2623626&v=0a21fa6f)

We need to tell the `HttpClient` what kind of data the response will be, in this case it will be an array of `Hacker`s. So we simply import `Hacker` and give it the type:

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hacker } from '../hacker.model';

@Injectable()
export class HackerService {

  constructor(private http: HttpClient) { }

  getHackers() {
    return this.http.get<Hacker[]>('/api/hackers');
  }

}
```

When our request finishes, the stream will emit the response body automatically. If we want the full response, we can tell `HttpClient` by specifying the `observe` option:

```js
getHackers() {
  return this.http.get(`/api/hackers`, { observe: 'response' });
}
```

### Error handling

Your UI should gracefully handle errors, and display data accordingly. To handle errors, add an error handler to your .subscribe() call:

```js
this.api.getHackers()
.subscribe(data => {
  this.hackers = data;
}, (err) => {
  console.log(err);
  this.hackers = [];
});
```
Manually trigger the error by changing the path to an invalid one.

### POST request

Sending data is easy. Simply provide the object you want to send, no need to `JSON.stringify`:

```js
this.http.post('/api/hackers', newHacker)
```

**Exercise**
 * Extend the `getHackers` method on the `HackerService` to take in a search term, and use that search term as the `q` query parameter. `json-server` supports full text search by using `?q=term`
 * Update the `filterData` method on the `HackerList` component to make a call to the updated `getHackers` method. You shouldn't need a duplicate list now, it should update the `hackers` list

 Reference commit: https://github.com/victormejia/occs-angular-workshop/commit/e00201d45fef23d1415839bbb71dddeff4a8be1b

### Intercepting requests

You can intercept requests and responses similar to how Express middleware works. The docs are great on this, check it out: https://angular.io/guide/http#intercepting-all-requests-or-responses
</details>

## 7. Directives

<details>
  <summary>Details</summary>

There are actually 3 kinds of directives in Angular:
  * Components (includes a template)
  * Structural (changing DOM layout, think `*ngIf`)
  * Attribute (changing behavior of element/component)

We've covered components, and now we will briefly cover attribute directives. You can read up on structural directives here: https://angular.io/guide/structural-directives

You want to create attribute directives when you want to add behavior to an element/component. Maybe you want to add keyboard actions to an element, or restrict user input on an input element.

The basic structure for a directive looks like this. It's a simple class decorated with the `@Directive`, and given a selector.

```js
import { Directive } from '@angular/core';

@Directive({
  selector: '[appTextOnly]'
})
export class TextOnlyDirective {

  constructor() { }

}
```

Its usage would then be:

```html
<input appTextOnly type="text" />
```

This would not enhance this basic input with some behavior. Most often in your directive you need access to the element that the directive is being applied on, and you can use `ElementRef` to do so.

```diff
-  import { Directive } from '@angular/core';
+  import { Directive, ElementRef } from '@angular/core';

    @Directive({
      selector: '[appTextOnly]'
    })
    export class TextOnlyDirective {

-     constructor() { }
+     constructor(el: ElementRef) { }

    }
```

The native HTML element is accessible via `this.el.nativeElement`.

### Responding to user events

It is also very useful to be able to react to user events. For instance, for the `app-text-only` directive we may want to react to `keydown` events. We can easily do this by using the `@HostListener` decorator on a method on the directive, and specify what we want the input to have:

```js
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextOnly]'
})
export class TextOnlyDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeydown(event) {

  }
}
```

Here `event` would be actual DOM event, so you have access to things like `event.key`, `event.target`, etc.

**Exercise**
 * Generate a new directive, and place it in `core/directives`: `ng generate directive core/directives/text-only`
 * Complete the `TextOnlyDirective` by inspecting `event.key` and checking if it's a number. If so, prevent the default behavior. You can use this regular expression: `const numberRegex = /[0-9]/;`
 * Make sure to include this directive in app module.
 * Use this directive to enhance the `HackerSearch` component so you can't type in numbers.

 Reference Commit: https://github.com/victormejia/occs-angular-workshop/commit/2241955d9fee6f6ef01441a52419723a92e9e566

</details>

## 8.Pipes

<details>
  <summary>Details</summary>

Pipes are used to transform data on the fly and display that in your HTML. Angular has a few built-in pipes, for example the date pipe. Right now the dates aren't displayed in a user-friendly format:

![date](https://d3vv6lp55qjaqc.cloudfront.net/items/3R2D1i1Z3C2Z222P2M0B/Screen%20Shot%202017-08-16%20at%2011.20.12%20AM.png?X-CloudApp-Visitor-Id=2623626&v=015956b8)

But we can easily fix that using the date pipe:

```html
<td>{{hacker.dob | date}}</td>
```

![date](https://d3vv6lp55qjaqc.cloudfront.net/items/2T1c2w152C3x2L2f1W0T/Screen%20Shot%202017-08-16%20at%2011.21.53%20AM.png?X-CloudApp-Visitor-Id=2623626&v=7142ae37)

Note that the `Date` and `Currency` pipes won't work on Safari and older browsers, so you need a polyfill:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
```

Say we don't want to download a polyfill, and we want to create our own pipe. The template for a pipe is fairly simple:

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate'
})
export class ShortDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
```

We want to use our pipe as follows:

```html
<td>{{hacker.dob | shortDate}}</td>
```

There are no args, just a value, which in this case will be the data. We can implement our own:

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate'
})
export class ShortDatePipe implements PipeTransform {

  transform(isoDateString: string): string {
    const date = new Date(isoDateString);

    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const hour = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const monthDisplay = month < 10 ? '0' + month : month;
    const dayDisplay = day < 10 ? '0' + day : day;

    return `${monthDisplay}/${dayDisplay}/${year}, ${this.getTimeDisplay(hour, minutes)}`;
  }

  getTimeDisplay(hour: number, minute: number) {
    const h = hour % 12;
    const hourDisplay = h < 10 ? '0' + h : h;
    const minuteDisplay = minute < 10 ? '0' + minute : minute;
    const dayPeriod = hour < 12 ? 'am' : 'pm';

    return `${hourDisplay}:${minuteDisplay}${dayPeriod}`;
  }

}
```

And now we have a custom date pipe:

![date](https://d3vv6lp55qjaqc.cloudfront.net/items/0u1Q252Q2i213k3q1d0H/Screen%20Shot%202017-08-16%20at%2011.26.56%20AM.png?X-CloudApp-Visitor-Id=2623626&v=dc6331ce)

Reference commit: https://github.com/victormejia/occs-angular-workshop/commit/ed0c8a95f8fa0776a1d113100eddba5f6eb24dca

</details>

## 9. Unit Testing

<details>
  <summary>Details</summary>

Unit testing Angular apps is a pretty awesome and vast topic. I'm going to actually just point you to my other resource [here](https://github.com/victormejia/angular-testing-workshop), a workshop I gave at [Fluent Conf 2017](https://conferences.oreilly.com/fluent/fl-ca/public/schedule/speaker/197177).

During the workshop we'll spend some time going over this. We will be testing 2 things:
  * `HackerComponent`, testing component inputs and template
  * `HackerService`, testing async actions

By default, running `npm test` (which runs `ng test`) gives you output like this:

![test output](https://d3vv6lp55qjaqc.cloudfront.net/items/2L0y0g3v3u2J0t113Y35/Screen%20Shot%202017-08-16%20at%203.50.59%20PM.png?X-CloudApp-Visitor-Id=2623626&v=f7833e59)

Not very useful output, so let's change that.
  * install `karma-spec-reporter`
  * add `require('karma-spec-reporter')` to the karma plugins
  * change reporters to `reporters: ['spec', 'kjhtml']`
  * change browsers to `browsers: ['ChromeCanaryHeadless']`

Output should be much better now:

![output](https://d3vv6lp55qjaqc.cloudfront.net/items/3Z3L1R393X03330C1U3g/Screen%20Shot%202017-08-16%20at%203.53.56%20PM.png?X-CloudApp-Visitor-Id=2623626&v=0bcaf34c)

Reference commit for `HackerComponent`: https://github.com/victormejia/occs-angular-workshop/commit/eafe27c210056b1d09b7b72a7342cbe04d89bf44

Reference commit for `HackerService`: https://github.com/victormejia/occs-angular-workshop/commit/22a0efef24ce329a542241f81b84b4a99a1b4fa8

</details>

## 10. Redux with ngrx

<details>
  <summary>Details</summary>
  TBD
</details>