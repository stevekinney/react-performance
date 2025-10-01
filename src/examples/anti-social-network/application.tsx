import { useState, useEffect, useOptimistic } from 'react';
import { Container } from '$components/container';
import { Alert } from '$components/alert';
import { PostForm } from './components/post-form';
import { PostList } from './components/post-list';
import { createPost, removePost, listPosts } from '$/common/api';
import type { Post, PostFormData, OptimisticPost } from './types';

// Using a fixed user ID for this demo
const CURRENT_USER_ID = 1;

function Application() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Create optimistic state based on actual posts
	const [optimisticPosts, addOptimisticPost] = useOptimistic<OptimisticPost[], OptimisticPost>(
		posts,
		(state, newPost) => {
			// If the post has isPending, it's being added
			if (newPost.isPending) {
				return [newPost, ...state];
			}
			// Otherwise, it's being deleted
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
		try {
			setError(null);

			// Create temporary optimistic post
			const tempPost: OptimisticPost = {
				id: Date.now() as unknown as import('$/common/api').Id, // Temporary ID
				title: formData.title,
				body: formData.body,
				userId: CURRENT_USER_ID as unknown as import('$/common/api').Id,
				isPending: true, // Mark as pending
			};

			// Show optimistic update immediately
			addOptimisticPost(tempPost);

			// Call API in background
			const newPost = await createPost({
				title: formData.title,
				body: formData.body,
				userId: CURRENT_USER_ID as unknown as import('$/common/api').Id,
			});

			// Update real posts with server response
			setPosts((prev) => [newPost, ...prev]);
		} catch (err) {
			setError('Failed to create post. Please try again.');
			console.error('Error creating post:', err);
		}
	};

	const handleDeletePost = async (id: number) => {
		try {
			setError(null);

			// Find the post to delete
			const postToDelete = posts.find((post) => post.id === id);
			if (!postToDelete) return;

			// Show optimistic update immediately
			addOptimisticPost(postToDelete as OptimisticPost);

			// Call API in background
			await removePost(id);

			// Update real posts after success
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
					Create and delete posts. Now optimized with useOptimistic - the UI updates instantly while the server processes your request in the background!
				</p>
				<div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
					<p className="text-sm font-medium text-green-800 dark:text-green-200">
						✅ Optimized with useOptimistic for instant UI feedback
					</p>
				</div>
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
					<div className="text-center py-12">
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
