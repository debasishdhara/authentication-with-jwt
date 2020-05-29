import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieaddComponent } from './movieadd.component';

describe('MovieaddComponent', () => {
  let component: MovieaddComponent;
  let fixture: ComponentFixture<MovieaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
