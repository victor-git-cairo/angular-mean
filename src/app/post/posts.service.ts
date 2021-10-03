import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs'  // EventEmitter
import { map } from 'rxjs/operators'

import { Post } from './post.model'

@Injectable({providedIn: 'root'})
export class PostServices {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>()

    constructor(private http: HttpClient) {}

    getPosts() {
      this.http
        .get<{message: string; posts:any}>(
          'http://localhost:3000/api/posts')
          .pipe(map((postData) => {
            return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id
              };
            });
          }))
        .subscribe((transformedData) => {
           this.posts = transformedData;
           this.postUpdated.next([...this.posts])  
        });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }
    
    addPost( title: string, content: string) {
      const post: Post = { id: "", title: title, content: content };
      this.http
      .post<{message: string}>('http://localhost:3000/api/post', post)

      .subscribe((response) => {
        console.log(response.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });     
    }
}