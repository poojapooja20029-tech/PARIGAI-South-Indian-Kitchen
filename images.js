/**
 * PARIGAI — South Indian Kitchen
 * images.js — Curated food image map
 *
 * Uses Unsplash Source API (free, no API key needed).
 * Format: https://source.unsplash.com/640x480/?{keyword}
 *
 * This file exports FOOD_IMAGES — a map of item id → image URL.
 * script.js reads this map and injects images into menu cards.
 *
 * To replace with your own photos:
 *   1. Add your image files to an /images/ folder
 *   2. Replace the URL strings below with: "images/your-photo.jpg"
 */

const FOOD_IMAGES = {
  /* ── Regular Dosas ─────────────────────────────── */
  1:  "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=640&h=480&fit=crop",  // Plain Dosa
  2:  "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=640&h=480&fit=crop",  // Masala Dosa
  3:  "https://images.unsplash.com/photo-1567337710282-00832b415979?w=640&h=480&fit=crop",  // Ghee Roast Dosa
  4:  "https://images.unsplash.com/photo-1630383249896-424e482df921?w=640&h=480&fit=crop",  // Onion Dosa
  5:  "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=640&h=480&fit=crop",  // Cheese Dosa
  6:  "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=640&h=480&fit=crop&sat=-20", // Rava Dosa
  7:  "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=640&h=480&fit=crop&hue=10",  // Mysore Masala

  /* ── Organic / Healthy Dosas ───────────────────── */
  8:  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=640&h=480&fit=crop",  // Spinach Dosa
  9:  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=640&h=480&fit=crop",  // Methi Dosa
  10: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=640&h=480&fit=crop",  // Ragi Dosa
  11: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=640&h=480&fit=crop",  // Beetroot Dosa
  12: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=640&h=480&fit=crop",  // Multi-grain Dosa
  13: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=640&h=480&fit=crop",  // Green Moong Dosa

  /* ── Combos ────────────────────────────────────── */
  14: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=640&h=480&fit=crop",  // Masala Dosa + Coffee
  15: "https://images.unsplash.com/photo-1622597467836-f3e7b804b699?w=640&h=480&fit=crop",  // Ghee Roast + Juice
  16: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=640&h=480&fit=crop",  // Ragi + Juice
  17: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=640&h=480&fit=crop&sat=20", // Idli+Vada+Dosa

  /* ── Lunch ─────────────────────────────────────── */
  18: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=640&h=480&fit=crop",  // South Indian Thali
  19: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=640&h=480&fit=crop",  // Millet Thali
  20: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=640&h=480&fit=crop",  // Sambar Rice
  21: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=640&h=480&fit=crop",  // Curd Rice
  22: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=640&h=480&fit=crop",  // Lemon Rice
  23: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=640&h=480&fit=crop",  // Kootu Curry

  /* ── Dinner ────────────────────────────────────── */
  24: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=640&h=480&fit=crop&sat=10", // Uthappam
  25: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=640&h=480&fit=crop&hue=30", // Pongal
  26: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=640&h=480&fit=crop&hue=50", // Appam+Stew
  27: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=640&h=480&fit=crop&sat=30", // Ragi Mudde
  28: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=640&h=480&fit=crop&sat=20",    // Pesarattu
  29: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=640&h=480&fit=crop&hue=20", // Idiyappam

  /* ── Drinks ────────────────────────────────────── */
  30: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640&h=480&fit=crop",  // Filter Coffee
  31: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=640&h=480&fit=crop",  // Masala Chai
  32: "https://images.unsplash.com/photo-1622597467836-f3e7b804b699?w=640&h=480&fit=crop",  // Sugarcane Juice
  33: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=640&h=480&fit=crop",  // Turmeric Latte
  34: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=640&h=480&fit=crop",  // Nannari Sherbet
  35: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=640&h=480&fit=crop",  // Green Detox Juice
  36: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=640&h=480&fit=crop",  // Rose Milk
};

/**
 * Inject FOOD_IMAGES URLs into menuData at runtime.
 * Called once before renderMenu().
 */
function injectImages() {
  menuData.forEach(item => {
    if (FOOD_IMAGES[item.id]) {
      item.image = FOOD_IMAGES[item.id];
    }
  });
}
