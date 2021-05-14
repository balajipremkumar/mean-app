import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  private postsSub:Subscription

  constructor(public postsService:PostsService) { }

  ngOnInit(): void {
    this.postsService.getPost();
    this.postsSub = this.postsService.getPostUpdateListner()
    .subscribe((posts:Post[])=>{
       this.posts = posts
    });
  }

  onDelete(postId:string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}
