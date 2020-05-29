import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviewatchComponent } from './moviewatch.component';

describe('MoviewatchComponent', () => {
  let component: MoviewatchComponent;
  let fixture: ComponentFixture<MoviewatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviewatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviewatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
