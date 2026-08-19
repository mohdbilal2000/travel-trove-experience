import { Clock } from "lucide-react";
import type { TimelineStop } from "@/data/types/travelPlanTypes";

interface ProgrammeTimelineProps {
    timeline: TimelineStop[];
}

// Hour-by-hour timeline for programmes. Multi-day programmes group stops
// under "Day N" headings; single-day tours render one continuous rail.
export default function ProgrammeTimeline({ timeline }: ProgrammeTimelineProps) {
    const isMultiDay = timeline.some((stop) => stop.day !== undefined);
    const days = isMultiDay
        ? Array.from(new Set(timeline.map((stop) => stop.day)))
        : [undefined];

    return (
        <div className="space-y-10">
            {days.map((day) => (
                <div key={day ?? "single"}>
                    {isMultiDay && (
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-2xl bg-maroon-600 text-white flex items-center justify-center text-sm font-black">
                                {day}
                            </span>
                            Day {day}
                        </h3>
                    )}
                    <ol className="relative border-l-2 border-maroon-600/20 ml-3 space-y-8">
                        {timeline
                            .filter((stop) => stop.day === day)
                            .map((stop, index) => (
                                <li key={`${day ?? 0}-${index}`} className="relative pl-8">
                                    <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-maroon-600" />
                                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[10px] font-black uppercase tracking-widest text-maroon-600">
                                            <Clock className="w-3 h-3" /> {stop.time}
                                        </span>
                                        <h4 className="text-lg font-bold text-gray-900">{stop.title}</h4>
                                    </div>
                                    <p className="text-gray-500 font-light leading-relaxed">{stop.description}</p>
                                </li>
                            ))}
                    </ol>
                </div>
            ))}
        </div>
    );
}
