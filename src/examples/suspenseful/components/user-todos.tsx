import { use } from 'react';
import { Card } from '$components/card';
import type { Todo } from '../types';

interface UserTodosProps {
	todosPromise: Promise<Todo[]>;
}

export function UserTodos({ todosPromise }: UserTodosProps) {
	const todos = use(todosPromise);

	return (
		<Card className="p-6">
			<h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">Todo List</h2>
			<div className="space-y-2">
				{todos.map((todo) => (
					<div
						key={todo.id}
						className="flex items-center space-x-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700"
					>
						<input type="checkbox" checked={todo.completed} readOnly className="h-5 w-5 rounded" />
						<span
							className={`flex-1 ${
								todo.completed
									? 'text-slate-500 line-through dark:text-slate-500'
									: 'text-slate-900 dark:text-slate-100'
							}`}
						>
							{todo.title}
						</span>
					</div>
				))}
			</div>
		</Card>
	);
}
