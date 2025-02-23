import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.page.html',
    styleUrls: ['./main-layout.page.scss'],
    imports: [CommonModule, FormsModule]
})
export class MainLayoutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
