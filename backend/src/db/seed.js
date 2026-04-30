const db = require('./database');

// Clear existing data
db.exec('DELETE FROM stations');
db.exec('DELETE FROM lines');
db.exec("DELETE FROM sqlite_sequence WHERE name IN ('stations', 'lines')");

// Insert lines
const insertLine = db.prepare(`
  INSERT INTO lines (name, type, color, description, is_active)
  VALUES (@name, @type, @color, @description, @is_active)
`);

const lines = [
  {
    name: 'M2 Yenikapı-Hacıosman',
    type: 'metro',
    color: '#E3000F',
    description: 'Red metro line running from Yenikapı to Hacıosman.',
    is_active: 1,
  },
  {
    name: 'M4 Kadıköy-Sabiha Gökçen',
    type: 'metro',
    color: '#0055A5',
    description: 'Blue metro line running from Kadıköy to Sabiha Gökçen Airport.',
    is_active: 1,
  },
  {
    name: 'T1 Kabataş-Bağcılar',
    type: 'tram',
    color: '#F68B1F',
    description: 'Historic tram line connecting Kabataş to Bağcılar through the old city.',
    is_active: 1,
  },
  {
    name: 'Marmaray',
    type: 'marmaray',
    color: '#6B2D8B',
    description: 'Commuter rail line crossing the Bosphorus underground.',
    is_active: 1,
  },
];

const insertLines = db.transaction((lines) => {
  for (const line of lines) {
    insertLine.run(line);
  }
});

insertLines(lines);

// Insert stations
const insertStation = db.prepare(`
  INSERT INTO stations (name, line_id, order_number, district)
  VALUES (@name, @line_id, @order_number, @district)
`);

