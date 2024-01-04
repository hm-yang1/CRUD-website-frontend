export type User = {
    username: string;
    password: string;
    created_at: Date;
}
  
export type LoginRequest = {
    username: string;
    password: string;
}
  
export type RegisterRequest = {
    username: string;
    password: string;
}

export type Post = {
    postid: number;
    username: string;
    tags: string[];
    title: string;
    description: string;
    upvote: number;
    datetime: Date; 
}
  
export type PostRequest = {
    username: string;
    tags: string[];
    title: string;
    description: string;
}

export type Comment = {
    commentid: number;
    postid: number;
    username: string;
    description: string;
    upvote: number;
    datetime: Date; 
}
  
export type CommentRequest = {
    postid: number;
    username: string;
    description: string;
}

export type Upvote = {
    postid: number;
    commentid: number;
    username: number;
    datetime: Date;
}

export type UpvoteRequest = {
    postid: number;
    commentid: number;
    username: string;
}

export type Tag = {
    tagid: number;
    name: string;
}