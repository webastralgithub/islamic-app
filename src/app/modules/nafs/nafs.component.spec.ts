import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NafsComponent } from './nafs.component';

describe('NafsComponent', () => {
  let component: NafsComponent;
  let fixture: ComponentFixture<NafsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NafsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NafsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
