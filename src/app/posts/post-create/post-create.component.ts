import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postService:PostsService) { }

  ngOnInit(): void {
  }

  onAddPost(form:NgForm){
    debugger
    if(form.invalid){
      return;
    }
    this.postService.addPost(form.value.title,form.value.content);
    form.resetForm();
  }

}
