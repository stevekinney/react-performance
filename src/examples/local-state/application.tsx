import { Container } from '$components/container';
import { CounterWidget } from './components/counter-widget';
import { TextWidget } from './components/text-widget';
import { ColorWidget } from './components/color-widget';

function Application() {
	// ✅ Parent doesn't need to know about widget internals
	// No state, no handlers, just composition!

	return (
		<Container className="my-8 space-y-8">
			<section>
				<h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
					Local State Demo
				</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Open your browser console and interact with any widget. Now only the widget you interact
					with re-renders. The other widgets are completely unaffected!
				</p>
				<div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
					<p className="text-sm font-medium text-green-800 dark:text-green-200">
						✅ Best practice: Each widget manages its own state
					</p>
				</div>
			</section>

			<section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<CounterWidget />
				<TextWidget />
				<ColorWidget />
			</section>

			<section className="rounded-md bg-slate-100 p-6 dark:bg-slate-800">
				<h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">The Benefits</h2>
				<ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
					<li>✅ Each widget is self-contained and independent</li>
					<li>✅ Only the widget being interacted with re-renders</li>
					<li>✅ Widgets can be easily moved, copied, or reused</li>
					<li>✅ Parent component is clean and simple</li>
					<li>✅ Easy to add/remove widgets without touching parent</li>
				</ul>
			</section>
		</Container>
	);
}

export default Application;
