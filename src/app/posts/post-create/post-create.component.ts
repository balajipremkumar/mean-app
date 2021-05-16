import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  isLoading =  true;
  private mode = "create";
  private postId :string;
  

  constructor(public postService:PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:any)=> {
        if(paramMap.has("postId")){
          this.mode = 'edit';
          this.postId = paramMap.get("postId");
           this.isLoading = true;
            this.postService.getPost(this.postId).subscribe(postData => {
            this.isLoading = false;
            this.post = {id: postData._id, title: postData.title ,content: postData.content}
          });
        } else{
          this.mode = 'create';
          this.postId = null;
        }
    });
  }

  onSavePost(form:NgForm) {
    if(form.invalid){
      return;
    } if (this.mode === "create") {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
       this.postService.updatePost(
         this.postId,
         form.value.title, 
         form.value.content
         );
    }
    form.resetForm(); 
  }

}
