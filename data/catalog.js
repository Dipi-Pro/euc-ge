/* ==========================================================================
   MONO.GE-ის კატალოგი — ერთადერთი ფაილი, რომელიც ფასების შესაცვლელად გჭირდება.

   priceGel     — მიმდინარე ფასი ლარში (მთელი რიცხვი, გამყოფების გარეშე)
   oldPriceGel  — ძველი, გადახაზული ფასი; null, თუ ფასდაკლება არ არის
   badge        — წარწერა ფოტოზე. დასაშვები მნიშვნელობები:
                  flagship, new, sale, range, offroad, bestseller, beginner, null
   stock        — "in" (მარაგშია) ან "order" (შეკვეთით)
   ka / en      — ქართული და ინგლისური ტექსტი; ორივე უნდა შეავსო
   images       — ფაილების სახელები assets/wheels/ საქაღალდიდან

   შენახვისას სინტაქსი დაცული უნდა იყოს (ბრჭყალები, მძიმეები),
   თორემ საიტი მოდელებს ვერ ჩაიტვირთავს.
   ========================================================================== */
window.CATALOG = {
  "meta": {
    "shop": "MONO.GE",
    "currency": "GEL",
    "updated": "2026-08-23",
    "fxUsdGel": 2.7,
    "installmentMonths": 12,
    "installmentRate": 1.09
  },
  "brands": [
    {
      "id": "nosfet",
      "name": "NOSFET",
      "tagline": {
        "ka": "მაღალვოლტიანი ახალი თაობა",
        "en": "The new high-voltage generation"
      },
      "blurb": {
        "ka": "მაგნიუმის ჩარჩო, 126V და 151V პლატფორმები, ევროპული აწყობის ხარისხი.",
        "en": "Magnesium frames, 126V and 151V platforms, European assembly standards."
      }
    },
    {
      "id": "leaperkim",
      "name": "LEAPERKIM",
      "tagline": {
        "ka": "Veteran სერია: გარბენი და ამორტიზაცია",
        "en": "The Veteran series: range and suspension"
      },
      "blurb": {
        "ka": "შორ მანძილზე მოსიარულეების არჩევანი. 4700 Wh-მდე ბატარეა და ჩარჩო, რომელიც უსწორმასწორო გზას ითმენს.",
        "en": "What long-distance riders pick. Up to 4700 Wh and a frame that tolerates broken tarmac."
      }
    },
    {
      "id": "inmotion",
      "name": "INMOTION",
      "tagline": {
        "ka": "ჭკვიანი ელექტრონიკა, ქარხნული ხარისხი",
        "en": "Smart electronics, factory finish"
      },
      "blurb": {
        "ka": "ყველაზე დახვეწილი პროგრამული უზრუნველყოფა და უსაფრთხოების სისტემები.",
        "en": "The most refined firmware and rider safety systems on the market."
      }
    },
    {
      "id": "kingsong",
      "name": "KINGSONG",
      "tagline": {
        "ka": "ქალაქი და ოფ-როუდი ერთ ხაზში",
        "en": "City and off-road in one line-up"
      },
      "blurb": {
        "ka": "დაბალანსებული მოდელები დამწყებიდან ფლაგმანამდე, ნაწილების კარგი ხელმისაწვდომობით.",
        "en": "Balanced models from beginner to flagship, with parts that are easy to source."
      }
    }
  ],
  "wheels": [
    {
      "id": "nosfet-apex",
      "brand": "nosfet",
      "model": "Apex",
      "badge": "flagship",
      "stock": "in",
      "priceGel": 9990,
      "oldPriceGel": null,
      "blurb": {
        "ka": "3200 W ძრავი და 2700 Wh Samsung-ის ბატარეა. Apex არის Nosfet-ის ყველაზე მძლავრი მოდელი, შექმნილი მაღალი სიჩქარისა და შორი მარშრუტისთვის.",
        "en": "A 3200 W motor and a 2700 Wh Samsung pack. The Apex is Nosfet's most powerful wheel, built for high speed and long routes."
      },
      "specs": { "motorW": 3200, "peakW": 10000, "batteryWh": 2700, "voltage": 151, "topSpeedKmh": 90, "rangeKm": 130, "tire": "20″", "weightKg": 40, "suspensionMm": 130 },
      "images": ["nosfet-apex-1.webp", "nosfet-apex-2.webp", "nosfet-apex-3.webp"]
    },
    {
      "id": "nosfet-xeno",
      "brand": "nosfet",
      "model": "Xeno",
      "badge": "new",
      "stock": "in",
      "priceGel": 8090,
      "oldPriceGel": null,
      "blurb": {
        "ka": "2500 W და 2200 Wh 126V პლატფორმაზე. Xeno ავსებს ადგილს Apex-სა და Aeon-ს შორის: მძლავრია, მაგრამ ჯერ კიდევ მსუბუქი სამართავად.",
        "en": "2500 W and 2200 Wh on the 126V platform. The Xeno fills the gap between Apex and Aeon: strong, still light enough to throw around."
      },
      "specs": { "motorW": 2500, "peakW": 7000, "batteryWh": 2200, "voltage": 126, "topSpeedKmh": 80, "rangeKm": 110, "tire": "18″", "weightKg": 35, "suspensionMm": 100 },
      "images": ["nosfet-xeno-1.webp", "nosfet-xeno-2.webp", "nosfet-xeno-3.webp"]
    },
    {
      "id": "nosfet-aeon",
      "brand": "nosfet",
      "model": "Aeon",
      "badge": null,
      "stock": "in",
      "priceGel": 6190,
      "oldPriceGel": 6690,
      "blurb": {
        "ka": "151V, 1300 Wh და 2200 W ძრავი 12-ინჩიან ბორბალზე. ყველაზე მოქნილი მოდელი ქალაქისთვის: მსუბუქია, სიჩქარეს კი არ იკლებს.",
        "en": "151V, 1300 Wh and a 2200 W motor on a 12-inch wheel. The most agile pick for the city, and it gives up almost no speed."
      },
      "specs": { "motorW": 2200, "peakW": 4600, "batteryWh": 1300, "voltage": 151, "topSpeedKmh": 90, "rangeKm": 70, "tire": "12″", "weightKg": 28, "suspensionMm": 90 },
      "images": ["nosfet-aeon-1.webp", "nosfet-aeon-2.webp", "nosfet-aeon-3.webp"]
    },
    {
      "id": "nosfet-aero",
      "brand": "nosfet",
      "model": "Aero",
      "badge": null,
      "stock": "in",
      "priceGel": 5090,
      "oldPriceGel": null,
      "blurb": {
        "ka": "24.5 კგ, მაგნიუმის ჩარჩო და 70 მმ ამორტიზაცია. Aero-ს მთავარი უპირატესობა წონაა: მანქანის საბარგულში და ლიფტში პრობლემის გარეშე ჯდება.",
        "en": "24.5 kg, magnesium frame, 70 mm of suspension. Weight is the Aero's whole argument: it fits a car boot and a lift without a fight."
      },
      "specs": { "motorW": 2000, "peakW": 5000, "batteryWh": 1110, "voltage": 126, "topSpeedKmh": 70, "rangeKm": 60, "tire": "14″", "weightKg": 24.5, "suspensionMm": 70 },
      "images": ["nosfet-aero-1.webp", "nosfet-aero-2.webp", "nosfet-aero-3.webp"]
    },
    {
      "id": "leaperkim-oryx",
      "brand": "leaperkim",
      "model": "Veteran Oryx",
      "badge": "flagship",
      "stock": "order",
      "priceGel": 12150,
      "oldPriceGel": 12890,
      "blurb": {
        "ka": "176V, 4700 Wh და 4200 W ძრავი 16-ინჩიან მოტოციკლის საბურავზე. Oryx ყველაზე დიდი და ყველაზე სტაბილური მონოციკლია, რაც Leaperkim-ს გამოუშვია.",
        "en": "176V, 4700 Wh and a 4200 W motor on a 16-inch motorcycle tyre. The Oryx is the largest, steadiest wheel Leaperkim has built."
      },
      "specs": { "motorW": 4200, "peakW": 10500, "batteryWh": 4700, "voltage": 176, "topSpeedKmh": 110, "rangeKm": 200, "tire": "3.50-16", "weightKg": 58, "suspensionMm": 150 },
      "images": ["leaperkim-oryx-1.webp", "leaperkim-oryx-2.webp", "leaperkim-oryx-3.webp"]
    },
    {
      "id": "leaperkim-sherman-l",
      "brand": "leaperkim",
      "model": "Sherman-L SE",
      "badge": "range",
      "stock": "in",
      "priceGel": 10490,
      "oldPriceGel": null,
      "blurb": {
        "ka": "4000 Wh ბატარეა და 90 მმ ამორტიზაცია. Sherman-L არჩევანია მათთვის, ვისაც ერთი დატენვით მთელი დღე უნდა იაროს.",
        "en": "A 4000 Wh pack and 90 mm of suspension. The Sherman-L is for riders who want a whole day out of one charge."
      },
      "specs": { "motorW": 3000, "peakW": 8000, "batteryWh": 4000, "voltage": 151, "topSpeedKmh": 100, "rangeKm": 220, "tire": "80/90-14", "weightKg": 50, "suspensionMm": 90 },
      "images": ["leaperkim-sherman-l-1.webp", "leaperkim-sherman-l-2.webp", "leaperkim-sherman-l-3.webp"]
    },
    {
      "id": "leaperkim-lynx-s",
      "brand": "leaperkim",
      "model": "Veteran Lynx-S",
      "badge": "offroad",
      "stock": "in",
      "priceGel": 9990,
      "oldPriceGel": null,
      "blurb": {
        "ka": "3800 W ძრავი (10000 W პიკზე), 2700 Wh და სრული ამორტიზაცია 20-ინჩიან ბორბალზე. თბილისის ორმოებსა და მთის ბილიკებზე გათვლილი მოდელი.",
        "en": "3800 W (10000 W peak), 2700 Wh and full suspension on a 20-inch wheel. Built for Tbilisi potholes and mountain trails alike."
      },
      "specs": { "motorW": 3800, "peakW": 10000, "batteryWh": 2700, "voltage": 151, "topSpeedKmh": 100, "rangeKm": 140, "tire": "80/90-14", "weightKg": 46, "suspensionMm": 140 },
      "images": ["leaperkim-lynx-s-1.webp", "leaperkim-lynx-s-2.webp", "leaperkim-lynx-s-3.webp"]
    },
    {
      "id": "leaperkim-patton-s",
      "brand": "leaperkim",
      "model": "Patton-S",
      "badge": null,
      "stock": "in",
      "priceGel": 7690,
      "oldPriceGel": 7990,
      "blurb": {
        "ka": "126V, 2220 Wh და 3000 W ძრავი 16-ინჩიან ბორბალზე. Patton-S მოქნილობისა და სიმძლავრის ბალანსით Leaperkim-ის ყველაზე პოპულარული მოდელია.",
        "en": "126V, 2220 Wh and 3000 W on a 16-inch wheel. The balance of agility and power makes the Patton-S Leaperkim's most popular model."
      },
      "specs": { "motorW": 3000, "peakW": 8000, "batteryWh": 2220, "voltage": 126, "topSpeedKmh": 85, "rangeKm": 110, "tire": "16″", "weightKg": 38, "suspensionMm": 100 },
      "images": ["leaperkim-patton-s-1.webp", "leaperkim-patton-s-2.webp", "leaperkim-patton-s-3.webp"]
    },
    {
      "id": "inmotion-p6",
      "brand": "inmotion",
      "model": "P6",
      "badge": "flagship",
      "stock": "order",
      "priceGel": 13490,
      "oldPriceGel": null,
      "blurb": {
        "ka": "235V, 4200 Wh და 6000 W ძრავი 20000 W პიკით. P6 ყველაზე მძლავრი სერიული მონოციკლია ბაზარზე, გამოცდილი მოსიარულეებისთვის.",
        "en": "235V, 4200 Wh and 6000 W with a 20000 W peak. The P6 is the most powerful production wheel on sale, and it is for experienced riders."
      },
      "specs": { "motorW": 6000, "peakW": 20000, "batteryWh": 4200, "voltage": 235, "topSpeedKmh": 110, "rangeKm": 150, "tire": "16″", "weightKg": 55, "suspensionMm": 160 },
      "images": ["inmotion-p6-1.webp", "inmotion-p6-2.webp", "inmotion-p6-3.webp"]
    },
    {
      "id": "inmotion-v14-pro",
      "brand": "inmotion",
      "model": "V14 Pro Adventure",
      "badge": "bestseller",
      "stock": "in",
      "priceGel": 7290,
      "oldPriceGel": 8890,
      "blurb": {
        "ka": "4000 W ძრავი, 2400 Wh ბატარეა და დასაჯდომი სტანდარტულ კომპლექტში. V14 Pro ერთდროულად ქალაქური და ოფ-როუდ მოდელია.",
        "en": "4000 W, a 2400 Wh pack and a seat in the box. The V14 Pro works as a city wheel and an off-road wheel without changing anything."
      },
      "specs": { "motorW": 4000, "peakW": 9000, "batteryWh": 2400, "voltage": 151, "topSpeedKmh": 80, "rangeKm": 120, "tire": "16″", "weightKg": 40, "suspensionMm": 120 },
      "images": ["inmotion-v14-pro-1.webp", "inmotion-v14-pro-2.webp", "inmotion-v14-pro-3.webp"]
    },
    {
      "id": "inmotion-v12s",
      "brand": "inmotion",
      "model": "V12S",
      "badge": null,
      "stock": "in",
      "priceGel": 5390,
      "oldPriceGel": null,
      "blurb": {
        "ka": "2500 W ძრავი მკაცრ ჩარჩოზე, ამორტიზაციის გარეშე. V12S ქალაქური სიარულისთვის ერთ-ერთი ყველაზე გამძლე და მარტივად მოსავლელი მოდელია.",
        "en": "2500 W on a rigid frame, no suspension to service. The V12S is one of the toughest, simplest city wheels you can own."
      },
      "specs": { "motorW": 2500, "peakW": 6000, "batteryWh": 1750, "voltage": 126, "topSpeedKmh": 70, "rangeKm": 100, "tire": "16″", "weightKg": 30, "suspensionMm": 0 },
      "images": ["inmotion-v12s-1.webp", "inmotion-v12s-2.webp", "inmotion-v12s-3.webp"]
    },
    {
      "id": "inmotion-v11y",
      "brand": "inmotion",
      "model": "V11Y",
      "badge": "beginner",
      "stock": "in",
      "priceGel": 3790,
      "oldPriceGel": null,
      "blurb": {
        "ka": "ჰაერზე მომუშავე ამორტიზაცია და 18-ინჩიანი ბორბალი შედარებით დაბალ ფასად. კარგი პირველი მონოციკლი, რომელიც მაშინვე გადასაცვლელი არ გახდება.",
        "en": "Air suspension and an 18-inch wheel at the low end of the range. A first wheel you will not want to replace after one month."
      },
      "specs": { "motorW": 2000, "peakW": 4500, "batteryWh": 1500, "voltage": 84, "topSpeedKmh": 55, "rangeKm": 90, "tire": "18″", "weightKg": 28, "suspensionMm": 60 },
      "images": ["inmotion-v11y-1.webp", "inmotion-v11y-2.webp", "inmotion-v11y-3.webp"]
    },
    {
      "id": "kingsong-f22-pro",
      "brand": "kingsong",
      "model": "F22 Pro",
      "badge": "flagship",
      "stock": "in",
      "priceGel": 9450,
      "oldPriceGel": null,
      "blurb": {
        "ka": "176V პლატფორმა, 2700 Wh და გრძელსვლიანი ამორტიზაცია. F22 Pro KingSong-ის პასუხია ოფ-როუდ ფლაგმანების კლასზე.",
        "en": "The 176V platform, 2700 Wh and long-travel suspension. The F22 Pro is KingSong's answer to the off-road flagship class."
      },
      "specs": { "motorW": 4500, "peakW": 11000, "batteryWh": 2700, "voltage": 176, "topSpeedKmh": 100, "rangeKm": 140, "tire": "20″", "weightKg": 48, "suspensionMm": 150 },
      "images": ["kingsong-f22-pro-1.webp", "kingsong-f22-pro-2.webp"]
    },
    {
      "id": "kingsong-f18",
      "brand": "kingsong",
      "model": "F18",
      "badge": "new",
      "stock": "in",
      "priceGel": 8390,
      "oldPriceGel": null,
      "blurb": {
        "ka": "151V, 2700 Wh და 5000 W ძრავი უჰაერო საბურავზე. F18 ერთდროულად სწრაფი და კომფორტულია, გრძელ მარშრუტზეც და ქალაქშიც.",
        "en": "151V, 2700 Wh and 5000 W on a tubeless tyre. The F18 manages to be fast and comfortable on the same ride."
      },
      "specs": { "motorW": 5000, "peakW": 12000, "batteryWh": 2700, "voltage": 151, "topSpeedKmh": 100, "rangeKm": 150, "tire": "18″", "weightKg": 45, "suspensionMm": 130 },
      "images": ["kingsong-f18-1.webp", "kingsong-f18-2.webp", "kingsong-f18-3.webp"]
    },
    {
      "id": "kingsong-s19-pro",
      "brand": "kingsong",
      "model": "S19 Pro",
      "badge": null,
      "stock": "in",
      "priceGel": 6990,
      "oldPriceGel": null,
      "blurb": {
        "ka": "მოტოციკლის ტიპის ჩარჩო და გრძელი ამორტიზაცია. S19 ბილიკებზე სიარულისთვის შეიქმნა და დღემდე ერთ-ერთი საყვარელი მოდელია მოსიარულეებში.",
        "en": "A motorcycle-style frame and long suspension travel. The S19 was made for trails and riders still love it."
      },
      "specs": { "motorW": 2500, "peakW": 6000, "batteryWh": 1800, "voltage": 126, "topSpeedKmh": 65, "rangeKm": 100, "tire": "16″", "weightKg": 34, "suspensionMm": 120 },
      "images": ["kingsong-s19-pro-1.webp", "kingsong-s19-pro-2.webp", "kingsong-s19-pro-3.webp"]
    },
    {
      "id": "kingsong-s22-pro",
      "brand": "kingsong",
      "model": "S22 Pro",
      "badge": "sale",
      "stock": "in",
      "priceGel": 6590,
      "oldPriceGel": 7490,
      "blurb": {
        "ka": "126V, 2220 Wh და სრული ამორტიზაცია 18-ინჩიან ბორბალზე. S22 Pro ფასის მიხედვით ყველაზე მეტ სიმძლავრეს გვთავაზობს კატალოგში.",
        "en": "126V, 2220 Wh and full suspension on an 18-inch wheel. Per lari, the S22 Pro is the most power in this catalogue."
      },
      "specs": { "motorW": 3300, "peakW": 8000, "batteryWh": 2220, "voltage": 126, "topSpeedKmh": 70, "rangeKm": 110, "tire": "18″", "weightKg": 40, "suspensionMm": 130 },
      "images": ["kingsong-s22-pro-1.webp", "kingsong-s22-pro-2.webp", "kingsong-s22-pro-3.webp"]
    }
  ]
};
