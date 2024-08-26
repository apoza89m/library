# Readizonia

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

npm new readizonia

ng add @angular/material

ng g m shared
ng g m shared/material

npm install --save @angular/material @angular/cdk
npm install --save @angular/animations

//Some components (mat-slide-toggle, mat-slider, matTooltip) rely on HammerJS for gestures. In order to get the full feature-set of these components, HammerJS must be loaded into the application.
npm install --save hammerjs

css - @import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
//<link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">

_------_

Routes:
ng g m modules/usuario --routing
ng g m modules/libreria --routing

Interfaces:
ng g i interfaces/Libro
ng g i interfaces/Autor

Services:
ng g s services/libreriaManagement

Tabla:
ng g c shared/tablaGenerica

Pipe:
ng g p shared/pipes/addPunto

Directives:
ng g d shared/directives/convierteInput
ng g d shared/directives/decoraEtiqueta

Guards:
ng g g guards/auth

Components:
ng g c modules/usuario/login
ng g c modules/libreria/libro
ng g c modules/libreria/expositor
ng g c modules/libreria/creacion
ng g c modules/libreria/edicion

ng build
