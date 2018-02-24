import {Injectable} from '@angular/core';

declare var jquery: any;
declare var $: any;

function _window(): any {
  // return the native window obj
  return window;
}

@Injectable()
export class WindowRef {
  prevent = false;

  scrollSubscribe() {
    _window().addEventListener('scroll', this.scroll, true);
    _window().addEventListener('mousewheel', this.wheel, true);

  }

  scrollUnsubscribe() {
    _window().removeEventListener('scroll', this.scroll, true);
    _window().removeEventListener('mousewheel', this.wheel, true);
  }

  wheel(e) {
    console.log(`${e}`);
  }


  scroll(e) {
    const page = parseInt((_window().scrollY / _window().innerHeight) + '', 10);
    console.log(`page ${page}`);
  }

  get nativeWindow(): any {
    return _window();
  }

}
