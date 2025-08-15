"use client";
import { formatTimeWithSeconds } from "./utils";

export default function CurrentPrayerStatus({ nextPrayer = '-', nextPrayerTime='--:--:--', timeRemaining='Memuat...', countdown='--:--:--', notificationText }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-islamic-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-islamic-800 mb-2">Sholat Selanjutnya</h2>
        <div className="text-4xl font-bold text-islamic-600 mb-2" id="nextPrayer">{nextPrayer}</div>
        <div className="text-2xl text-islamic-500 mb-4" id="nextPrayerTime">{formatTimeWithSeconds(nextPrayerTime.replace(':00', ''))}</div>
        <div className="bg-islamic-50 rounded-lg p-4">
          <div className="text-lg text-islamic-600 mb-2">
            <span id="timeRemaining">{timeRemaining}</span>
          </div>
          <div className="text-3xl font-mono font-bold text-islamic-700" id="countdownTimer">{countdown}</div>
          <div className="mt-2">
            <span className="text-xs text-gray-500" id="notificationStatus">{notificationText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
