import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moviewatch',
  templateUrl: './moviewatch.component.html',
  styleUrls: ['./moviewatch.component.css']
})
export class MoviewatchComponent implements OnInit {
  movies:any;
  
  constructor() { }

  ngOnInit(): void {
    this.movies = [
      {moviename:"",movieurl:"https://material.angular.io/assets/img/examples/shiba2.jpg",moviedes:""},
      {moviename:"",movieurl:"https://material.angular.io/assets/img/examples/shiba2.jpg",moviedes:""}
    ]
  }

}
