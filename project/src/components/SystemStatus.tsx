import { Clock } from "lucide-react";

export default function SystemStatus() {
  return (
    <div className="bg-zinc-800 text-white rounded-2xl p-6 shadow-xL width-full">
      <h3 className="font-semibold mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-emerald-400" />
        System Status
      </h3>

      <div className="space-y-6">
        {/* API Latency */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-zinc-400">
              API Latency
            </span>
            <span className="text-emerald-400">
              Optimal (42ms)
            </span>
          </div>

          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[15%]" />
          </div>
        </div>

        {/* Storage */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-zinc-400">
              Storage Capacity
            </span>
            <span className="text-zinc-100">
              64% Used
            </span>
          </div>

          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-600 w-[64%]" />
          </div>
        </div>

        {/* Info Box */}
        <div className="pt-4">
          <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
            <p className="text-xs text-zinc-400 leading-relaxed">
              All systems are operational. No scheduled
              maintenance for the next 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}