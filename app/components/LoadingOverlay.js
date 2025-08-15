"use client";
export default function LoadingOverlay({ show = false }) {
  if (!show) return null;
  return (
    <div id="loadingOverlay" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat jadwal sholat...</p>
      </div>
    </div>
  );
}