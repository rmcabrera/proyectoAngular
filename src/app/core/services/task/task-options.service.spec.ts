import { TestBed } from '@angular/core/testing';
import { TaskOptionsService } from './task-options.service';
import { PriorityOption } from '../../models/priority-option.model';
import { StatusOption } from '../../models/status-option.model';
import { CategoryOption } from '../../models/category-option.model';

describe('TaskOptionsService', () => {
  let service: TaskOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskOptionsService]
    });
    service = TestBed.inject(TaskOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return priority options', () => {
    const options: PriorityOption[] = service.getPriorityOptions();
    expect(options.length).toBe(3);
    expect(options[0].label).toBe('Alta');
  });

  it('should return status options', () => {
    const options: StatusOption[] = service.getStatusOptions();
    expect(options.length).toBe(3);
    expect(options[0].label).toBe('Pendiente');
  });

  it('should return category options', () => {
    const options: CategoryOption[] = service.getCategoriaOptions();
    expect(options.length).toBe(7);
    expect(options[0].label).toBe('Personales');
  });
});
