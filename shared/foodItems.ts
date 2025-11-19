export interface FoodItem {
  id: string;
  nameEn: string;
  nameBn: string;
  category: string;
  expirationDays: number;
  avgCostBDT: number;
  storageTipsEn: string;
  storageTipsBn: string;
  nutritionalCategory: string;
}

export const foodItems: FoodItem[] = [
  {
    id: "rice",
    nameEn: "Rice",
    nameBn: "চাউল",
    category: "grains",
    expirationDays: 365,
    avgCostBDT: 50,
    storageTipsEn:
      "Store in airtight container in a cool, dry place. Keep away from moisture.",
    storageTipsBn:
      "বায়ুরোধী পাত্রে ঠান্ডা শুষ্ক স্থানে রাখুন। আর্দ্রতা থেকে দূরে রাখুন।",
    nutritionalCategory: "carbs",
  },
  {
    id: "lentils",
    nameEn: "Lentils (Masoor Dal)",
    nameBn: "মসুর ডাল",
    category: "legumes",
    expirationDays: 365,
    avgCostBDT: 80,
    storageTipsEn:
      "Keep in airtight container away from sunlight. Store in cool place.",
    storageTipsBn: "বায়ুরোধী পাত্রে সরাসরি সূর্যালোক থেকে দূরে রাখুন।",
    nutritionalCategory: "protein",
  },
  {
    id: "potatoes",
    nameEn: "Potatoes",
    nameBn: "আলু",
    category: "vegetables",
    expirationDays: 30,
    avgCostBDT: 25,
    storageTipsEn:
      "Store in cool, dark place. Do not refrigerate. Keep away from onions.",
    storageTipsBn:
      "ঠান্ডা অন্ধকার স্থানে রাখুন। রেফ্রিজারেটর করবেন না। পেঁয়াজ থেকে দূরে রাখুন।",
    nutritionalCategory: "carbs",
  },
  {
    id: "onions",
    nameEn: "Onions",
    nameBn: "পেঁয়াজ",
    category: "vegetables",
    expirationDays: 45,
    avgCostBDT: 30,
    storageTipsEn:
      "Store in cool, ventilated place. Keep away from potatoes and garlic.",
    storageTipsBn:
      "ঠান্ডা বায়ুরোধী স্থানে রাখুন। আলু এবং রসুন থেকে দূরে রাখুন।",
    nutritionalCategory: "vitamins",
  },
  {
    id: "tomatoes",
    nameEn: "Tomatoes",
    nameBn: "টমেটো",
    category: "vegetables",
    expirationDays: 7,
    avgCostBDT: 40,
    storageTipsEn:
      "Store at room temperature. Do not refrigerate. Keep away from direct sunlight.",
    storageTipsBn:
      "ঘরের তাপমাত্রায় রাখুন। রেফ্রিজারেটর করবেন না। সূর্যালোক থেকে দূরে রাখুন।",
    nutritionalCategory: "vitamins",
  },
  {
    id: "cabbage",
    nameEn: "Cabbage",
    nameBn: "বাঁধাকপি",
    category: "vegetables",
    expirationDays: 14,
    avgCostBDT: 35,
    storageTipsEn:
      "Refrigerate in plastic bag. Keep in crisper drawer for freshness.",
    storageTipsBn:
      "প্লাস্টিক ব্যাগে রেফ্রিজারেটরে রাখুন। ক্রিসপার ড্রয়ারে সতেজতা বজায় রাখুন।",
    nutritionalCategory: "vitamins",
  },
  {
    id: "eggplant",
    nameEn: "Eggplant (Begun)",
    nameBn: "বেগুন",
    category: "vegetables",
    expirationDays: 5,
    avgCostBDT: 45,
    storageTipsEn:
      "Store at room temperature. Use quickly for best flavor. Avoid refrigerator.",
    storageTipsBn:
      "ঘরের তাপমাত্রায় রাখুন। দ্রুত ব্যবহার করুন। রেফ্রিজারেটর এড়িয়ে চলুন।",
    nutritionalCategory: "vitamins",
  },
  {
    id: "spinach",
    nameEn: "Spinach (Shak)",
    nameBn: "পালং শাক",
    category: "vegetables",
    expirationDays: 3,
    avgCostBDT: 30,
    storageTipsEn:
      "Refrigerate in plastic bag. Keep away from ethylene-producing fruits.",
    storageTipsBn:
      "প্লাস্টিক ব্যাগে রেফ্রিজারেটরে রাখুন। ইথিলিন উৎপাদনকারী ফল থেকে দূরে রাখুন।",
    nutritionalCategory: "vitamins",
  },
  {
    id: "fish",
    nameEn: "Fish (Fresh)",
    nameBn: "মাছ",
    category: "fish",
    expirationDays: 1,
    avgCostBDT: 150,
    storageTipsEn:
      "Keep on ice or refrigerate immediately. Use within 24 hours.",
    storageTipsBn:
      "বরফে রাখুন বা অবিলম্বে রেফ্রিজারেটর করুন। 24 ঘন্টার মধ্যে ব্যবহার করুন।",
    nutritionalCategory: "protein",
  },
  {
    id: "eggs",
    nameEn: "Eggs",
    nameBn: "ডিম",
    category: "eggs",
    expirationDays: 21,
    avgCostBDT: 8,
    storageTipsEn:
      "Store in refrigerator in egg compartment. Keep away from strong odors.",
    storageTipsBn:
      "রেফ্রিজারেটরে ডিম বিভাগে রাখুন। শক্তিশালী গন্ধ থেকে দূরে রাখুন।",
    nutritionalCategory: "protein",
  },
  {
    id: "milk",
    nameEn: "Milk",
    nameBn: "দুধ",
    category: "dairy",
    expirationDays: 5,
    avgCostBDT: 60,
    storageTipsEn:
      "Refrigerate immediately. Do not store on door. Use within 5 days.",
    storageTipsBn:
      "অবিলম্বে রেফ্রিজারেটর করুন। দরজায় রাখবেন না। 5 দিনের মধ্যে ব্যবহার করুন।",
    nutritionalCategory: "protein",
  },
  {
    id: "yogurt",
    nameEn: "Yogurt",
    nameBn: "দই",
    category: "dairy",
    expirationDays: 7,
    avgCostBDT: 50,
    storageTipsEn:
      "Keep refrigerated. Store away from strong smells. Use within 7 days.",
    storageTipsBn:
      "রেফ্রিজারেটরে রাখুন। শক্তিশালী গন্ধ থেকে দূরে রাখুন। 7 দিনের মধ্যে ব্যবহার করুন।",
    nutritionalCategory: "protein",
  },
  {
    id: "mango",
    nameEn: "Mango",
    nameBn: "আম",
    category: "fruits",
    expirationDays: 7,
    avgCostBDT: 60,
    storageTipsEn:
      "Ripen at room temperature. Once ripe, refrigerate. Peel can be composted.",
    storageTipsBn:
      "ঘরের তাপমাত্রায় পাকান। পাকলে রেফ্রিজারেটর করুন। খোসা সার তৈরি করতে পারে।",
    nutritionalCategory: "vitamins",
  },
  {
    id: "banana",
    nameEn: "Banana",
    nameBn: "কলা",
    category: "fruits",
    expirationDays: 5,
    avgCostBDT: 25,
    storageTipsEn:
      "Store at room temperature. Separate bunches to slow ripening. Peel for composting.",
    storageTipsBn:
      "ঘরের তাপমাত্রায় রাখুন। কান্ড আলাদা করুন। খোসা সার তৈরি করতে পারে।",
    nutritionalCategory: "carbs",
  },
  {
    id: "jackfruit",
    nameEn: "Jackfruit",
    nameBn: "কাঁঠাল",
    category: "fruits",
    expirationDays: 7,
    avgCostBDT: 100,
    storageTipsEn:
      "Store at room temperature. Keep in cool place. Use within a week.",
    storageTipsBn:
      "ঘরের তাপমাত্রায় রাখুন। ঠান্ডা স্থানে রাখুন। এক সপ্তাহে ব্যবহার করুন।",
    nutritionalCategory: "carbs",
  },
  {
    id: "papaya",
    nameEn: "Papaya",
    nameBn: "পেপে",
    category: "fruits",
    expirationDays: 5,
    avgCostBDT: 40,
    storageTipsEn:
      "Ripen at room temperature. Refrigerate when ripe. Keep seeds for planting.",
    storageTipsBn:
      "ঘরের তাপমাত্রায় পাকান। পাকলে রেফ্রিজারেটর করুন। বীজ রাখুন।",
    nutritionalCategory: "vitamins",
  },
  {
    id: "carrots",
    nameEn: "Carrots",
    nameBn: "গাজর",
    category: "vegetables",
    expirationDays: 21,
    avgCostBDT: 35,
    storageTipsEn:
      "Remove greens and refrigerate. Keep in crisper drawer. Last for weeks.",
    storageTipsBn:
      "সবুজ অংশ সরান এবং রেফ্রিজারে���র করুন। ক্রিসপার ড্রয়ারে রাখুন।",
    nutritionalCategory: "vitamins",
  },
  {
    id: "cucumbers",
    nameEn: "Cucumbers",
    nameBn: "শসা",
    category: "vegetables",
    expirationDays: 7,
    avgCostBDT: 25,
    storageTipsEn:
      "Refrigerate immediately. Do not keep with ethylene-producing fruits.",
    storageTipsBn:
      "অবিলম্বে রেফ্রিজারেটর করুন। ইথিলিন উৎপাদনকারী ফল থেকে দূরে রাখুন।",
    nutritionalCategory: "vitamins",
  },
  {
    id: "chili",
    nameEn: "Green Chili",
    nameBn: "সবুজ মরিচ",
    category: "vegetables",
    expirationDays: 10,
    avgCostBDT: 50,
    storageTipsEn:
      "Refrigerate in plastic bag. Keep in crisper drawer for freshness.",
    storageTipsBn:
      "প্লাস্টিক ব্যাগে রেফ্রিজারেটর করুন। ক্রিসপার ড্রয়ারে রাখুন।",
    nutritionalCategory: "vitamins",
  },
  {
    id: "garlic",
    nameEn: "Garlic",
    nameBn: "রসুন",
    category: "vegetables",
    expirationDays: 30,
    avgCostBDT: 60,
    storageTipsEn:
      "Store in cool, dark, ventilated place. Keep away from moisture.",
    storageTipsBn:
      "ঠান্ডা অন্ধকার বায়ুরোধী স্থানে রাখুন। আর্দ্রতা থেকে দূরে রাখুন।",
    nutritionalCategory: "vitamins",
  },
];
