import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTvComponent } from './edit-tv.component';

describe('EditTvComponent', () => {
  let component: EditTvComponent;
  let fixture: ComponentFixture<EditTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
