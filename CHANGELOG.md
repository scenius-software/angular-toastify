# Changelog

##### 1.0.5

- Added a new property `preventDuplicates` on the Toastify Container. When set to true, toasts with identical texts will no longer create duplicates,
  but should instead increase the time the already present toast will be on visible on the screen. Credits go to [@JoranLive](https://github.com/JoranLive) for implementing this feature.

##### 1.0.4

- Module no longer imports `BrowserModule`. Angular Toastify can now be used in submodules.
- Updated to Angular 12

##### 1.0.2

- Run toast outside Angular so they do not delay Protractor tests.
