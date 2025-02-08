import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalInfoDialogComponent } from './minimal-info-dialog.component';

describe('MinimalInfoDialogComponent', () => {
  let component: MinimalInfoDialogComponent;
  let fixture: ComponentFixture<MinimalInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalInfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinimalInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
