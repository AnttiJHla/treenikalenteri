import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreenipaivaComponent } from './create-treenipaiva.component';

describe('CreateTreenipaivaComponent', () => {
  let component: CreateTreenipaivaComponent;
  let fixture: ComponentFixture<CreateTreenipaivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTreenipaivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTreenipaivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
