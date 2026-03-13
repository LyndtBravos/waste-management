import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteRecords } from './waste-records';

describe('WasteRecords', () => {
  let component: WasteRecords;
  let fixture: ComponentFixture<WasteRecords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasteRecords],
    }).compileComponents();

    fixture = TestBed.createComponent(WasteRecords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
