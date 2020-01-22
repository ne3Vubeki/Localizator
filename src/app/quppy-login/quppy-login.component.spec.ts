import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuppyLoginComponent } from './quppy-tree.component';

describe('QuppyTreeComponent', () => {
  let component: QuppyLoginComponent;
  let fixture: ComponentFixture<QuppyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuppyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuppyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
