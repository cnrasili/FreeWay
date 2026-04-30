const db = require('./database');

// Clear existing data
db.exec('DELETE FROM stations');
db.exec('DELETE FROM lines');
db.exec("DELETE FROM sqlite_sequence WHERE name IN ('stations', 'lines')");

const insertLine = db.prepare(`
  INSERT INTO lines (name, type, color, description, is_active)
  VALUES (@name, @type, @color, @description, @is_active)
`);

const lines = [
  // line_id: 1
  {
    name: 'M1A Yenikapı-Atatürk Havalimanı',
    type: 'metro',
    color: '#E3000F',
    description: 'Red metro line from Yenikapı to Atatürk Airport. Currently inactive.',
    is_active: 0,
  },
  // line_id: 2
  {
    name: 'M1B Yenikapı-Kirazlı',
    type: 'metro',
    color: '#E3000F',
    description: 'Red metro line from Yenikapı to Kirazlı.',
    is_active: 1,
  },
  // line_id: 3
  {
    name: 'M2 Yenikapı-Hacıosman',
    type: 'metro',
    color: '#00A651',
    description: 'Green metro line from Yenikapı to Hacıosman.',
    is_active: 1,
  },
  // line_id: 4
  {
    name: 'M3 Bakırköy Sahil-Kayaşehir Merkez',
    type: 'metro',
    color: '#00AEEF',
    description: 'Light blue metro line from Bakırköy to Kayaşehir.',
    is_active: 1,
  },
  // line_id: 5
  {
    name: 'M4 Kadıköy-Sabiha Gökçen Havalimanı',
    type: 'metro',
    color: '#E4007F',
    description: 'Pink metro line from Kadıköy to Sabiha Gökçen Airport.',
    is_active: 1,
  },
  // line_id: 6
  {
    name: 'M5 Üsküdar-Samandıra Merkez',
    type: 'metro',
    color: '#92278F',
    description: 'Purple metro line from Üsküdar to Samandıra Merkez.',
    is_active: 1,
  },
  // line_id: 7
  {
    name: 'M6 Levent-Boğaziçi Üni.-Hisarüstü',
    type: 'metro',
    color: '#8B6914',
    description: 'Brown metro line from Levent to Boğaziçi University.',
    is_active: 1,
  },
  // line_id: 8
  {
    name: 'M7 Kabataş-Mahmutbey',
    type: 'metro',
    color: '#F4B5CE',
    description: 'Light pink metro line from Kabataş to Mahmutbey.',
    is_active: 1,
  },
  // line_id: 9
  {
    name: 'M8 Bostancı-Parseller',
    type: 'metro',
    color: '#1D3F8C',
    description: 'Dark blue metro line from Bostancı to Parseller.',
    is_active: 1,
  },
  // line_id: 10
  {
    name: 'M9 Ataköy-Olimpiyat',
    type: 'metro',
    color: '#FDB913',
    description: 'Yellow metro line from Ataköy to Olimpiyat.',
    is_active: 1,
  },
  // line_id: 11
  {
    name: 'M11 Gayrettepe-İstanbul Havalimanı',
    type: 'metro',
    color: '#F7941D',
    description: 'Orange metro line from Gayrettepe to Istanbul Airport.',
    is_active: 1,
  },
  // line_id: 12
  {
    name: 'T1 Kabataş-Bağcılar',
    type: 'tram',
    color: '#003087',
    description: 'Dark navy tram line connecting Kabataş to Bağcılar through the old city.',
    is_active: 1,
  },
  // line_id: 13
  {
    name: 'Marmaray B1 Halkalı-Gebze',
    type: 'marmaray',
    color: '#9E9E9E',
    description: 'Silver commuter rail line crossing the Bosphorus underground.',
    is_active: 1,
  },
  // line_id: 15
  {
    name: 'T3 Kadıköy-Moda (Nostalgic)',
    type: 'tram',
    color: '#825E2D',
    description: 'Brown nostalgic tram line in Kadıköy.',
    is_active: 1,
  },
  // line_id: 16
  {
    name: 'T4 Topkapı-Mescid-i Selam',
    type: 'tram',
    color: '#F7941D',
    description: 'Orange tram line from Topkapı to Mescid-i Selam.',
    is_active: 1,
  },
  // line_id: 17
  {
    name: 'T5 Eminönü-Alibeyköy Cep Otogarı',
    type: 'tram',
    color: '#9678D3',
    description: 'Lila tram line following the Golden Horn coast.',
    is_active: 1,
  },
  // line_id: 19
  {
    name: 'Metrobüs Beylikdüzü-Söğütlüçeşme',
    type: 'metrobus',
    color: '#DDA418',
    description: 'Mustard yellow BRT line crossing continents.',
    is_active: 1,
  },
  // line_id: 20
  {
    name: 'F1 Taksim-Kabataş',
    type: 'funicular',
    color: '#A2A4A6',
    description: 'Light grey funicular connecting Taksim and Kabataş.',
    is_active: 1,
  },
  // line_id: 25
  {
    name: 'F2 Karaköy-Beyoğlu (Tünel)',
    type: 'funicular',
    color: '#8B1A1A',
    description: 'Historic bordeaux funicular connecting Karaköy and Beyoğlu.',
    is_active: 1,
  },
  // line_id: 26
  {
    name: 'F3 Seyrantepe-Vadi İstanbul',
    type: 'funicular',
    color: '#C0A062',
    description: 'Beige funicular line to Vadi İstanbul.',
    is_active: 1,
  },
  // line_id: 27
  {
    name: 'F4 Boğaziçi Üni.-Aşiyan',
    type: 'funicular',
    color: '#00AEEF',
    description: 'Cyan funicular connecting Boğaziçi University to Aşiyan coast.',
    is_active: 1,
  },
  // line_id: 28
  {
    name: 'TF1 Maçka-Taşkışla',
    type: 'cablecar',
    color: '#8DC63F',
    description: 'Light green cable car line over Democracy Park.',
    is_active: 1,
  },
  // line_id: 29
  {
    name: 'TF2 Eyüp-Piyer Loti',
    type: 'cablecar',
    color: '#00B0CA',
    description: 'Turquoise cable car line to Pierre Loti hill.',
    is_active: 1,
  }
];

