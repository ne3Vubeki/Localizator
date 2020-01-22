import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuppySidebarComponent } from './quppy-menu.component';

describe('QuppyMenuComponent', () => {
  let component: QuppySidebarComponent;
  let fixture: ComponentFixture<QuppySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuppySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuppySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