const stations = [
  // M2 — line_id: 1
  { name: 'Yenikapı',             line_id: 1, order_number: 1,  district: 'Fatih' },
  { name: 'Vezneciler',           line_id: 1, order_number: 2,  district: 'Fatih' },
  { name: 'Haliç',                line_id: 1, order_number: 3,  district: 'Eyüpsultan' },
  { name: 'Şişhane',              line_id: 1, order_number: 4,  district: 'Beyoğlu' },
  { name: 'Taksim',               line_id: 1, order_number: 5,  district: 'Beyoğlu' },
  { name: 'Osmanbey',             line_id: 1, order_number: 6,  district: 'Şişli' },
  { name: 'Şişli-Mecidiyeköy',   line_id: 1, order_number: 7,  district: 'Şişli' },
  { name: 'Gayrettepe',           line_id: 1, order_number: 8,  district: 'Beşiktaş' },
  { name: 'Levent',               line_id: 1, order_number: 9,  district: 'Beşiktaş' },
  { name: '4.Levent',             line_id: 1, order_number: 10, district: 'Beşiktaş' },
  { name: 'Sanayi Mahallesi',     line_id: 1, order_number: 11, district: 'Kağıthane' },
  { name: 'Hacıosman',            line_id: 1, order_number: 12, district: 'Sarıyer' },

  // M4 — line_id: 2
  { name: 'Kadıköy',              line_id: 2, order_number: 1,  district: 'Kadıköy' },
  { name: 'Ayrılık Çeşmesi',     line_id: 2, order_number: 2,  district: 'Üsküdar' },
  { name: 'Acıbadem',             line_id: 2, order_number: 3,  district: 'Kadıköy' },
  { name: 'Ünalan',               line_id: 2, order_number: 4,  district: 'Üsküdar' },
  { name: 'Göztepe',              line_id: 2, order_number: 5,  district: 'Kadıköy' },
  { name: 'Yenisahra',            line_id: 2, order_number: 6,  district: 'Kadıköy' },
  { name: 'Kozyatağı',            line_id: 2, order_number: 7,  district: 'Kadıköy' },
  { name: 'Bostancı',             line_id: 2, order_number: 8,  district: 'Kadıköy' },
  { name: 'Küçükyalı',            line_id: 2, order_number: 9,  district: 'Maltepe' },
  { name: 'Maltepe',              line_id: 2, order_number: 10, district: 'Maltepe' },
  { name: 'Huzurevi',             line_id: 2, order_number: 11, district: 'Maltepe' },
  { name: 'Gülsuyu',              line_id: 2, order_number: 12, district: 'Maltepe' },
  { name: 'Esenkent',             line_id: 2, order_number: 13, district: 'Maltepe' },
  { name: 'Hastane-Adliye',       line_id: 2, order_number: 14, district: 'Maltepe' },
  { name: 'Soğanlık',             line_id: 2, order_number: 15, district: 'Kartal' },
  { name: 'Kartal',               line_id: 2, order_number: 16, district: 'Kartal' },
  { name: 'Yakacık',              line_id: 2, order_number: 17, district: 'Kartal' },
  { name: 'Pendik',               line_id: 2, order_number: 18, district: 'Pendik' },
  { name: 'Tavşantepe',           line_id: 2, order_number: 19, district: 'Pendik' },
  { name: 'Sabiha Gökçen',        line_id: 2, order_number: 20, district: 'Pendik' },

  // T1 — line_id: 3
  { name: 'Kabataş',              line_id: 3, order_number: 1,  district: 'Beşiktaş' },
  { name: 'Fındıklı',             line_id: 3, order_number: 2,  district: 'Beyoğlu' },
  { name: 'Karaköy',              line_id: 3, order_number: 3,  district: 'Beyoğlu' },
  { name: 'Eminönü',              line_id: 3, order_number: 4,  district: 'Fatih' },
  { name: 'Sirkeci',              line_id: 3, order_number: 5,  district: 'Fatih' },
  { name: 'Gülhane',              line_id: 3, order_number: 6,  district: 'Fatih' },
  { name: 'Sultanahmet',          line_id: 3, order_number: 7,  district: 'Fatih' },
  { name: 'Çemberlitaş',          line_id: 3, order_number: 8,  district: 'Fatih' },
  { name: 'Beyazıt-Kapalıçarşı', line_id: 3, order_number: 9,  district: 'Fatih' },
  { name: 'Laleli-Üniversite',    line_id: 3, order_number: 10, district: 'Fatih' },
  { name: 'Aksaray',              line_id: 3, order_number: 11, district: 'Fatih' },
  { name: 'Yusufpaşa',            line_id: 3, order_number: 12, district: 'Fatih' },
  { name: 'Haseki',               line_id: 3, order_number: 13, district: 'Fatih' },
  { name: 'Fındıkzade',           line_id: 3, order_number: 14, district: 'Fatih' },
  { name: 'Çapa-Şehremini',       line_id: 3, order_number: 15, district: 'Fatih' },
  { name: 'Zeytinburnu',          line_id: 3, order_number: 16, district: 'Zeytinburnu' },
  { name: 'Mithatpaşa',           line_id: 3, order_number: 17, district: 'Zeytinburnu' },
  { name: 'Merkezefendi',         line_id: 3, order_number: 18, district: 'Zeytinburnu' },
  { name: 'Davutpaşa-YTÜ',        line_id: 3, order_number: 19, district: 'Esenler' },
  { name: 'Topkapı-Ulubatlı',     line_id: 3, order_number: 20, district: 'Esenler' },
  { name: 'Bağcılar',             line_id: 3, order_number: 21, district: 'Bağcılar' },

  // Marmaray — line_id: 4
  { name: 'Halkalı',              line_id: 4, order_number: 1,  district: 'Küçükçekmece' },
  { name: 'Yenibosna',            line_id: 4, order_number: 2,  district: 'Bahçelievler' },
  { name: 'Bahçelievler',         line_id: 4, order_number: 3,  district: 'Bahçelievler' },
  { name: 'Haznedar',             line_id: 4, order_number: 4,  district: 'Bağcılar' },
  { name: 'Bağcılar',             line_id: 4, order_number: 5,  district: 'Bağcılar' },
  { name: 'Kirazlı',              line_id: 4, order_number: 6,  district: 'Bağcılar' },
  { name: 'Zeytinburnu',          line_id: 4, order_number: 7,  district: 'Zeytinburnu' },
  { name: 'Kazlıçeşme',           line_id: 4, order_number: 8,  district: 'Zeytinburnu' },
  { name: 'Yenikapı',             line_id: 4, order_number: 9,  district: 'Fatih' },
  { name: 'Sirkeci',              line_id: 4, order_number: 10, district: 'Fatih' },
  { name: 'Üsküdar',              line_id: 4, order_number: 11, district: 'Üsküdar' },
  { name: 'Ayrılık Çeşmesi',     line_id: 4, order_number: 12, district: 'Üsküdar' },
  { name: 'Feneryolu',            line_id: 4, order_number: 13, district: 'Kadıköy' },
  { name: 'Göztepe',              line_id: 4, order_number: 14, district: 'Kadıköy' },
  { name: 'Suadiye',              line_id: 4, order_number: 15, district: 'Kadıköy' },
  { name: 'Bostancı',             line_id: 4, order_number: 16, district: 'Kadıköy' },
  { name: 'Pendik',               line_id: 4, order_number: 17, district: 'Pendik' },
  { name: 'Gebze',                line_id: 4, order_number: 18, district: 'Gebze' },
];

const insertStations = db.transaction((stations) => {
  for (const station of stations) {
    insertStation.run(station);
  }
});

insertStations(stations);

console.log('Seed completed.');
console.log(`  Lines inserted    : ${lines.length}`);
console.log(`  Stations inserted : ${stations.length}`);
