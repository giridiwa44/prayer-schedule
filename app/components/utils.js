export const cityNames = {
    '1104': 'Kab.Tangerang, Banten',
    '1105': 'Kota Cilegon, Banten',
    '1106': 'Kota Serang, Banten',
    '1107': 'Kota Tangerang, Banten',
    '1108': 'Kota Tangerang Selatan, Banten',
    '1301': 'Jakarta, DKI Jakarta',
    '1273': 'Surabaya, Jawa Timur',
    '1204': 'Bandung, Jawa Barat',
    '1214': 'Medan, Sumatera Utara',
    '1226': 'Semarang, Jawa Tengah',
    '1271': 'Makassar, Sulawesi Selatan',
    '1219': 'Palembang, Sumatera Selatan',
    '1205': 'Yogyakarta, DIY',
    '1275': 'Denpasar, Bali',
    '1265': 'Balikpapan, Kalimantan Timur',
}

export const prayerConfig = {
    imsak: { name: 'Imsak', desc: 'Sahur', color: 'green', icon: '🌙' },
    subuh: { name: 'Subuh', desc: 'Fajar', color: 'red', icon: '🌅' },
    dzuhur: { name: 'Dzuhur', desc: 'Tengah Hari', color: 'yellow', icon: '☀️' },
    ashar: { name: 'Ashar', desc: 'Sore', color: 'orange', icon: '🌇' },
    maghrib: { name: 'Maghrib', desc: 'Senja', color: 'purple', icon: '🌆' },
    isya: { name: 'Isya', desc: 'Malam', color: 'blue', icon: '🌃' },
};

export const formatTimeWithSeconds = (timeString) =>
    !timeString || timeString === '--:--' ? '--:--:--' : `${timeString}:00`;