"use client";
export default function NotificationSettings({ notification10min, setNotification10min, notificationNow, setNotificationNow }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Pengaturan Notifikasi</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Notifikasi 10 menit sebelum</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={notification10min} onChange={e => setNotification10min(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600 focus:outline-none"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Notifikasi saat waktu tiba</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={notificationNow} onChange={e => setNotificationNow(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
