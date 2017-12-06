import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeniKkComponent } from './treeni-kk.component';

describe('TreeniKkComponent', () => {
  let component: TreeniKkComponent;
  let fixture: ComponentFixture<TreeniKkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeniKkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeniKkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
