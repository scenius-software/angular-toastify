![npm](https://img.shields.io/npm/dm/angular-toastify.svg?label=%E2%8F%ACdownloads&style=for-the-badge)
![npm](https://img.shields.io/npm/v/angular-toastify.svg?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/angular-toastify.svg?label=%F0%9F%93%9Clicense&style=for-the-badge)


# Angular Toastify
A somewhat minimalistic clone of [React Toastify](https://github.com/fkhadra/react-toastify).

This project was build on Angular version 12.0.5

[Demo!](https://scenius-software.github.io/angular-toastify/)

## Typical setup and usage

Import package:

``` npm i angular-toastify``` 

Add to app.module.ts:

```

import { ToastService, AngularToastifyModule } from 'angular-toastify'; 

@NgModule({
  declarations: [...],
  imports: [
    ...
    AngularToastifyModule,
    ...
  ],
  providers: [ToastService],
  bootstrap: [...]
})
export class AppModule { }

```

Add to any component within visible layout:
```
<lib-toastify-toast-container></lib-toastify-toast-container>
```

Toast container options (optional)

```
<lib-toastify-toast-container 
[position]="'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'"  (default: 'top-right')
[transition]="'bounce' | 'slide' | 'zoom' | 'flip'" (default: 'bounce)
[autoClose]="time in ms (0 = disabled)" (default: 5000)
[autoCloseSuccess]="time in ms (0 = disabled)" (default: undefined)
[autoCloseInfo]="time in ms (0 = disabled)" (default: undefined)
[autoCloseWarn]="time in ms (0 = disabled)" (default: undefined)
[autoCloseError]="time in ms (0 = disabled)" (default: undefined)
[hideProgressBar]="true | false"  (default: false)
[newestOnTop]="true | false"  (default: false)
[closeOnClick]="true | false" (default: true)
[pauseOnHover]="true | false" (default: true)
[pauseOnVisibilityChange]="true | false"  (default:  true)
[iconLibrary]="'material' | 'font-awesome' | 'none';"  (default: 'none')

></lib-toastify-toast-container>
```

Add to component or service:
```
 constructor(private _toastService: ToastService) { }

 addInfoToast() {
    this._toastService.info('message');
 }
```

# Changelog

##### 1.0.7

- Added auto close overrides per toast type. See [!57](https://github.com/scenius-software/angular-toastify/pull/53). Credits go to [@MaxvandenHout](https://github.com/MaxvandenHout) for implementing this feature.

##### 1.0.6

- Add Ivy support

##### 1.0.5

- Added a new property `preventDuplicates` on the Toastify Container. When set to true, toasts with identical texts will no longer create duplicates,
  but should instead increase the time the already present toast will be on visible on the screen. Credits go to [@JoranLive](https://github.com/JoranLive) for implementing this feature.

##### 1.0.4

- Module no longer imports `BrowserModule`. Angular Toastify can now be used in submodules.
- Updated to Angular 12

##### 1.0.2

- Run toast outside Angular so they do not delay Protractor tests.

