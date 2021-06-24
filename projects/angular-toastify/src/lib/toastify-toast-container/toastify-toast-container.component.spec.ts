import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToastifyToastContainerComponent } from './toastify-toast-container.component';

describe('ToastifyToastContainerComponent', () => {
  let component: ToastifyToastContainerComponent;
  let fixture: ComponentFixture<ToastifyToastContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastifyToastContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastifyToastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
