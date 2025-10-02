import { useState, useEffect, useOptimistic, useTransition } from 'react';
import { Container } from '$components/container';
import { Alert } from '$components/alert';
import { PostForm } from './components/post-form';
import { PostList } from './components/post-list';
import { createPost, removePost, listPosts } from '$/common/api';
import type { Id, OptimisticPost, Post, PostFormData } from './types';

// Using a fixed user ID for this demo
const CURRENT_USER_ID = 1;

function Application() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost: OptimisticPost) => {
      if (newPost.isPending) {
        console.log('Adding new post');
        return [newPost, ...state];
      }

      console.log('Removing optimistic post');
      return state.filter((post) => post.id !== newPost.id);
    },
  );

  // Fetch initial posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await listPosts({ _limit: 10 });
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts. Please try again.');
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (formData: PostFormData) => {
    startTransition(async () => {
      try {
        setError(null);

        const temporary: OptimisticPost = {
          id: crypto.randomUUID() as unknown as Id,
          title: formData.title,
          body: formData.body,
          userId: CURRENT_USER_ID as unknown as Id,
          isPending: true,
        };

        addOptimisticPost(temporary);

        // Call API and wait for response
        const newPost = await createPost({
          title: formData.title,
          body: formData.body,
          userId: CURRENT_USER_ID as unknown as import('$/common/api').Id,
        });

        // Add the new post to the beginning of the list
        setPosts((prev) => [newPost, ...prev]);

        // Remove the optimistic post
        addOptimisticPost({ ...temporary, isPending: false });
      } catch (err) {
        // Remove the optimistic post on error
        addOptimisticPost({ ...temporary, isPending: false });
        setError('Failed to create post. Please try again.');
        console.error('Error creating post:', err);
      }
    });
  };

  const handleDeletePost = async (id: number) => {
    try {
      setError(null);

      // Call API and wait for response
      await removePost(id);

      // Remove the post from the list
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError('Failed to delete post. Please try again.');
      console.error('Error deleting post:', err);
    }
  };

  return (
    <Container className="my-8 space-y-8">
      <section>
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          Anti-Social Network
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Create and delete posts. Try creating or deleting a post - notice how you have to wait for
          the server response? The UI feels sluggish because we&apos;re not using optimistic
          updates.
        </p>
      </section>

      {error && (
        <Alert variant="error">
          <p>{error}</p>
        </Alert>
      )}

      <section>
        <PostForm onSubmit={handleCreatePost} />
      </section>

      <section>
        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">Loading posts...</p>
          </div>
        ) : (
          <PostList posts={optimisticPosts} onDeletePost={handleDeletePost} />
        )}
      </section>
    </Container>
  );
}

export default Application;
