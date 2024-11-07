import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProximosLibrosPage } from './proximos-libros.page';

describe('ProximosLibrosPage', () => {
  let component: ProximosLibrosPage;
  let fixture: ComponentFixture<ProximosLibrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximosLibrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
