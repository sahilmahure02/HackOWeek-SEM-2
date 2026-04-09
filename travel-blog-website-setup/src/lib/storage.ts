import { BlogPost } from '../types';

const STORAGE_KEY = 'travel_blog_posts';

const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Exploring the Alps',
    excerpt: 'A week long journey through the beautiful Swiss Alps.',
    content: 'The Swiss Alps are a mountain range in Switzerland. They are part of the Alps, which are the highest and most extensive mountain range system that lies entirely in Europe. The Swiss Alps are one of the most popular tourist destinations in Switzerland. They are known for their stunning scenery, including snow-capped peaks, glaciers, and alpine lakes.',
    author: 'Alex Traveler',
    date: '2023-10-15',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=2070',
    location: 'Switzerland',
  },
  {
    id: '2',
    title: 'Kyoto in Autumn',
    excerpt: 'Witnessing the red leaves in the ancient capital of Japan.',
    content: 'Kyoto is the capital city of Kyoto Prefecture in Japan. Located in the Kansai region on the island of Honshu, Kyoto forms a part of the Keihanshin metropolitan area along with Osaka and Kobe. Kyoto is known for its classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.',
    author: 'Sarah Jenkins',
    date: '2023-11-20',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2070',
    location: 'Japan',
  },
  {
    id: '3',
    title: 'Safari in Serengeti',
    excerpt: 'An unforgettable adventure in the heart of Africa.',
    content: 'The Serengeti ecosystem is a geographical region in Africa, spanning northern Tanzania. The protected area within the region includes approximately 30,000 km2 (12,000 sq mi) of land, including the Serengeti National Park and several game reserves. The Serengeti is well known for the largest annual animal migration in the world of over 1.5 million blue wildebeest and 250,000 zebra and for its numerous Nile crocodile and honey badger.',
    author: 'Mike Ross',
    date: '2024-01-05',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2068',
    location: 'Tanzania',
  },
];

export const getPosts = (): BlogPost[] => {
  const posts = localStorage.getItem(STORAGE_KEY);
  if (!posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
    return INITIAL_POSTS;
  }
  return JSON.parse(posts);
};

export const getPostById = (id: string): BlogPost | undefined => {
  const posts = getPosts();
  return posts.find((post) => post.id === id);
};

export const createPost = (post: Omit<BlogPost, 'id' | 'date'>): BlogPost => {
  const posts = getPosts();
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
  };
  const updatedPosts = [newPost, ...posts];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  return newPost;
};

export const updatePost = (updatedPost: BlogPost): void => {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === updatedPost.id);
  if (index !== -1) {
    posts[index] = updatedPost;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
};

export const deletePost = (id: string): void => {
  const posts = getPosts();
  const updatedPosts = posts.filter((post) => post.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
};
