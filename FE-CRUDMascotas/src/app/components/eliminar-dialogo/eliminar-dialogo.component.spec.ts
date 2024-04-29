import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarDialogoComponent } from './eliminar-dialogo.component';

describe('EliminarDialogoComponent', () => {
  let component: EliminarDialogoComponent;
  let fixture: ComponentFixture<EliminarDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarDialogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
