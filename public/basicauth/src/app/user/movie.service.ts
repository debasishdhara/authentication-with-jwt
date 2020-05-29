import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  

  constructor(private http:HttpClient) { }

  getmovies(){
    const userdetails = localStorage.getItem('currentUser');
    const userjson =JSON.parse(userdetails);
    const res =userjson?userjson.result.token_type:"";
    const resto =userjson?userjson.result.access_token:"";
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization':res+" "+resto
    }
    const headers = headerDict;
    return this.http.get(`${environment.apiUrl}api/movielist`,{headers}).pipe(map((res)=>{ return res;}));
  }

  getusermovies(){
    const userdetails = localStorage.getItem('currentUser');
    const userjson =JSON.parse(userdetails);
    const res =userjson?userjson.result.token_type:"";
    const resto =userjson?userjson.result.access_token:"";
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization':res+" "+resto
    }
    const headers = headerDict;
    return this.http.get(`${environment.apiUrl}api/movies`,{headers}).pipe(map((res)=>{ return res;}));
  }
  deletemovie(i){
    const userdetails = localStorage.getItem('currentUser');
    const userjson =JSON.parse(userdetails);
    const res =userjson?userjson.result.token_type:"";
    const resto =userjson?userjson.result.access_token:"";
    const headerDict = {
      'Accept': 'application/json',
      'Authorization':res+" "+resto
    }
    const headers = headerDict;
    return this.http.delete(`${environment.apiUrl}api/moviedelete/${i}`,{headers}).pipe(map((res)=>{ return res;}));
  }
  editmovie(data,i){
    const userdetails = localStorage.getItem('currentUser');
    const userjson =JSON.parse(userdetails);
    const res =userjson?userjson.result.token_type:"";
    const resto =userjson?userjson.result.access_token:"";
    const headerDict = {
      'Accept': 'application/json',
      'Authorization':res+" "+resto
    }
    const headers = headerDict;
    return this.http.post(`${environment.apiUrl}api/movieedit/${i}`,data,{headers}).pipe(map((res)=>{ return res;}));
  }
  newmovieentry(data){
    const userdetails = localStorage.getItem('currentUser');
    const userjson =JSON.parse(userdetails);
    const res =userjson?userjson.result.token_type:"";
    const resto =userjson?userjson.result.access_token:"";
    const headerDict = {
      'Accept': 'application/json',
      'Authorization':res+" "+resto
    }
    const headers = headerDict;
    return this.http.post(`${environment.apiUrl}api/moviecreate`,data,{headers}).pipe(map((res)=>{ return res;}));
  }

  editmovieentry(i: any) {
    const userdetails = localStorage.getItem('currentUser');
    const userjson =JSON.parse(userdetails);
    const res =userjson?userjson.result.token_type:"";
    const resto =userjson?userjson.result.access_token:"";
    const headerDict = {
      'Accept': 'application/json',
      'Authorization':res+" "+resto
    }
    const headers = headerDict;
    return this.http.get(`${environment.apiUrl}api/movieedit/${i}`,{headers}).pipe(map((res)=>{ return res;}));
  }
}
