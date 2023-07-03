import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[truncateText]'
})
export class TruncateDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement as HTMLElement;
    const maxChars = 200;

    const content = element.textContent;
    if (content && content.length > maxChars) {
      const truncatedText = content.slice(0, maxChars) + '...';
      element.textContent = truncatedText;
    }
  }
}
