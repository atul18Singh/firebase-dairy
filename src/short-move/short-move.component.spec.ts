import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortMoveComponent } from './short-move.component';

describe('ShortMoveComponent', () => {
  let component: ShortMoveComponent;
  let fixture: ComponentFixture<ShortMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortMoveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShortMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
