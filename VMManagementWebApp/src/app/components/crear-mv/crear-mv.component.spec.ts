import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMvComponent } from './crear-mv.component';

describe('CrearMvComponent', () => {
  let component: CrearMvComponent;
  let fixture: ComponentFixture<CrearMvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearMvComponent]
    });
    fixture = TestBed.createComponent(CrearMvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
