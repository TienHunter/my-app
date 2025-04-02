import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVideoComponent } from './popup-video.component';

describe('PopupVideoComponent', () => {
  let component: PopupVideoComponent;
  let fixture: ComponentFixture<PopupVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
