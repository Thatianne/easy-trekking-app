import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, startWith, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'easy-trekking-app';

  constructor(
    private readonly _window: Window,
    private readonly _renderer: Renderer2,
    @Inject(DOCUMENT) private readonly _document: Document
  ) {}

  ngOnInit(): void {
    this._setWindowHeight();
  }

  private _setWindowHeight(): void {
    fromEvent(this._window, 'resize')
      .pipe(
        startWith(null),
        map(() => `${this._window.innerHeight}px`)
      )
      .subscribe(windowHeight => {
        this._renderer.setProperty(this._document.body, 'style', `--window-height: ${windowHeight};`);
      })
  }
}
