import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { PostServices } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postServices: PostServices) {}

  onAddPost(form: NgForm){
    if (form.invalid)
    return;

    this.postServices.addPost(form.value.title, form.value.content); 
    form.resetForm();
  }  
}

