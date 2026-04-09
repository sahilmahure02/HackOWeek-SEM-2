export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  location: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}
