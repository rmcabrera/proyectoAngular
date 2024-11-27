import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskKanbanBoardComponent } from './task-kanban-board.component';

describe('TaskKanbanBoardComponent', () => {
  let component: TaskKanbanBoardComponent;
  let fixture: ComponentFixture<TaskKanbanBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskKanbanBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskKanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
