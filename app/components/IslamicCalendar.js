"use client";
export default function IslamicCalendar({ hijriDate = '-', hijriMonth = 'Memuat...' }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Kalender Hijriah</h3>
      <div className="text-center">
        <div className="text-2xl font-bold text-islamic-600 mb-2" id="hijriDate">{hijriDate}</div>
        <div className="text-gray-600" id="hijriMonth">{hijriMonth}</div>
      </div>
    </div>
  );
}
