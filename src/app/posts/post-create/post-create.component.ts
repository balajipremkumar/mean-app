import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post:Post;
  isLoading =  false;
  form:FormGroup;
  private mode = "create";
  private postId :string;
  

  constructor(public postService:PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null,{ validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null,{validators: [Validators.required]})
    })
    this.route.paramMap.subscribe((paramMap:any)=> {
        if(paramMap.has("postId")){
          this.mode = 'edit';
          this.postId = paramMap.get("postId");
           this.isLoading = true;
            this.postService.getPost(this.postId).subscribe(postData => {
            this.isLoading = false;
            this.post = {
              id: postData._id, 
              title: postData.title,
              content: postData.content
            };
            this.form.setValue({
              'title': this.post.title,
              'content': this.post.content
            });
          });
        } else{
          this.mode = 'create';
          this.postId = null;
        }
    });
  }

  onSavePost() {
    if(this.form.invalid){
      return;
    } if (this.mode === "create") {
      this.postService.addPost(this.form.value.title, this.form.value.content);
    } else {
       this.postService.updatePost(
         this.postId,
         this.form.value.title, 
         this.form.value.content
         );
    }
    this.form.reset(); 
  }

}
