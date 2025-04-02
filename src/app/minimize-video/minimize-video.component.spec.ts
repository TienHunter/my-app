import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimizeVideoComponent } from './minimize-video.component';

describe('MinimizeVideoComponent', () => {
  let component: MinimizeVideoComponent;
  let fixture: ComponentFixture<MinimizeVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimizeVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimizeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
