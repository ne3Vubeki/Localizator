import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuppyMenuComponent } from './quppy-menu.component';

describe('QuppyMenuComponent', () => {
  let component: QuppyMenuComponent;
  let fixture: ComponentFixture<QuppyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuppyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuppyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
