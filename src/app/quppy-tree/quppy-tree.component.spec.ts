import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuppyTreeComponent } from './quppy-tree.component';

describe('QuppyTreeComponent', () => {
  let component: QuppyTreeComponent;
  let fixture: ComponentFixture<QuppyTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuppyTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuppyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