const insertLines = db.transaction((lines) => {
  for (const line of lines) insertLine.run(line);
});

insertLines(lines);

const insertStation = db.prepare(`
  INSERT INTO stations (name, line_id, order_number, district)
  VALUES (@name, @line_id, @order_number, @district)
`);

const stations = [
  // M1A — line_id: 1
  { name: 'Yenikapı',                    line_id: 1,  order_number: 1,  district: 'Fatih' },
  { name: 'Aksaray',                     line_id: 1,  order_number: 2,  district: 'Fatih' },
  { name: 'Emniyet-Fatih',               line_id: 1,  order_number: 3,  district: 'Fatih' },
  { name: 'Topkapı-Ulubatlı',            line_id: 1,  order_number: 4,  district: 'Fatih' },
  { name: 'Bayrampaşa-Maltepe',          line_id: 1,  order_number: 5,  district: 'Bayrampaşa' },
  { name: 'Sağmalcılar',                 line_id: 1,  order_number: 6,  district: 'Bayrampaşa' },
  { name: 'Kocatepe',                    line_id: 1,  order_number: 7,  district: 'Bayrampaşa' },
  { name: 'Otogar',                      line_id: 1,  order_number: 7,  district: 'Bayrampaşa' },
  { name: 'Terazidere',                  line_id: 1,  order_number: 8,  district: 'Bayrampaşa' },
  { name: 'Davutpaşa-YTÜ',               line_id: 1,  order_number: 9,  district: 'Esenler' },
  { name: 'Merter',                      line_id: 1,  order_number: 10, district: 'Güngören' },
  { name: 'Zeytinburnu',                 line_id: 1,  order_number: 11, district: 'Bakırköy' },
  { name: 'Bakırköy-İncirli',            line_id: 1,  order_number: 12, district: 'Bakırköy' },
  { name: 'Bahçelievler',                line_id: 1,  order_number: 13, district: 'Bahçelievler' },
  { name: 'Ataköy-Şirinevler',           line_id: 1,  order_number: 14, district: 'Bakırköy' },
  { name: 'Yenibosna',                   line_id: 1,  order_number: 15, district: 'Bahçelievler' },
  { name: 'DTM-İstanbul Fuar Merkezi',   line_id: 1,  order_number: 16, district: 'Bakırköy' },
  { name: 'Atatürk Havalimanı',          line_id: 1,  order_number: 17, district: 'Bakırköy' },

  // M1B — line_id: 2
  { name: 'Yenikapı',                    line_id: 2,  order_number: 1,  district: 'Fatih' },
  { name: 'Aksaray',                     line_id: 2,  order_number: 2,  district: 'Fatih' },
  { name: 'Emniyet-Fatih',               line_id: 2,  order_number: 3,  district: 'Fatih' },
  { name: 'Topkapı-Ulubatlı',            line_id: 2,  order_number: 4,  district: 'Fatih' },
  { name: 'Bayrampaşa-Maltepe',          line_id: 2,  order_number: 5,  district: 'Bayrampaşa' },
  { name: 'Sağmalcılar',                 line_id: 2,  order_number: 6,  district: 'Bayrampaşa' },
  { name: 'Kocatepe',                    line_id: 2,  order_number: 7,  district: 'Bayrampaşa' },
  { name: 'Otogar',                      line_id: 2,  order_number: 8,  district: 'Bayrampaşa' },
  { name: 'Esenler',                     line_id: 2,  order_number: 9,  district: 'Esenler' },
  { name: 'Menderes',                    line_id: 2,  order_number: 10, district: 'Esenler' },
  { name: 'Üçyüzlü',                     line_id: 2,  order_number: 11, district: 'Esenler' },
  { name: 'Bağcılar Meydan',             line_id: 2,  order_number: 12, district: 'Bağcılar' },
  { name: 'Kirazlı-Bağcılar',            line_id: 2,  order_number: 13, district: 'Bağcılar' },

  // M2 — line_id: 3
  { name: 'Yenikapı',                    line_id: 3,  order_number: 1,  district: 'Fatih' },
  { name: 'Vezneciler-İstanbul Ü.',      line_id: 3,  order_number: 2,  district: 'Fatih' },
  { name: 'Haliç',                       line_id: 3,  order_number: 3,  district: 'Eyüpsultan' },
  { name: 'Şişhane',                     line_id: 3,  order_number: 4,  district: 'Beyoğlu' },
  { name: 'Taksim',                      line_id: 3,  order_number: 5,  district: 'Beyoğlu' },
  { name: 'Osmanbey',                    line_id: 3,  order_number: 6,  district: 'Şişli' },
  { name: 'Şişli-Mecidiyeköy',           line_id: 3,  order_number: 7,  district: 'Şişli' },
  { name: 'Gayrettepe',                  line_id: 3,  order_number: 8,  district: 'Beşiktaş' },
  { name: 'Levent',                      line_id: 3,  order_number: 9,  district: 'Beşiktaş' },
  { name: '4.Levent',                    line_id: 3,  order_number: 10, district: 'Beşiktaş' },
  { name: 'Sanayi Mahallesi',            line_id: 3,  order_number: 11, district: 'Kağıthane' },
  { name: 'Seyrantepe',                  line_id: 3,  order_number: 12, district: 'Kağıthane' },
  { name: 'İTÜ-Ayazağa',                 line_id: 3,  order_number: 13, district: 'Sarıyer' },
  { name: 'Atatürk Oto Sanayi',          line_id: 3,  order_number: 14, district: 'Sarıyer' },
  { name: 'Darüşşafaka',                 line_id: 3,  order_number: 15, district: 'Sarıyer' },
  { name: 'Hacıosman',                   line_id: 3,  order_number: 16, district: 'Sarıyer' },

  // M3 — line_id: 4
  { name: 'Bakırköy Sahil',              line_id: 4,  order_number: 1,  district: 'Bakırköy' },
  { name: 'Özgürlük Meydanı',            line_id: 4,  order_number: 2,  district: 'Bakırköy' },
  { name: 'İncirli',                     line_id: 4,  order_number: 3,  district: 'Bakırköy' },
  { name: 'Haznedar',                    line_id: 4,  order_number: 4,  district: 'Güngören' },
  { name: 'İlkyuva',                     line_id: 4,  order_number: 5,  district: 'Bahçelievler' },
  { name: 'Yıldıztepe',                  line_id: 4,  order_number: 6,  district: 'Bağcılar' },
  { name: 'Molla Gürani',                line_id: 4,  order_number: 7,  district: 'Bağcılar' },
  { name: 'Kirazlı-Bağcılar',            line_id: 4,  order_number: 8,  district: 'Bağcılar' },
  { name: 'Yenimahalle',                 line_id: 4,  order_number: 9,  district: 'Bağcılar' },
  { name: 'Mahmutbey',                   line_id: 4,  order_number: 10, district: 'Bağcılar' },
  { name: 'İSTOÇ',                       line_id: 4,  order_number: 11, district: 'Bağcılar' },
  { name: 'İkitelli Sanayi',             line_id: 4,  order_number: 12, district: 'Başakşehir' },
  { name: 'Turgut Özal',                 line_id: 4,  order_number: 13, district: 'Başakşehir' },
  { name: 'Siteler',                     line_id: 4,  order_number: 14, district: 'Başakşehir' },
  { name: 'Başak Konutları',             line_id: 4,  order_number: 15, district: 'Başakşehir' },
  { name: 'Başakşehir-Metrokent',        line_id: 4,  order_number: 16, district: 'Başakşehir' },
  { name: 'Onurkent',                    line_id: 4,  order_number: 17, district: 'Başakşehir' },
  { name: 'Şehir Hastanesi',             line_id: 4,  order_number: 18, district: 'Başakşehir' },
  { name: 'Toplu Konutlar',              line_id: 4,  order_number: 19, district: 'Başakşehir' },
  { name: 'Kayaşehir Merkez',            line_id: 4,  order_number: 20, district: 'Başakşehir' },

  // M4 — line_id: 5
  { name: 'Kadıköy',                     line_id: 5,  order_number: 1,  district: 'Kadıköy' },
  { name: 'Ayrılık Çeşmesi',             line_id: 5,  order_number: 2,  district: 'Üsküdar' },
  { name: 'Acıbadem',                    line_id: 5,  order_number: 3,  district: 'Kadıköy' },
  { name: 'Ünalan',                      line_id: 5,  order_number: 4,  district: 'Üsküdar' },
  { name: 'Göztepe',                     line_id: 5,  order_number: 5,  district: 'Kadıköy' },
  { name: 'Yenisahra',                   line_id: 5,  order_number: 6,  district: 'Kadıköy' },
  { name: 'Pegasus-Kozyatağı',           line_id: 5,  order_number: 7,  district: 'Kadıköy' },
  { name: 'Bostancı',                    line_id: 5,  order_number: 8,  district: 'Kadıköy' },
  { name: 'Küçükyalı',                   line_id: 5,  order_number: 9,  district: 'Maltepe' },
  { name: 'Maltepe',                     line_id: 5,  order_number: 10, district: 'Maltepe' },
  { name: 'Huzurevi',                    line_id: 5,  order_number: 11, district: 'Maltepe' },
  { name: 'Gülsuyu',                     line_id: 5,  order_number: 12, district: 'Maltepe' },
  { name: 'Esenkent',                    line_id: 5,  order_number: 13, district: 'Maltepe' },
  { name: 'Hastane-Adliye',              line_id: 5,  order_number: 14, district: 'Maltepe' },
  { name: 'Soğanlık',                    line_id: 5,  order_number: 15, district: 'Kartal' },
  { name: 'Kartal',                      line_id: 5,  order_number: 16, district: 'Kartal' },
  { name: 'Yakacık-Adnan Kahveci',       line_id: 5,  order_number: 17, district: 'Kartal' },
  { name: 'Pendik',                      line_id: 5,  order_number: 18, district: 'Pendik' },
  { name: 'Tavşantepe',                  line_id: 5,  order_number: 19, district: 'Pendik' },
  { name: 'Fevzi Çakmak-Hastane',        line_id: 5,  order_number: 20, district: 'Pendik' },
  { name: 'Yayalar-Şeyhli',              line_id: 5,  order_number: 21, district: 'Pendik' },
  { name: 'Kurtköy',                     line_id: 5,  order_number: 22, district: 'Pendik' },
  { name: 'Sabiha Gökçen Havalimanı',    line_id: 5,  order_number: 23, district: 'Pendik' },

  // M5 — line_id: 6
  { name: 'Üsküdar',                     line_id: 6,  order_number: 1,  district: 'Üsküdar' },
  { name: 'Fıstıkağacı',                 line_id: 6,  order_number: 2,  district: 'Üsküdar' },
  { name: 'Bağlarbaşı',                  line_id: 6,  order_number: 3,  district: 'Üsküdar' },
  { name: 'Altunizade',                  line_id: 6,  order_number: 4,  district: 'Üsküdar' },
  { name: 'Kısıklı',                     line_id: 6,  order_number: 5,  district: 'Üsküdar' },
  { name: 'Bulgurlu',                    line_id: 6,  order_number: 6,  district: 'Üsküdar' },
  { name: 'Ümraniye',                    line_id: 6,  order_number: 7,  district: 'Ümraniye' },
  { name: 'Çarşı',                       line_id: 6,  order_number: 8,  district: 'Ümraniye' },
  { name: 'Yamanevler',                  line_id: 6,  order_number: 9,  district: 'Ümraniye' },
  { name: 'Çakmak',                      line_id: 6,  order_number: 10, district: 'Ümraniye' },
  { name: 'Ihlamurkuyu',                 line_id: 6,  order_number: 11, district: 'Ümraniye' },
  { name: 'Altınşehir',                  line_id: 6,  order_number: 12, district: 'Ümraniye' },
  { name: 'İmam Hatip Lisesi',           line_id: 6,  order_number: 13, district: 'Ümraniye' },
  { name: 'Dudullu',                     line_id: 6,  order_number: 14, district: 'Ümraniye' },
  { name: 'Necip Fazıl',                 line_id: 6,  order_number: 15, district: 'Ümraniye' },
  { name: 'Çekmeköy',                    line_id: 6,  order_number: 16, district: 'Çekmeköy' },
  { name: 'Meclis',                      line_id: 6,  order_number: 17, district: 'Sancaktepe' },
  { name: 'Sarıgazi',                    line_id: 6,  order_number: 18, district: 'Sancaktepe' },
  { name: 'Sancaktepe',                  line_id: 6,  order_number: 19, district: 'Sancaktepe' },
  { name: 'Samandıra Merkez',            line_id: 6,  order_number: 20, district: 'Sancaktepe' },

  // M6 — line_id: 7
  { name: 'Levent',                      line_id: 7,  order_number: 1,  district: 'Beşiktaş' },
  { name: 'Nispetiye',                   line_id: 7,  order_number: 2,  district: 'Beşiktaş' },
  { name: 'Etiler',                      line_id: 7,  order_number: 3,  district: 'Beşiktaş' },
  { name: 'Boğaziçi Ü.-Hisarüstü',       line_id: 7,  order_number: 4,  district: 'Beşiktaş' },

  // M7 — line_id: 8
  { name: 'Yıldız',                      line_id: 8,  order_number: 1,  district: 'Beşiktaş' },
  { name: 'Fulya',                       line_id: 8,  order_number: 2,  district: 'Şişli' },
  { name: 'Mecidiyeköy',                 line_id: 8,  order_number: 3,  district: 'Şişli' },
  { name: 'Çağlayan',                    line_id: 8,  order_number: 4,  district: 'Şişli' },
  { name: 'Kağıthane',                   line_id: 8,  order_number: 5,  district: 'Kağıthane' },
  { name: 'Nurtepe',                     line_id: 8,  order_number: 6,  district: 'Kağıthane' },
  { name: 'Alibeyköy',                   line_id: 8,  order_number: 7,  district: 'Eyüpsultan' },
  { name: 'Çırçır Mahallesi',            line_id: 8,  order_number: 8,  district: 'Eyüpsultan' },
  { name: 'Veysel Karani-Akşemsettin',   line_id: 8,  order_number: 9,  district: 'Eyüpsultan' },
  { name: 'Yeşilpınar',                  line_id: 8,  order_number: 10, district: 'Eyüpsultan' },
  { name: 'Kazım Karabekir',             line_id: 8,  order_number: 11, district: 'Gaziosmanpaşa' },
  { name: 'Yenimahalle',                 line_id: 8,  order_number: 12, district: 'Gaziosmanpaşa' },
  { name: 'Karadeniz Mahallesi',         line_id: 8,  order_number: 13, district: 'Gaziosmanpaşa' },
  { name: 'Tekstilkent-Giyimkent',       line_id: 8,  order_number: 14, district: 'Esenler' },
  { name: 'Oruç Reis',                   line_id: 8,  order_number: 15, district: 'Esenler' },
  { name: 'Göztepe Mahallesi',           line_id: 8,  order_number: 16, district: 'Bağcılar' },
  { name: 'Mahmutbey',                   line_id: 8,  order_number: 17, district: 'Bağcılar' },

  // M8 — line_id: 9
  { name: 'Bostancı',                    line_id: 9,  order_number: 1,  district: 'Kadıköy' },
  { name: 'Emin Ali Paşa',               line_id: 9,  order_number: 2,  district: 'Kadıköy' },
  { name: 'Ayşekadın',                   line_id: 9,  order_number: 3,  district: 'Kadıköy' },
  { name: 'Kozyatağı',                   line_id: 9,  order_number: 4,  district: 'Kadıköy' },
  { name: 'Küçükbakkalköy',              line_id: 9,  order_number: 5,  district: 'Ataşehir' },
  { name: 'İçerenköy',                   line_id: 9,  order_number: 6,  district: 'Ataşehir' },
  { name: 'Kayışdağı',                   line_id: 9,  order_number: 7,  district: 'Ataşehir' },
  { name: 'Mevlana',                     line_id: 9,  order_number: 8,  district: 'Ataşehir' },
  { name: 'İMES',                        line_id: 9,  order_number: 9,  district: 'Ümraniye' },
  { name: 'MODOKO-KEYAP',                line_id: 9,  order_number: 10, district: 'Ümraniye' },
  { name: 'Dudullu',                     line_id: 9,  order_number: 11, district: 'Ümraniye' },
  { name: 'Huzur',                       line_id: 9,  order_number: 12, district: 'Ümraniye' },
  { name: 'Parseller',                   line_id: 9,  order_number: 13, district: 'Ümraniye' },

  // M9 — line_id: 10
  { name: 'Ataköy',                      line_id: 10, order_number: 1,  district: 'Bakırköy' },
  { name: 'Yenibosna',                   line_id: 10, order_number: 2,  district: 'Bahçelievler' },
  { name: 'Çobançeşme',                  line_id: 10, order_number: 3,  district: 'Bahçelievler' },
  { name: '29 Ekim Cumhuriyet',          line_id: 10, order_number: 4,  district: 'Bahçelievler' },
  { name: 'Doğu Sanayi',                 line_id: 10, order_number: 5,  district: 'Bahçelievler' },
  { name: 'Mimar Sinan',                 line_id: 10, order_number: 6,  district: 'Bağcılar' },
  { name: '15 Temmuz',                   line_id: 10, order_number: 7,  district: 'Bağcılar' },
  { name: 'Halkalı Caddesi',             line_id: 10, order_number: 8,  district: 'Bağcılar' },
  { name: 'Atatürk Mahallesi',           line_id: 10, order_number: 9,  district: 'Küçükçekmece' },
  { name: 'Bahariye',                    line_id: 10, order_number: 10, district: 'Küçükçekmece' },
  { name: 'MASKO',                       line_id: 10, order_number: 11, district: 'Başakşehir' },
  { name: 'İkitelli Sanayi',             line_id: 10, order_number: 12, district: 'Başakşehir' },
  { name: 'Ziya Gökalp Mahallesi',       line_id: 10, order_number: 13, district: 'Başakşehir' },
  { name: 'Olimpiyat',                   line_id: 10, order_number: 14, district: 'Başakşehir' },

  // M11 — line_id: 11
  { name: 'Gayrettepe',                  line_id: 11, order_number: 1,  district: 'Şişli' },
  { name: 'Kâğıthane',                   line_id: 11, order_number: 2,  district: 'Kağıthane' },
  { name: 'Hasdal',                      line_id: 11, order_number: 3,  district: 'Eyüpsultan' },
  { name: 'Kemerburgaz',                 line_id: 11, order_number: 4,  district: 'Eyüpsultan' },
  { name: 'Göktürk',                     line_id: 11, order_number: 5,  district: 'Eyüpsultan' },
  { name: 'İhsaniye',                    line_id: 11, order_number: 6,  district: 'Eyüpsultan' },
  { name: 'Terminal 2',                  line_id: 11, order_number: 7,  district: 'Arnavutköy' },
  { name: 'İstanbul Havalimanı',         line_id: 11, order_number: 8,  district: 'Arnavutköy' },
  { name: 'Kargo Terminali',             line_id: 11, order_number: 9,  district: 'Arnavutköy' },
  { name: 'Taşoluk',                     line_id: 11, order_number: 10, district: 'Arnavutköy' },
  { name: 'Arnavutköy',                  line_id: 11, order_number: 11, district: 'Arnavutköy' },

  // T1 — line_id: 12
  { name: 'Kabataş',                     line_id: 12, order_number: 1,  district: 'Beyoğlu' },
  { name: 'Fındıklı-Mimar Sinan Ü.',     line_id: 12, order_number: 2,  district: 'Beyoğlu' },
  { name: 'Tophane',                     line_id: 12, order_number: 3,  district: 'Beyoğlu' },
  { name: 'Karaköy',                     line_id: 12, order_number: 4,  district: 'Beyoğlu' },
  { name: 'Eminönü',                     line_id: 12, order_number: 5,  district: 'Fatih' },
  { name: 'Sirkeci',                     line_id: 12, order_number: 6,  district: 'Fatih' },
  { name: 'Gülhane',                     line_id: 12, order_number: 7,  district: 'Fatih' },
  { name: 'Sultanahmet',                 line_id: 12, order_number: 8,  district: 'Fatih' },
  { name: 'Çemberlitaş',                 line_id: 12, order_number: 9,  district: 'Fatih' },
  { name: 'Beyazıt-Kapalıçarşı',         line_id: 12, order_number: 10, district: 'Fatih' },
  { name: 'Laleli-İstanbul Ü.',          line_id: 12, order_number: 11, district: 'Fatih' },
  { name: 'Aksaray',                     line_id: 12, order_number: 12, district: 'Fatih' },
  { name: 'Yusufpaşa',                   line_id: 12, order_number: 13, district: 'Fatih' },
  { name: 'Haseki',                      line_id: 12, order_number: 14, district: 'Fatih' },
  { name: 'Fındıkzade',                  line_id: 12, order_number: 15, district: 'Fatih' },
  { name: 'Çapa-Şehremini',              line_id: 12, order_number: 16, district: 'Fatih' },
  { name: 'Pazartekke',                  line_id: 12, order_number: 17, district: 'Fatih' },
  { name: 'Topkapı',                     line_id: 12, order_number: 18, district: 'Fatih' },
  { name: 'Cevizlibağ-AÖY',              line_id: 12, order_number: 19, district: 'Zeytinburnu' },
  { name: 'Merkezefendi',                line_id: 12, order_number: 20, district: 'Zeytinburnu' },
  { name: 'Seyitnizam-Akşemsettin',      line_id: 12, order_number: 21, district: 'Zeytinburnu' },
  { name: 'Mithatpaşa',                  line_id: 12, order_number: 22, district: 'Zeytinburnu' },
  { name: 'Zeytinburnu',                 line_id: 12, order_number: 23, district: 'Bakırköy' },
  { name: 'Mehmet Akif',                 line_id: 12, order_number: 24, district: 'Güngören' },
  { name: 'Merter Tekstil Merkezi',      line_id: 12, order_number: 25, district: 'Güngören' },
  { name: 'Güngören',                    line_id: 12, order_number: 26, district: 'Güngören' },
  { name: 'Akıncılar',                   line_id: 12, order_number: 27, district: 'Güngören' },
  { name: 'Soğanlı',                     line_id: 12, order_number: 28, district: 'Güngören' },
  { name: 'Yavuzselim',                  line_id: 12, order_number: 29, district: 'Bağcılar' },
  { name: 'Güneştepe',                   line_id: 12, order_number: 30, district: 'Bağcılar' },
  { name: 'Bağcılar',                    line_id: 12, order_number: 31, district: 'Bağcılar' },

  // T3 — line_id: 13
  { name: 'Kadıköy İDO',                 line_id: 13, order_number: 1,  district: 'Kadıköy' },
  { name: 'İskele Camii',                line_id: 13, order_number: 2,  district: 'Kadıköy' },
  { name: 'Çarşı',                       line_id: 13, order_number: 3,  district: 'Kadıköy' },
  { name: 'Altıyol',                     line_id: 13, order_number: 4,  district: 'Kadıköy' },
  { name: 'Bahariye',                    line_id: 13, order_number: 5,  district: 'Kadıköy' },
  { name: 'Kilise',                      line_id: 13, order_number: 6,  district: 'Kadıköy' },
  { name: 'Moda İlkokulu',               line_id: 13, order_number: 7,  district: 'Kadıköy' },
  { name: 'Moda',                        line_id: 13, order_number: 8,  district: 'Kadıköy' },
  { name: 'Rızapaşa',                    line_id: 13, order_number: 9,  district: 'Kadıköy' },
  { name: 'Mühürdar',                    line_id: 13, order_number: 10, district: 'Kadıköy' },
  { name: 'Damga Sokak',                 line_id: 13, order_number: 11, district: 'Kadıköy' },

  // T4 — line_id: 14
  { name: 'Topkapı',                     line_id: 14, order_number: 1,  district: 'Zeytinburnu' },
  { name: 'Fetihkapı',                   line_id: 14, order_number: 2,  district: 'Zeytinburnu' },
  { name: 'Vatan',                       line_id: 14, order_number: 3,  district: 'Eyüpsultan' },
  { name: 'Edirnekapı',                  line_id: 14, order_number: 4,  district: 'Eyüpsultan' },
  { name: 'Şehitlik',                    line_id: 14, order_number: 5,  district: 'Eyüpsultan' },
  { name: 'Demirkapı',                   line_id: 14, order_number: 6,  district: 'Eyüpsultan' },
  { name: 'Topçular',                    line_id: 14, order_number: 7,  district: 'Eyüpsultan' },
  { name: 'Rami',                        line_id: 14, order_number: 8,  district: 'Eyüpsultan' },
  { name: 'Uluyol Bereç',                line_id: 14, order_number: 9,  district: 'Gaziosmanpaşa' },
  { name: 'Sağmalcılar',                 line_id: 14, order_number: 10, district: 'Gaziosmanpaşa' },
  { name: 'Bosna Çukurçeşme',            line_id: 14, order_number: 11, district: 'Gaziosmanpaşa' },
  { name: 'Ali Fuat Başgil',             line_id: 14, order_number: 12, district: 'Gaziosmanpaşa' },
  { name: 'Taşköprü',                    line_id: 14, order_number: 13, district: 'Gaziosmanpaşa' },
  { name: 'Karadeniz',                   line_id: 14, order_number: 14, district: 'Gaziosmanpaşa' },
  { name: 'Kiptaş-Venezia',              line_id: 14, order_number: 15, district: 'Gaziosmanpaşa' },
  { name: 'Cumhuriyet Mahallesi',        line_id: 14, order_number: 16, district: 'Sultangazi' },
  { name: '50.Yıl-Baştabya',             line_id: 14, order_number: 17, district: 'Sultangazi' },
  { name: 'Hacı Şükrü',                  line_id: 14, order_number: 18, district: 'Sultangazi' },
  { name: 'Yenimahalle',                 line_id: 14, order_number: 19, district: 'Sultangazi' },
  { name: 'Sultançiftliği',              line_id: 14, order_number: 20, district: 'Sultangazi' },
  { name: 'Cebeci',                      line_id: 14, order_number: 21, district: 'Sultangazi' },
  { name: 'Mescid-i Selam',              line_id: 14, order_number: 22, district: 'Sultangazi' },

  // T5 — line_id: 15
  { name: 'Eminönü',                     line_id: 15, order_number: 1,  district: 'Fatih' },
  { name: 'Küçükpazar',                  line_id: 15, order_number: 2,  district: 'Fatih' },
  { name: 'Cibali',                      line_id: 15, order_number: 3,  district: 'Fatih' },
  { name: 'Fener',                       line_id: 15, order_number: 4,  district: 'Fatih' },
  { name: 'Balat',                       line_id: 15, order_number: 5,  district: 'Fatih' },
  { name: 'Ayvansaray',                  line_id: 15, order_number: 6,  district: 'Fatih' },
  { name: 'Feshane',                     line_id: 15, order_number: 7,  district: 'Eyüpsultan' },
  { name: 'Eyüpsultan Teleferik',        line_id: 15, order_number: 8,  district: 'Eyüpsultan' },
  { name: 'Eyüpsultan Devlet Hastanesi', line_id: 15, order_number: 9,  district: 'Eyüpsultan' },
  { name: 'Silahtarağa Mahallesi',       line_id: 15, order_number: 10, district: 'Eyüpsultan' },
  { name: 'Üniversite',                  line_id: 15, order_number: 11, district: 'Eyüpsultan' },
  { name: 'Alibeyköy Merkez',            line_id: 15, order_number: 12, district: 'Eyüpsultan' },
  { name: 'Alibeyköy Metro',             line_id: 15, order_number: 13, district: 'Eyüpsultan' },
  { name: 'Alibeyköy Cep Otogarı',       line_id: 15, order_number: 14, district: 'Eyüpsultan' },

  // Marmaray B1 — line_id: 16
  { name: 'Halkalı',                     line_id: 16, order_number: 1,  district: 'Küçükçekmece' },
  { name: 'Mustafa Kemal',               line_id: 16, order_number: 2,  district: 'Küçükçekmece' },
  { name: 'Küçükçekmece',                line_id: 16, order_number: 3,  district: 'Küçükçekmece' },
  { name: 'Florya',                      line_id: 16, order_number: 4,  district: 'Bakırköy' },
  { name: 'Florya Akvaryum',             line_id: 16, order_number: 5,  district: 'Bakırköy' },
  { name: 'Yeşilköy',                    line_id: 16, order_number: 6,  district: 'Bakırköy' },
  { name: 'Yeşilyurt',                   line_id: 16, order_number: 7,  district: 'Bakırköy' },
  { name: 'Ataköy',                      line_id: 16, order_number: 8,  district: 'Bakırköy' },
  { name: 'Bakırköy',                    line_id: 16, order_number: 9,  district: 'Bakırköy' },
  { name: 'Yenimahalle',                 line_id: 16, order_number: 10, district: 'Bakırköy' },
  { name: 'Zeytinburnu',                 line_id: 16, order_number: 11, district: 'Zeytinburnu' },
  { name: 'Kazlıçeşme',                  line_id: 16, order_number: 12, district: 'Zeytinburnu' },
  { name: 'Yenikapı',                    line_id: 16, order_number: 13, district: 'Fatih' },
  { name: 'Sirkeci',                     line_id: 16, order_number: 14, district: 'Fatih' },
  { name: 'Üsküdar',                     line_id: 16, order_number: 15, district: 'Üsküdar' },
  { name: 'Ayrılık Çeşmesi',             line_id: 16, order_number: 16, district: 'Kadıköy' },
  { name: 'Söğütlüçeşme',                line_id: 16, order_number: 17, district: 'Kadıköy' },
  { name: 'Feneryolu',                   line_id: 16, order_number: 18, district: 'Kadıköy' },
  { name: 'Göztepe',                     line_id: 16, order_number: 19, district: 'Kadıköy' },
  { name: 'Erenköy',                     line_id: 16, order_number: 20, district: 'Kadıköy' },
  { name: 'Suadiye',                     line_id: 16, order_number: 21, district: 'Kadıköy' },
  { name: 'Bostancı',                    line_id: 16, order_number: 22, district: 'Kadıköy' },
  { name: 'Küçükyalı',                   line_id: 16, order_number: 23, district: 'Maltepe' },
  { name: 'İdealtepe',                   line_id: 16, order_number: 24, district: 'Maltepe' },
  { name: 'Süreyya Plajı',               line_id: 16, order_number: 25, district: 'Maltepe' },
  { name: 'Maltepe',                     line_id: 16, order_number: 26, district: 'Maltepe' },
  { name: 'Cevizli',                     line_id: 16, order_number: 27, district: 'Maltepe' },
  { name: 'Atalar',                      line_id: 16, order_number: 28, district: 'Kartal' },
  { name: 'Başak',                       line_id: 16, order_number: 29, district: 'Kartal' },
  { name: 'Kartal',                      line_id: 16, order_number: 30, district: 'Kartal' },
  { name: 'Yunus',                       line_id: 16, order_number: 31, district: 'Kartal' },
  { name: 'Pendik',                      line_id: 16, order_number: 32, district: 'Pendik' },
  { name: 'Kaynarca',                    line_id: 16, order_number: 33, district: 'Pendik' },
  { name: 'Tersane',                     line_id: 16, order_number: 34, district: 'Pendik' },
  { name: 'Güzelyalı',                   line_id: 16, order_number: 35, district: 'Pendik' },
  { name: 'Aydıntepe',                   line_id: 16, order_number: 36, district: 'Tuzla' },
  { name: 'İçmeler',                     line_id: 16, order_number: 37, district: 'Tuzla' },
  { name: 'Tuzla',                       line_id: 16, order_number: 38, district: 'Tuzla' },
  { name: 'Çayırova',                    line_id: 16, order_number: 39, district: 'Çayırova' },
  { name: 'Fatih',                       line_id: 16, order_number: 40, district: 'Gebze' },
  { name: 'Osmangazi',                   line_id: 16, order_number: 41, district: 'Darıca' },
  { name: 'Darıca',                      line_id: 16, order_number: 42, district: 'Darıca' },
  { name: 'Gebze',                       line_id: 16, order_number: 43, district: 'Gebze' },

  // Marmaray B2 — line_id: 17
  { name: 'Halkalı',                     line_id: 17, order_number: 1,  district: 'Küçükçekmece' },
  { name: 'Konutbirlik',                 line_id: 17, order_number: 2,  district: 'Küçükçekmece' },
  { name: 'Altınşehir',                  line_id: 17, order_number: 3,  district: 'Başakşehir' },
  { name: 'Ispartakule',                 line_id: 17, order_number: 4,  district: 'Avcılar' },
  { name: 'Bahçeşehir',                  line_id: 17, order_number: 5,  district: 'Başakşehir' },

  // Metrobüs — line_id: 18
  { name: 'Beylikdüzü (TÜYAP)',          line_id: 18, order_number: 1,  district: 'Büyükçekmece' },
  { name: 'Beykent',                     line_id: 18, order_number: 2,  district: 'Beylikdüzü' },
  { name: 'Cumhuriyet Mh.',              line_id: 18, order_number: 3,  district: 'Beylikdüzü' },
  { name: 'Beylikdüzü Belediye',         line_id: 18, order_number: 4,  district: 'Beylikdüzü' },
  { name: 'Beylikdüzü',                  line_id: 18, order_number: 5,  district: 'Beylikdüzü' },
  { name: 'Güzelyurt',                   line_id: 18, order_number: 6,  district: 'Esenyurt' },
  { name: 'Haramidere',                  line_id: 18, order_number: 7,  district: 'Esenyurt' },
  { name: 'Haramidere Sanayi',           line_id: 18, order_number: 8,  district: 'Esenyurt' },
  { name: 'Saadetdere Mh.',              line_id: 18, order_number: 9,  district: 'Esenyurt' },
  { name: 'Mustafa Kemalpaşa',           line_id: 18, order_number: 10, district: 'Avcılar' },
  { name: 'Cihangir',                    line_id: 18, order_number: 11, district: 'Avcılar' },
  { name: 'Avcılar Üni Kampüsü',         line_id: 18, order_number: 12, district: 'Avcılar' },
  { name: 'Şükrübey',                    line_id: 18, order_number: 13, district: 'Avcılar' },
  { name: 'İBB Sosyal Tesisleri',        line_id: 18, order_number: 14, district: 'Avcılar' },
  { name: 'Küçükçekmece',                line_id: 18, order_number: 15, district: 'Küçükçekmece' },
  { name: 'Cennet Mh.',                  line_id: 18, order_number: 16, district: 'Küçükçekmece' },
  { name: 'Florya',                      line_id: 18, order_number: 17, district: 'Küçükçekmece' },
  { name: 'Beşyol',                      line_id: 18, order_number: 18, district: 'Küçükçekmece' },
  { name: 'Sefaköy',                     line_id: 18, order_number: 19, district: 'Küçükçekmece' },
  { name: 'Yenibosna',                   line_id: 18, order_number: 20, district: 'Bahçelievler' },
  { name: 'Şirinevler',                  line_id: 18, order_number: 21, district: 'Bahçelievler' },
  { name: 'Bahçelievler',                line_id: 18, order_number: 22, district: 'Bahçelievler' },
  { name: 'İncirli - Ömür',              line_id: 18, order_number: 23, district: 'Bakırköy' },
  { name: 'Zeytinburnu',                 line_id: 18, order_number: 24, district: 'Bakırköy' },
  { name: 'Merter',                      line_id: 18, order_number: 25, district: 'Güngören' },
  { name: 'Cevizlibağ',                  line_id: 18, order_number: 26, district: 'Zeytinburnu' },
  { name: 'Topkapı',                     line_id: 18, order_number: 27, district: 'Zeytinburnu' },
  { name: 'Maltepe',                     line_id: 18, order_number: 28, district: 'Zeytinburnu' },
  { name: 'Edirnekapı',                  line_id: 18, order_number: 29, district: 'Eyüpsultan' },
  { name: 'Ayvansaray - Eyüpsultan',     line_id: 18, order_number: 30, district: 'Eyüpsultan' },
  { name: 'Halıcıoğlu',                  line_id: 18, order_number: 31, district: 'Beyoğlu' },
  { name: 'Okmeydanı',                   line_id: 18, order_number: 32, district: 'Kâğıthane' },
  { name: 'Darülaceze - PERPA',          line_id: 18, order_number: 33, district: 'Şişli' },
  { name: 'Okmeydanı Hastane',           line_id: 18, order_number: 34, district: 'Şişli' },
  { name: 'Çağlayan (Adliye)',           line_id: 18, order_number: 35, district: 'Şişli' },
  { name: 'Mecidiyeköy',                 line_id: 18, order_number: 36, district: 'Şişli' },
  { name: 'Zincirlikuyu',                line_id: 18, order_number: 37, district: 'Beşiktaş' },
  { name: 'Şehitler Köprüsü',            line_id: 18, order_number: 38, district: 'Üsküdar' },
  { name: 'Burhaniye',                   line_id: 18, order_number: 39, district: 'Üsküdar' },
  { name: 'Altunizade',                  line_id: 18, order_number: 40, district: 'Üsküdar' },
  { name: 'Acıbadem',                    line_id: 18, order_number: 41, district: 'Üsküdar' },
  { name: 'Uzunçayır',                   line_id: 18, order_number: 42, district: 'Kadıköy' },
  { name: 'Fikirtepe',                   line_id: 18, order_number: 43, district: 'Kadıköy' },
  { name: 'Söğütlüçeşme (Kadıköy)',      line_id: 18, order_number: 44, district: 'Kadıköy' },
];

const insertStations = db.transaction((stations) => {
  for (const station of stations) insertStation.run(station);
});

insertStations(stations);

console.log('Seed completed.');
console.log(`  Lines inserted    : ${lines.length}`);
console.log(`  Stations inserted : ${stations.length}`);