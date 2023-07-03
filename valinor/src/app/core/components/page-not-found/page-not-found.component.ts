import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="not-found">
      <img src="/assets/img/github_logo.png" alt="">
      <strong>404</strong>
      <span>Página não encontrada</span>
    </div>
  `,
  styles: [`
    .not-found {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .not-found img {
      width: 200px;
      margin-bottom: 20px;
    }

    .not-found span {
      text-align: center;
    }
  `]
})

export class PageNotFoundComponent {

  constructor() { }

}
