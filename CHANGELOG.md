# Changelog

##### 2.0.0

- ⚠️ Breaking: Re-scoped all Angular Toastify CSS classed by prefixing them with `angular-toastify-`. This should prevent other CSS frameworks from interfering with Angular Toastify its styling. This may fix [#17](https://github.com/scenius-software/angular-toastify/issues/17) and [#48](https://github.com/scenius-software/angular-toastify/issues/48)
- Removed optional dependency on Angular Material icons and/or font-awesome icons. Icons are now included as SVGs instead.

##### 1.0.8

- Changed handling of large toast bodies. This should address [#54](https://github.com/scenius-software/angular-toastify/issues/54).

##### 1.0.7

- Added auto close overrides per toast type. See [!57](https://github.com/scenius-software/angular-toastify/pull/53). Credits go to [@MaxvandenHout](https://github.com/MaxvandenHout) for implementing this feature.

##### 1.0.6

- Add Ivy support

##### 1.0.5

- Added a new property `preventDuplicates` on the Toastify Container. When set to true, toasts with identical texts will no longer create duplicates (duplicates are reset). Credits go to [@JoranLive](https://github.com/JoranLive) for implementing this feature.

##### 1.0.4

- Module no longer imports `BrowserModule`. Angular Toastify can now be used in submodules.
- Updated to Angular 12

##### 1.0.2

- Run toast outside Angular so they do not delay Protractor tests.
