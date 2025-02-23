import { computed, Directive, effect, ElementRef, input } from '@angular/core';
import katex from 'katex';

@Directive({
  selector: '[latexString]',
  standalone: true
})
export class LatexDirective {

  latexString : any  = input({})

  constructor(
    private el: ElementRef
  ) { 
    effect(() => {
      this.renderLatex();
    });
  }

  private renderLatex() {
    const element = this.el.nativeElement;
  
    // Render LaTeX to a string and set it as the innerHTML
    if (this.latexString()) {
      try {
        const renderedLatex = katex.renderToString(this.latexString(), {
          throwOnError: false,
          displayMode: true
        });
        console.log(renderedLatex);
        
        element.innerHTML = renderedLatex;
      } catch (error) {
        console.error('Failed to render LaTeX:', error);
      }
    } else {
      element.innerHTML = ''; // Clear the content if no LaTeX string
    }
  }
  



}
