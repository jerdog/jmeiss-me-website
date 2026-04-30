import { cn } from "@/lib/cn";

interface TopicChipsProps {
  topics: string[];
}

export function TopicChips({ topics }: TopicChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic, i) => (
        <span
          key={topic}
          className={cn(
            "reduced-motion-flat rounded-full border border-ink px-4 py-1.5 font-body text-sm",
            i % 2 === 1 ? "bg-ink text-paper" : "bg-card text-ink",
          )}
          style={{ transform: `rotate(${(((i % 3) - 1) * 0.7).toFixed(2)}deg)` }}
        >
          {topic}
        </span>
      ))}
    </div>
  );
}
