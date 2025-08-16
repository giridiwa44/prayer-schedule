"use client";
import { useEffect, useState } from "react";
import { getHijriDate } from "../utils/getHijriahDate";


export default function HijrCalendar() {
    const [hijriDate, setHijrDate] = useState('-');

    useEffect(() => {
        async function fetchHijri() {
            const date = await getHijriDate();
            setHijrDate(date);
        }

        fetchHijri();
    }, []);

    return (
    <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Kalender Hijriah</h3>
        <div className="text-center">
            <div className="text-2xl font-bold text-islamic-600 mb-2" id="hijriDate">{hijriDate}</div>
        <p className="text-sm font-normal text-gray-600 mb-4">Kalender Hijriah</p>
        </div>

      </div>
    )
}