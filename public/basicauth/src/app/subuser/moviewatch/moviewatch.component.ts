import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/user/movie.service';

@Component({
  selector: 'app-moviewatch',
  templateUrl: './moviewatch.component.html',
  styleUrls: ['./moviewatch.component.css']
})
export class MoviewatchComponent implements OnInit {
  movies:any;
  
  constructor(private moviesService:MovieService) { }

  ngOnInit(): void {
    this.moviesService.getusermovies().subscribe(res=>{
      this.movies =  Object(res).result.movies;
    })
  }
/**
      {moviename:"",movieurl:"https://material.angular.io/assets/img/examples/shiba2.jpg",moviedes:""},
      {moviename:"",movieurl:"https://material.angular.io/assets/img/examples/shiba2.jpg",moviedes:""} */
}
