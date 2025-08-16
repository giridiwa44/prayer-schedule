"use client";
import { useEffect, useRef, useState } from "react";

export default function usePrayerData({ cityId, createToast, notification10min, notificationNow }) {
  const [prayerData, setPrayerData] = useState(null);
  const [hijri, setHijri] = useState({ date: '-', monthText: 'Memuat...' });
  const [lastUpdate, setLastUpdate] = useState('--:--:--');
  const [loading, setLoading] = useState(false);
  const notificationHistoryRef = useRef(new Set());
  const dataIntervalRef = useRef(null);
  const realtimeIntervalRef = useRef(null);

  const fetchPrayerTimes = async (cid) => {
    try {
      setLoading(true);
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");

      const res = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${cid}/${year}/${month}/${day}`);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if (data.status !== true) throw new Error('API status false');
      setPrayerData(data.data.jadwal);
      const now = new Date();
      setLastUpdate(now.toLocaleTimeString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      createToast && createToast('success', '✅ Data Berhasil Dimuat', 'Jadwal sholat telah diperbarui', 3000);
      return data.data.jadwal;
    } catch (err) {
      console.error('fetchPrayerTimes', err);
      createToast && createToast('warning', '⚠️ Koneksi Bermasalah', 'Menggunakan data fallback', 4000);
      // fallback
      const fallback = {
        imsak: '04:35', subuh: '04:45', dzuhur: '12:15', ashar: '15:30', maghrib: '18:05', isya: '19:25',
        terbit: '06:00', dhuha: '06:30', tengah_malam: '00:15', tanggal: 'Data Fallback'
      };
      setPrayerData(fallback);
      setHijri({ date: 'Data Fallback', monthText: 'Silakan coba lagi' });
      const now = new Date();
      setLastUpdate(now.toLocaleTimeString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      return fallback;
    } finally {
      setLoading(false);
    }
  };

  const startAutoUpdate = (cid) => {
    // initial fetch
    fetchPrayerTimes(cid);
    // every 5 minutes refresh data
    if (dataIntervalRef.current) clearInterval(dataIntervalRef.current);
    dataIntervalRef.current = setInterval(() => fetchPrayerTimes(cid), 5 * 60 * 1000);

    // realtime checks (notifications, countdown recalculation etc)
    if (realtimeIntervalRef.current) clearInterval(realtimeIntervalRef.current);
    realtimeIntervalRef.current = setInterval(() => {
      // check notifications
      checkNotifications();
    }, 1000);
  };

  const stopAutoUpdate = () => {
    if (dataIntervalRef.current) {
      clearInterval(dataIntervalRef.current);
      dataIntervalRef.current = null;
    }
    if (realtimeIntervalRef.current) {
      clearInterval(realtimeIntervalRef.current);
      realtimeIntervalRef.current = null;
    }
  };

  const checkNotifications = () => {
    if (!prayerData) return;
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

    const cfgKeys = ['imsak','subuh','dzuhur','ashar','maghrib','isya'];
    for (const key of cfgKeys) {
      const t = prayerData[key];
      if (!t || t === '--:--') continue;
      const [hh,mm] = t.split(':').map(Number);
      const prayerMin = hh*60 + mm;

      // 10-min before
      const key10 = `${key}-10-${t}`;
      if (notification10min && currentTimeInMinutes >= prayerMin - 10 && currentTimeInMinutes < prayerMin - 9) {
        if (!notificationHistoryRef.current.has(key10)) {
          createToast && createToast('warning', `⏳ Persiapan Sholat ${key.toUpperCase()}`, `Waktu sholat ${key} dalam 10 menit (${t})`, 8000);
          notificationHistoryRef.current.add(key10);
        }
      }
      // at time
      const keyNow = `${key}-now-${t}`;
      if (notificationNow && currentTimeInMinutes >= prayerMin && currentTimeInMinutes < prayerMin + 1) {
        if (!notificationHistoryRef.current.has(keyNow)) {
          createToast && createToast('prayer', `🕌 Waktu Sholat ${key.toUpperCase()}`, `Saatnya melaksanakan sholat ${key}. Waktu: ${t}`, 10000);
          notificationHistoryRef.current.add(keyNow);
        }
      }
    }
  };

  useEffect(() => {
    // on mount or city change
    if (cityId) {
      startAutoUpdate(cityId);
    }
    return () => stopAutoUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId]);

  useEffect(() => {
    // clear notifications history when toggling notification prefs OFF => we keep behavior simple: when they re-enable no duplicate spams because of time window.
    if (!notification10min || !notificationNow) {
      // keep history (to avoid double-notify in same page load), but you can clear if you prefer:
      // notificationHistoryRef.current.clear();
    }
  }, [notification10min, notificationNow]);

  return { prayerData, hijri, lastUpdate, loading, fetchPrayerTimes, stopAutoUpdate };
}
