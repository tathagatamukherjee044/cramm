import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appLatex]',
  standalone: true
})
export class LatexDirective {

  @Input() appLatex!: string;

  constructor(
    private el: ElementRef
  ) { }

  // ngOnChanges() {
  //   if (this.appLatex) {
  //     katex.render(this.appLatex, this.el.nativeElement, {
  //       throwOnError: false,
  //       displayMode: true
  //     });
  //   }
  // }

}
