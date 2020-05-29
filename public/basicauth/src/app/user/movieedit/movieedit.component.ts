import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movieedit',
  templateUrl: './movieedit.component.html',
  styleUrls: ['./movieedit.component.css']
})
export class MovieeditComponent implements OnInit {
  form: FormGroup;
  movie_posternew:any='';
  params: Params;
  movie_id:any;
  fileToUpload: File = null;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private movieService:MovieService,
    private cd: ChangeDetectorRef
  ) {
  }
  async ngOnInit() {
    this.form = this.fb.group({
      movie_name: ['', Validators.required],
      movie_description:['', Validators.required]
    });
    this.route.queryParams.subscribe((params: Params) => {
       this.params = params;
      // console.log('App params', params);
      const id = params['id'];
      // console.log('id', id);
      this.movie_id = id;
      this.editpage(id);
    });
  }
  editpage(i) {
    this.movieService.editmovieentry(i).subscribe(
      res => {
        console.log(res);
        this.form.patchValue({movie_name:Object(res).result.movies.movie_name});
        this.form.patchValue({movie_description:Object(res).result.movies.movie_description});
        this.movie_posternew=Object(res).result.movies.images;
        this.movie_id = Object(res).result.movies.id;
      },
      err => {
        this.router.navigate(['user/movielist']);
      }
  );
  }
  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileToUpload= event.target.files[0];
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.form.patchValue({
          movie_poster: event.target.files
        });
        
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }
  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const data = new FormData();
        data.append('movie_name', this.form.get('movie_name').value);
        data.append('movie_description', this.form.get('movie_description').value);
        data.append('movie_poster', this.fileToUpload);
        
        // const movie_name = this.form.get('movie_name').value;
        // const movie_poster = this.form.get('movie_poster').value;
        // const movie_description = this.form.get('movie_description').value;
        // const data = {
        //   movie_name:movie_name,
        //   movie_poster:movie_poster,
        //   movie_description:movie_description
        // };
        await this.movieService.editmovie(data,this.movie_id).subscribe(
          res => {
            this.router.navigate(['user/movielist']);
          },
          err => {
            this.router.navigate(['user']);
          }
      );
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}