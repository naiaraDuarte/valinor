import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';
import { TruncateDirective } from './truncate-text.directive';

@Component({
  template: '<p truncateText>{{ text }}</p>'
})

class TestComponent {
  text!: string;
}

describe('TruncateTextDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let elementRef: ElementRef<HTMLElement>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TruncateDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    elementRef = fixture.debugElement.nativeElement.querySelector('p');
  });

  it('should not truncate text with less than maxChars', () => {
    const expectedText = 'Texto de exemplo';
    component.text = expectedText;
    fixture.detectChanges();
    
    const titleText = (fixture.debugElement.nativeElement.querySelector('p').innerText);
    expect(titleText).toBe(expectedText);
  });
});
