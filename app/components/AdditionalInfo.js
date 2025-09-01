"use client";
import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  title: { color: "black" },
  highlight: { color: "blue", textDecoration: "none", fontFamily: "monospace" },
});

export default function AdditionalInfo({
  sunrise = "--:--:--",
  dhuha = "--:--:--",
  midnight = "--:--:--",
  lastUpdate = "--:--:--",
}) {
  const classes = useStyles();
  const [countdown, setCountdown] = useState("--:--:--:--");
  const [nextEvent, setNextEvent] = useState({ name: "", date: "" });

  // ✅ Daftar event besar
  const events = [
    { name: "Ramadhan 2025", date: "2025-03-12T00:00:00" },
    { name: "Idul Fitri 2025", date: "2025-04-21T00:00:00" },
    { name:"Maulid Nabi 2025", date:"2025-09-05T00:00:00"},
    { name: "Tahun Baru 2026", date: "2026-01-01T00:00:00" },
  ];

  // Cari event terdekat dari sekarang
  useEffect(() => {
    const now = new Date();
    const upcoming = events
      .map(e => ({ ...e, diff: new Date(e.date) - now }))
      .filter(e => e.diff > 0)
      .sort((a, b) => a.diff - b.diff);

    if (upcoming.length > 0) setNextEvent(upcoming[0]);
  }, []);

  // Hitung countdown
  useEffect(() => {
    if (!nextEvent.date) return;

    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(nextEvent.date);
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Acara sedang berlangsung 🎉");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(`${days}h ${hours}j ${minutes}m ${seconds}d`);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Informasi Tambahan</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-900">Terbit:</span>
          <span className="font-mono font-semibold">{sunrise}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-900">Dhuha:</span>
          <span className="font-mono font-semibold">{dhuha}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-900">Tengah Malam:</span>
          <span className="font-mono font-semibold">{midnight}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-900">Last Update:</span>
          <span className="font-mono text-sm text-green-600">{lastUpdate}</span>
        </div>

        {/* Countdown otomatis ke event terdekat */}
        {nextEvent.name && (
          <div className="flex justify-between mt-4">
            <span className={classes.title}>Countdown {nextEvent.name}:</span>
            <span className="font-sans text-red-600 font-bold">{countdown}</span>
          </div>
        )}
      </div>
    </div>
  );
}
