import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaFormularioComponent } from './ventana-formulario.component';

describe('VentanaFormularioComponent', () => {
  let component: VentanaFormularioComponent;
  let fixture: ComponentFixture<VentanaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
