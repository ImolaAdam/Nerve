import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-main-templates',
  templateUrl: './dashboard-main-templates.component.html',
  styleUrls: ['./dashboard-main-templates.component.scss']
})
export class DashboardMainTemplatesComponent implements OnInit {
  IMAGES = [
    {
      src: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      caption: 'It\'s a thing',
    },
    {
      src: 'https://picsum.photos/200',
      caption: 'This is a really long string to see how the text will overflow',
    },
    {
      src: 'https://picsum.photos/200',
      caption: 'It\'s a thing',
    },
    {
      src: 'https://picsum.photos/200',
      caption: 'It\'s a thing',
    },
    {
      src: 'https://picsum.photos/200',
      caption: 'It\'s a thing',
    },
    {
      src: 'https://picsum.photos/200',
      caption: 'It\'s a thing',
    }
    ];
  constructor() { }

  ngOnInit() {
  }

}
