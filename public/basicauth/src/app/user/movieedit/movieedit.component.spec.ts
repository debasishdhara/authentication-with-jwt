import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieeditComponent } from './movieedit.component';

describe('MovieeditComponent', () => {
  let component: MovieeditComponent;
  let fixture: ComponentFixture<MovieeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
