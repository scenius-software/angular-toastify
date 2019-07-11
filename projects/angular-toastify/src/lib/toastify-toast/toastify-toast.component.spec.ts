import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastifyToastComponent } from './toastify-toast.component';

describe('ToastifyToastComponent', () => {
  let component: ToastifyToastComponent;
  let fixture: ComponentFixture<ToastifyToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastifyToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastifyToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
