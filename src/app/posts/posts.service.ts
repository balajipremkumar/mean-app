import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

import{Post} from './post.model'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  
  constructor(private http:HttpClient) { }

  getPost(){
     this.http.get<{ message:string, posts:any }>('http://localhost:3000/api/posts')
     .pipe(map((postData)=> {
        return postData.posts.map(post =>{
          return {
            title: post.title,
            content: post.content,
            id:post._id
          }
        })
     }))
     .subscribe((transformedPosts)=> {
       this.posts =  transformedPosts;
       this.postUpdated.next([...this.posts]);
     });
  }

  getPostUpdateListner(){
    return this.postUpdated.asObservable();
  }

  addPost(title:string,content:string){
    console.log("addpost called ")
    const post:Post = {id:null, title:title, content:content};
    this.http.post<{message:string}>("http://localhost:3000/api/posts", post)
    .subscribe((responseData)=> {
       console.log(responseData.message);
       this.posts.push(post);
       this.postUpdated.next([...this.posts]);
    })
    
  }

  deletePost(postId:string){
     this.http.delete("http://localhost:3000/api/posts/" + postId)
     .subscribe(()=>{
       console.log("Deleted");
     })
  }
}
