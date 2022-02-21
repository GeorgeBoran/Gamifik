import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRankingsComponent } from './listar-rankings.component';

describe('ListarRankingsComponent', () => {
  let component: ListarRankingsComponent;
  let fixture: ComponentFixture<ListarRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRankingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
