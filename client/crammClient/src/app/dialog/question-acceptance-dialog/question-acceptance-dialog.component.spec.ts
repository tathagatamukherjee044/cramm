import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAcceptanceDialogComponent } from './question-acceptance-dialog.component';

describe('QuestionAcceptanceDialogComponent', () => {
  let component: QuestionAcceptanceDialogComponent;
  let fixture: ComponentFixture<QuestionAcceptanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAcceptanceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAcceptanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
