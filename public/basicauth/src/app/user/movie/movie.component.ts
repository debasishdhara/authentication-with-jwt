import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  dataSource: any;
  constructor(private movieService:MovieService,private router:Router){

  }
  ngOnInit() {
    this.onlo();
  }
  onlo(){
    this.movieService.getmovies().subscribe(res=>{
      this.dataSource = Object(res).result.movies;
    })
  }

  edit(i){
      this.router.navigate(['user/movieedit'], { queryParams: { id: i } });
  }
  deleten(i){
    this.movieService.deletemovie(i).subscribe(res=>{
      this.onlo();
      this.router.navigate(['user/movielist']);
    })
  }
  add(){
    this.router.navigate(['user/moviecreate']);
  }
}
