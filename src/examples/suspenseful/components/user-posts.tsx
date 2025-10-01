import { use } from 'react';
import { Card } from '$components/card';
import type { Post } from '../types';

interface UserPostsProps {
	postsPromise: Promise<Post[]>;
}

export function UserPosts({ postsPromise }: UserPostsProps) {
	const posts = use(postsPromise);

	return (
		<Card className="p-6">
			<h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">Recent Posts</h2>
			<div className="space-y-3">
				{posts.map((post) => (
					<div key={post.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
						<h3 className="mb-1 font-medium text-slate-900 dark:text-slate-100">{post.title}</h3>
						<p className="text-sm text-slate-600 dark:text-slate-400">{post.body.substring(0, 100)}...</p>
					</div>
				))}
			</div>
		</Card>
	);
}
