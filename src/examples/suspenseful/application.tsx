import { Suspense } from 'react';
import { Container } from '$components/container';
import { UserInfo } from './components/user-info';
import { UserPosts } from './components/user-posts';
import { UserTodos } from './components/user-todos';
import { UserInfoSkeleton } from './components/user-info-skeleton';
import { PostsSkeleton } from './components/posts-skeleton';
import { TodosSkeleton } from './components/todos-skeleton';
import {
	createUserPromise,
	createUserPostsPromise,
	createUserTodosPromise,
} from './utilities/data-fetchers';

const USER_ID = 1;

// ✅ Create promises OUTSIDE component
// This ensures they're not recreated on every render
const userPromise = createUserPromise(USER_ID);
const postsPromise = createUserPostsPromise(USER_ID);
const todosPromise = createUserTodosPromise(USER_ID);

function Application() {
	return (
		<Container className="my-8 space-y-8">
			<section>
				<h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Suspenseful</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Suspense + use() pattern: Each section loads independently and shows as soon as ready.
					Notice how user info appears first, then posts, then todos. Much better UX!
				</p>
				<div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
					<p className="text-sm font-medium text-green-800 dark:text-green-200">
						✅ Progressive loading: Show content as it becomes available
					</p>
				</div>
			</section>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Each section has its own Suspense boundary */}
				<section>
					<Suspense fallback={<UserInfoSkeleton />}>
						<UserInfo userPromise={userPromise} />
					</Suspense>
				</section>

				<section>
					<Suspense fallback={<PostsSkeleton />}>
						<UserPosts postsPromise={postsPromise} />
					</Suspense>
				</section>

				<section className="lg:col-span-2">
					<Suspense fallback={<TodosSkeleton />}>
						<UserTodos todosPromise={todosPromise} />
					</Suspense>
				</section>
			</div>

			<section className="rounded-md bg-slate-100 p-6 dark:bg-slate-800">
				<h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">The Benefits</h2>
				<ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
					<li>✅ User sees skeletons immediately (not a blank screen)</li>
					<li>✅ Each section appears as soon as its data is ready</li>
					<li>✅ Fast data doesn&apos;t wait for slow data</li>
					<li>✅ No complex state management or useEffect</li>
					<li>✅ Cleaner, more declarative code</li>
				</ul>
			</section>
		</Container>
	);
}

export default Application;
