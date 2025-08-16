"use client";
import { useState, useEffect } from 'react';
import ToastContainer from './components/ToastContainer';
import LoadingOverlay from './components/LoadingOverlay';
import LocationSelector from './components/LocationSelector';
import NotificationSettings from './components/NotificationSettings';
import HijrCalendar from './components/HijriCalendar';
import AdditionalInfo from './components/AdditionalInfo';
import CurrentPrayerStatus from './components/CurrentPrayerStatus';
import PrayerGrid from './components/PrayerGrid';
import usePrayerData from './components/hooks/usePrayerData';
import { cityNames, prayerConfig, formatTimeWithSeconds } from './components/utils';

export default function Home() {
  //UI State
  const [currentCityId, setCurrentCityId] = useState('1301');
  const [toasts, setToasts] = useState([]);
  const [notification10min, setNotification10min] = useState(true);
  const [notificationNow, setNotificationNow] = useState(true);
  // toasts helpers
  const createToast = (type, title, message, duration = 5000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => removeToast(id), duration);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  // usePrayerData hook (handles fetch + intervals + notification checks)
  const { prayerData, hijri, lastUpdate, loading, fetchPrayerTimes } = usePrayerData({
    cityId: currentCityId,
    createToast,
    notification10min,
    notificationNow
  });

  // Digital clock and date
  const [digitalClock, setDigitalClock] = useState('--:--:--');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setDigitalClock(now.toLocaleTimeString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

useEffect(() => {
  if (!prayerData) return;

  const checkNotifications = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    Object.entries(prayerConfig).forEach(([key, config]) => {
      const timeStr = prayerData[key];
      if (!timeStr || timeStr === "--:--") return;

      const [hh, mm] = timeStr.split(":").map(Number);
      const prayerMinutes = hh * 60 + mm;

      const diff = prayerMinutes - currentMinutes;

      // Tepat waktu sholat
      if (diff === 0 && notificationNow) {
        createToast(
          "success",
          `⏰ ${config.name}`,
          `Sekarang waktu ${config.name}!`
        );
      }

      // 10 menit sebelum waktu sholat
      if (diff === 10 && notification10min) {
        createToast(
          "warning",
          `⚠️ ${config.name} sebentar lagi`,
          `10 menit lagi menuju waktu ${config.name}`
        );
      }
    });
  };

  checkNotifications(); // cek awal
  const id = setInterval(checkNotifications, 60000); // cek tiap 1 menit
  return () => clearInterval(id);
}, [prayerData, notificationNow, notification10min]);


  // next prayer calculation
  const computeNextPrayer = () => {
    if (!prayerData) return { nextName: '-', nextTime: '--:--:--', remainingText: 'Memuat...', countdown:'--:--:--', notificationText:'Notifikasi akan muncul 10 menit sebelum waktu sholat' };
    const now = new Date();
    const currentMin = now.getHours()*60 + now.getMinutes();
    const keys = Object.keys(prayerConfig);
    for (let key of keys) {
      const t = prayerData[key];
      if (!t || t === '--:--') continue;
      const [hh, mm] = t.split(':').map(Number);
      const pMin = hh*60 + mm;
      if (pMin > currentMin) {
        const diff = pMin - currentMin;
        const hhLeft = Math.floor(diff / 60);
        const mmLeft = diff % 60;
        const remainingText = `${hhLeft} jam ${mmLeft} menit lagi`;
        // countdown:
        const secondsLeft = diff*60 - now.getSeconds();
        let ch = 0, cm = 0, cs = 0;
        if (secondsLeft > 0) {
          ch = Math.floor(secondsLeft / 3600);
          cm = Math.floor((secondsLeft % 3600) / 60);
          cs = secondsLeft % 60;
        }
        const countdown = `${String(ch).padStart(2,'0')}:${String(cm).padStart(2,'0')}:${String(cs).padStart(2,'0')}`;
        const notificationText = diff <= 10 ? `⚠️ Notifikasi akan segera muncul (${mmLeft} menit lagi)` : 'Notifikasi akan muncul 10 menit sebelum waktu sholat';
        return { nextName: `${prayerConfig[key].icon} ${prayerConfig[key].name}`, nextTime: t, remainingText, countdown, notificationText };
      }
    }
    // nothing else today
    const t = prayerData.imsak || '--:--';
    return { nextName: `${prayerConfig.imsak.icon} Imsak`, nextTime: t, remainingText: 'Besok', countdown: '--:--:--', notificationText: 'Menunggu hari berikutnya' };
  };

  const next = computeNextPrayer();

  // manual update location handler
  const onUpdateLocation = async () => {
    // clear toast history? handled in hook if you want
    await fetchPrayerTimes(currentCityId);
  };


  return (
   <main className="min-h-screen bg-gradient-to-br from-islamic-50 to-blue-100">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <LoadingOverlay show={loading} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-islamic-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"></path>
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-islamic-800 mb-2">Jadwal Sholat Real-time</h1>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-4 border border-islamic-100">
            <div className="text-5xl font-sans font-bold text-islamic-700 mb-2">{digitalClock}</div>
            <div className="text-lg text-gray-600">{currentDate}</div>
            <div className="text-sm text-islamic-600 mt-2 flex items-center justify-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span> Live Update
              <span className="ml-4 text-xs bg-islamic-100 px-2 py-1 rounded-full">🔔 Notifikasi Aktif</span>
            </div>
          </div>

          <p className="text-lg font-semibold text-islamic-700" id="currentLocation">{cityNames[currentCityId]}</p>
          <p className="text-sm text-gray-500">Data dari MyQuran API</p>
        </div>

        {/* Error placeholder (if any) can be added here */}

        {/* Current Prayer Status */}
        <CurrentPrayerStatus
          nextPrayer={next.nextName}
          nextPrayerTime={next.nextTime}
          timeRemaining={next.remainingText}
          countdown={next.countdown}
          notificationText={next.notificationText}
        />

        {/* Prayer Grid */}
        <PrayerGrid jadwal={prayerData || {}} />

        {/* Controls: Location + Notification */}
        <LocationSelector currentCityId={currentCityId} setCurrentCityId={setCurrentCityId} onUpdate={onUpdateLocation} />
        <NotificationSettings
          notification10min={notification10min}
          setNotification10min={setNotification10min}
          notificationNow={notificationNow}
          setNotificationNow={setNotificationNow}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HijrCalendar/>
          <AdditionalInfo sunrise={(prayerData && prayerData.terbit) ? formatTimeWithSeconds(prayerData.terbit) : '--:--:--'}
                          dhuha={(prayerData && prayerData.dhuha) ? formatTimeWithSeconds(prayerData.dhuha) : '--:--:--'}
                          midnight={(prayerData && prayerData.tengah_malam) ? formatTimeWithSeconds(prayerData.tengah_malam) : '--:--:--'}
                          lastUpdate={lastUpdate} />
        </div>
      </div>
    </main>
  );
}
