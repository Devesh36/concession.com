"use client";

import { motion } from "framer-motion";

const features = [
	{
		title: "Digital Application",
		description: "Apply for your concession pass online without any paperwork",
		icon: "💻",
	},
	{
		title: "Quick Verification",
		description: "Get your application verified by college within 24 hours",
		icon: "✅",
	},
	{
		title: "Instant Download",
		description: "Download your approved pass instantly on your device",
		icon: "📱",
	},
];

export default function Features() {
	return (
		<section className="py-24 bg-amber-100/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center"
				>
					<h2 className="text-3xl font-bold text-amber-900">
						Simplified Process
					</h2>
					<p className="mt-4 text-lg text-amber-700">
						Get your railway concession pass in three easy steps
					</p>
				</motion.div>

				<div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
						>
							<div className="text-4xl mb-4">{feature.icon}</div>
							<h3 className="text-xl font-semibold text-amber-900 mb-2">
								{feature.title}
							</h3>
							<p className="text-amber-700">{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}