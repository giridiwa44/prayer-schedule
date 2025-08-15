"use client";
import { prayerConfig, formatTimeWithSeconds } from "./utils";
import clsx from "clsx";

const colorMap = {
  blue: "border-blue-400",
  green: "border-green-400",
  red: "border-red-400",
  purple: "border-purple-400",
  yellow: "border-yellow-400",
  orange: "border-orange-400",
}

export default function PrayerGrid({ jadwal = {} }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" id="prayerGrid">
      {Object.entries(prayerConfig).map(([key, config]) => {
        const time = jadwal[key] || '--:--';
        const timeWithSeconds = formatTimeWithSeconds(time);
        return (
          <div key={key} className={clsx("prayer-card bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all duration-300", colorMap[config.color] || "border-gray-400")}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  {config.icon} {config.name}
                </h3>
                <p className="text-gray-600">{config.desc}</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-mono font-bold text-${config.color}-600`}>{timeWithSeconds}</div>
                <div className="text-sm text-gray-500">WIB</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
