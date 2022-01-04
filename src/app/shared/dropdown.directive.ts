import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  isOpen: boolean = false

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen
    if(this.isOpen === true) {
      this.rendered.addClass(this.elRef.nativeElement.lastChild, 'show')
    }else {
      this.rendered.removeClass(this.elRef.nativeElement.lastChild, 'show')
    }

  }

  constructor(private elRef: ElementRef, private rendered: Renderer2) {}
}
