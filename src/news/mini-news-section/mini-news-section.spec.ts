import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniNewsSection } from './mini-news-section';

describe('MiniNewsSection', () => {
  let component: MiniNewsSection;
  let fixture: ComponentFixture<MiniNewsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniNewsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniNewsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
