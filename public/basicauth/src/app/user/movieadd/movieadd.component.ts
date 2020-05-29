import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movieadd',
  templateUrl: './movieadd.component.html',
  styleUrls: ['./movieadd.component.css']
})
export class MovieaddComponent implements OnInit {
  form: FormGroup;
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
      movie_poster: ['', Validators.required],
      movie_description:['', Validators.required]
    });
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
        await this.movieService.newmovieentry(data).subscribe(
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