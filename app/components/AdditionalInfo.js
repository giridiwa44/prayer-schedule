"use client";
export default function AdditionalInfo({ sunrise='--:--:--', dhuha='--:--:--', midnight='--:--:--', lastUpdate='--:--:--' }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Informasi Tambahan</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Terbit:</span>
          <span className="font-mono font-semibold" id="sunrise">{sunrise}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Dhuha:</span>
          <span className="font-mono font-semibold" id="dhuha">{dhuha}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tengah Malam:</span>
          <span className="font-mono font-semibold" id="midnight">{midnight}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Last Update:</span>
          <span className="font-mono text-sm text-green-600" id="lastUpdate">{lastUpdate}</span>
        </div>
      </div>
    </div>
  );
}
