import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome-bar',
  templateUrl: './welcome-bar.component.html',
  styleUrls: ['./welcome-bar.component.css']
})
export class WelcomeBarComponent implements OnInit {

  @Input() page : string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
