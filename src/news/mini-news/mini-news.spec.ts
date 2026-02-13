import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniNews } from './mini-news';

describe('MiniNews', () => {
  let component: MiniNews;
  let fixture: ComponentFixture<MiniNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniNews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
