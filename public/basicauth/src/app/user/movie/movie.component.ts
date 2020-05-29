import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  dataSource: any;
  constructor(private movieService:MovieService){

  }
  ngOnInit() {
    this.movieService.getmovies().subscribe(res=>{
      this.dataSource = Object(res).result.movies;
    })
  }

  edit(i){

  }
  deleten(i){
    
  }
}
