import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularToastifyComponent } from './angular-toastify.component';

describe('AngularToastifyComponent', () => {
  let component: AngularToastifyComponent;
  let fixture: ComponentFixture<AngularToastifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularToastifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularToastifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
