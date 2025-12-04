exports.handler = async function(event, context) {
  // 1. Pastikan hanya menerima method POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    // 2. Parse data JSON dari Shortcut (Netlify menerima body sebagai string)
    const data = JSON.parse(event.body);
    const inputTeks = data.text || "";

    if (!inputTeks) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Teks tidak ditemukan" })
      };
    }

    // --- LOGIKA KAMU DI SINI ---
    // Contoh: Membalikkan kata (Reverse string)
    const processedText = inputTeks.split("").reverse().join("");
    const balasan = `Netlify membalas: ${processedText}`;
    // ---------------------------

    // 3. Kirim respon balik
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "sukses",
        original: inputTeks,
        reply: balasan
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Format JSON salah atau error server" })
    };
  }
};
