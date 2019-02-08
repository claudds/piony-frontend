import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogueComponent } from './edit-dialogue.component';

describe('EditDialogueComponent', () => {
  let component: EditDialogueComponent;
  let fixture: ComponentFixture<EditDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
