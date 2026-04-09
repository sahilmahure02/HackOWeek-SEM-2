import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { getPostById } from '../lib/storage';
import { ArrowLeft, Calendar, MapPin, User } from 'lucide-react';

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (id) {
      const p = getPostById(id);
      if (p) setPost(p);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-96 w-full">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 text-gray-900 hover:bg-white transition-colors shadow-md backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </div>
        </div>

        <div className="p-8 sm:p-12">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 border-b pb-8">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
              {new Date(post.date).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
              {post.location}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-indigo-500" />
              {post.author}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed space-y-6">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
