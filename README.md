![npm](https://img.shields.io/npm/dm/angular-toastify.svg?label=%E2%8F%ACdownloads&style=for-the-badge)
![npm](https://img.shields.io/npm/v/angular-toastify.svg?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/angular-toastify.svg?label=%F0%9F%93%9Clicense&style=for-the-badge)


# Angular Toastify
A somewhat minimalistic clone of [React Toastify](https://github.com/fkhadra/react-toastify).

This project was build on Angular version 8.0.3.

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

