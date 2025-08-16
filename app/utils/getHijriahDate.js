export async function getHijriDate() {
    try {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}-${mm}-${dd}`;
  
      const response = await fetch(
        `https://api.myquran.com/v2/cal/hijr/${formattedDate}`
      );
  
      if (!response.ok) {
        throw new Error("Gagal fetch data Hijriah");
      }
  
      const json = await response.json();
  
      // Ambil langsung string "21 Safar 1447 H"
      return json?.data?.date?.[1] || "-";
    } catch (error) {
      console.error("Error getHijriDate:", error);
      return "-";
    }
  }
  