import { cn } from "@/lib/cn";

interface TopicChipsProps {
  topics: string[];
}

export function TopicChips({ topics }: TopicChipsProps) {
  return (
    <div className="topic-chips">
      {topics.map((topic, i) => (
        <span
          key={topic}
          className={cn(
            "topic-chip reduced-motion-flat",
            i % 2 === 1 ? "topic-chip--dark" : "topic-chip--light",
          )}
          style={{ transform: `rotate(${(((i % 3) - 1) * 0.7).toFixed(2)}deg)` }}
        >
          {topic}
        </span>
      ))}
    </div>
  );
}
