import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoPageComponent } from './demo-page/demo-page.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        children: [ {
          path: '',
          component: DemoPageComponent
        },
        {
          path: 'submodule',
          loadChildren: () => import('./submodule-test/testmodule/testmodule.module').then(m => m.TestmoduleModule)
        }
        ]
      },
    ]),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
