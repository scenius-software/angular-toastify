# Changelog

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
