import { GradientHoneycomb } from '@/components/ui/gradient-honeycomb';

export default function UIPage() {
	return (
		<main className="relative flex size-full min-h-screen w-full items-center justify-center overflow-hidden">
			<GradientHoneycomb variant="metallic" hexSize={32} />
			<h1 className="relative z-10 text-center text-6xl font-extrabold text-foreground">
				Gradient Honeycomb
			</h1>
		</main>
	);
}
