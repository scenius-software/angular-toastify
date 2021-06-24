import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import { AngularToastifyModule } from '../../../../../angular-toastify/src/lib/angular-toastify.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    TestcomponentComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TestcomponentComponent
      }
    ]),
    CommonModule,
    SharedModule,
    AngularToastifyModule
  ]
})
export class TestmoduleModule { }
