/* ==========================================================================
   ZIPI.GE-ის კატალოგი: ერთადერთი ფაილი, რომელიც ფასების შესაცვლელად გჭირდება.

   priceGel: მიმდინარე ფასი ლარში (მთელი რიცხვი, გამყოფების გარეშე)
   oldPriceGel: ძველი, გადახაზული ფასი; null, თუ ფასდაკლება არ არის
   badge: წარწერა ფოტოზე. დასაშვები მნიშვნელობები:
                  flagship, new, sale, range, offroad, bestseller, beginner, light, city, null
   stock: "in" (მარაგშია) ან "order" (შეკვეთით)
   blurb: მოკლე აღწერა (ka / en), ჩანს მოდელის ფანჯარაში
   features: მთავარი თავისებურებები სიად (ka / en), ჩანს ფოტოების ქვეშ
   images: ფაილების სახელები assets/wheels/ საქაღალდიდან

   specs: ყველა ველი ჩანს მოდელის ფანჯარაშიც და შედარების ცხრილშიც.
     motorW / peakW: ძრავის ნომინალური / პიკური სიმძლავრე, ვატი
     batteryWh: ბატარეის ტევადობა, ვატ-საათი
     voltage: ძაბვა, ვოლტი
     cells: ბატარეის ელემენტები (ტექსტი)
     topSpeedKmh: მაქსიმალური სიჩქარე, კმ/სთ
     rangeKm: გარბენი ერთი დატენვით (მწარმოებლის "მაქსიმუმ"), კმ
     tire: საბურავის ზომა (ტექსტი)
     suspensionMm: ამორტიზაციის სვლა, მმ (0 = არ აქვს)
     suspType: air, coil, hydraulic, hydraulicAir ან none
     weightKg: წონა, კგ
     chargerA: კომპლექტში შემავალი დამტენის დენი, ამპერი
     maxLoadKg: მხედრის მაქსიმალური წონა, კგ
     climbDeg: მაქსიმალური აღმართი, გრადუსი
     ip: წყალგამძლეობის კლასი (ტექსტი)
   უცნობი მნიშვნელობა: null. საიტზე "—" გამოჩნდება და შედარებაში
   "საუკეთესოს" არჩევაში არ მიიღებს მონაწილეობას.

   წყაროები (2026-11-06): ewheels.com, ecodrift.ru (Leaperkim), nosfet.com.
   აღწერები ჩვენი დაწერილია ამ მონაცემებზე დაყრდნობით, არ არის თარგმანი.

   შენახვისას სინტაქსი დაცული უნდა იყოს (ბრჭყალები, მძიმეები),
   თორემ საიტი მოდელებს ვერ ჩაიტვირთავს.
   ========================================================================== */
window.CATALOG = {
  "meta": {
    "shop": "ZIPI.GE",
    "currency": "GEL",
    "updated": "2026-11-06",
    /* WhatsApp-ის ნომერი საერთაშორისო ფორმატში, მხოლოდ ციფრები (+995 598 66 61 11) */
    "whatsapp": "995598666111",
    /* გარანტია ძრავზე, კონტროლერზე და ბატარეის ელემენტებზე, ყველა მოდელზე */
    "warrantyMonths": 12,
    "installmentMonths": 12,
    "installmentRate": 1.09
  },
  "brands": [
    {
      "id": "nosfet",
      "name": "NOSFET",
      "tagline": {
        "ka": "მსუბუქი მაგნიუმის ჩარჩო",
        "en": "Light magnesium frames"
      },
      "blurb": {
        "ka": "მაგნიუმის ჩარჩო, 126V და 151V პლატფორმები, 24.5-დან 39 კგ-მდე.",
        "en": "Magnesium frames, 126V and 151V platforms, from 24.5 to 39 kg."
      }
    },
    {
      "id": "leaperkim",
      "name": "LEAPERKIM",
      "tagline": {
        "ka": "Veteran სერია: სიმძლავრე და გარბენი",
        "en": "The Veteran line: power and range"
      },
      "blurb": {
        "ka": "შორ მანძილზე მოსიარულეების არჩევანი. 4700 Wh-მდე ბატარეა და ჩარჩო, რომელიც უსწორმასწორო გზას ითმენს.",
        "en": "What long-distance riders pick. Up to 4700 Wh and a frame that tolerates broken tarmac."
      }
    }
  ],
  "wheels": [
    {
      "id": "nosfet-aero",
      "brand": "nosfet",
      "model": "Aero",
      "badge": "light",
      "stock": "in",
      "priceGel": 6000,
      "oldPriceGel": null,
      "blurb": {
        "ka": "24.5 კგ, მაგნიუმის ჩარჩო და 70 მმ ამორტიზაცია. Aero კატალოგში ყველაზე მსუბუქი მოდელია: მანქანის საბარგულშიც და ლიფტშიც თავისუფლად ეტევა.",
        "en": "24.5 kg, a magnesium frame and 70 mm of suspension. The Aero is the lightest wheel here: it fits a car boot or a lift without a fight."
      },
      "features": {
        "ka": [
          "ჩარჩო ერთიანი მაგნიუმის შენადნობისგანაა ჩამოსხმული, პედლების სამაგრიც მასშია ჩაშენებული.",
          "თუ ჰოლის სენსორი (ძრავის მდებარეობის სენსორი) მწყობრიდან გამოვიდა, მონოციკლი ბალანსს არ კარგავს და უსაფრთხოდ გაჩერების საშუალებას გაძლევს.",
          "ჭკვიანი BMS (ბატარეის მართვის სისტემა) Bluetooth-ით: ბატარეის მდგომარეობა ტელეფონის აპლიკაციაში ჩანს.",
          "საბურავის შესაცვლელად გვერდითი პანელი რამდენიმე ჭანჭიკით იხსნება.",
          "სადგამი, სატარებელი სახელური, ორნაწილიანი ფრთა და სამრეჟიმიანი განათება დღის სანათით."
        ],
        "en": [
          "The frame is one magnesium alloy casting with the pedal mounts built in.",
          "If a hall sensor (motor position sensor) fails, the wheel keeps balancing so you can stop safely.",
          "Smart BMS (battery management system) with Bluetooth: battery health shows in the phone app.",
          "The side panel comes off with a few screws for tyre changes.",
          "Kickstand, trolley handle, two-piece mudguard and three-mode lights with a daytime running light."
        ]
      },
      "specs": { "motorW": 2000, "peakW": null, "batteryWh": 1110, "voltage": 126, "cells": "Samsung 50S 21700", "topSpeedKmh": 55, "rangeKm": 55, "tire": "3.0-10", "suspensionMm": 70, "suspType": "hydraulic", "weightKg": 24.5, "chargerA": 5, "maxLoadKg": 120, "climbDeg": null, "ip": "IPX6" },
      "images": ["nosfet-aero-1.webp", "nosfet-aero-2.webp", "nosfet-aero-3.webp"]
    },
    {
      "id": "nosfet-aeon",
      "brand": "nosfet",
      "model": "Aeon",
      "badge": "city",
      "stock": "in",
      "priceGel": 6500,
      "oldPriceGel": null,
      "blurb": {
        "ka": "151V, 1300 Wh და 2200 W ძრავი (8000 W პიკზე) 12-ინჩიან საბურავზე. Aero-ს კომპაქტური ჩარჩო, უფრო დიდი ბორბლით და მაღალი ძაბვით.",
        "en": "151V, 1300 Wh and a 2200 W motor (8000 W peak) on a 12-inch tyre. The Aero's compact frame with a bigger wheel and a higher voltage."
      },
      "features": {
        "ka": [
          "მაგნიუმის კომპაქტური ჩარჩო 29 კგ წონით: ქალაქში მოქნილია და კიბეზე ატანაც არ გაგიჭირდება.",
          "90 მმ ამორტიზაცია ორმხრივი ჰიდრავლიკური ჩაქრობით; შეკუმშვის და დაბრუნების სიხისტე რეგულირდება.",
          "კომპლექტში ორი ზომის პედლის საფარია: დიდი და პატარა.",
          "შეგიძლია აირჩიო უკამერო ჰიბრიდული ან ოფ-როუდის კბილიანი საბურავი.",
          "RGB უკანა სანათი ყველა მხრიდან ჩანს; წინა ფარი სიკაშკაშეს თვითონ არეგულირებს.",
          "სადგამი და დასაკეცი სატარებელი სახელური."
        ],
        "en": [
          "A compact 29 kg magnesium frame: nimble in the city and easy to carry upstairs.",
          "90 mm of suspension with two-way hydraulic damping; compression and rebound are adjustable.",
          "Two pedal cover sizes in the box, large and small.",
          "Choose a tubeless hybrid tyre or a knobby off-road one.",
          "An RGB tail light visible from every side, and a headlight that sets its own brightness.",
          "Kickstand and folding trolley handle."
        ]
      },
      "specs": { "motorW": 2200, "peakW": 8000, "batteryWh": 1300, "voltage": 151, "cells": "Samsung 50S 21700", "topSpeedKmh": 64, "rangeKm": 75, "tire": "3.0-12", "suspensionMm": 90, "suspType": "hydraulic", "weightKg": 29, "chargerA": 5, "maxLoadKg": 120, "climbDeg": null, "ip": "IPX6" },
      "images": ["nosfet-aeon-1.webp", "nosfet-aeon-2.webp", "nosfet-aeon-3.webp"]
    },
    {
      "id": "nosfet-xeno",
      "brand": "nosfet",
      "model": "Xeno",
      "badge": null,
      "stock": "in",
      "priceGel": 8000,
      "oldPriceGel": null,
      "blurb": {
        "ka": "2500 W, 2200 Wh და 20-ინჩიანი ბორბალი 33 კილოგრამად. Xeno Nosfet-ის მსუბუქი სერიის ყველაზე დიდი მოდელია: გრძელ მარშრუტზე სტაბილურია, ხელში კი ისევ მართვადი.",
        "en": "2500 W, 2200 Wh and a 20-inch wheel at 33 kg. The Xeno is the biggest of Nosfet's light series: steady on long routes, still manageable by hand."
      },
      "features": {
        "ka": [
          "ქარხნულ ტესტში 80 კგ წონის მხედარმა საშუალოდ 36 კმ/სთ სიჩქარით ერთი დატენვით 103 კმ გაიარა.",
          "90 მმ ჰიდრავლიკური ამორტიზაცია რეგულირებადი შეკუმშვით და დაბრუნებით.",
          "სამი უკამერო საბურავის არჩევანი: ჰიბრიდული, კბილიანი და ქუჩის.",
          "სატარებელი სახელური ყველაზე მაღალ მდგომარეობაში იკეტება, რაც დაჯდომით სიარულს ამარტივებს.",
          "პროგრამის განახლება ინტერნეტით, Nosfet-ის აპლიკაციიდან. BMS იცავს მოკლე ჩართვისგან, გადატენვისგან და გადახურებისგან."
        ],
        "en": [
          "In the factory test an 80 kg rider covered 103 km on one charge at a 36 km/h average.",
          "90 mm of hydraulic suspension with adjustable compression and rebound.",
          "Three tubeless tyre options: hybrid, knobby and street.",
          "The trolley handle locks at its highest position, which makes seated riding easier.",
          "Over-the-air firmware updates from the Nosfet app. The BMS protects against short circuit, overcharge and overheating."
        ]
      },
      "specs": { "motorW": 2500, "peakW": null, "batteryWh": 2200, "voltage": 126, "cells": "Samsung 50S 21700", "topSpeedKmh": 75, "rangeKm": 110, "tire": "80/90-14", "suspensionMm": 90, "suspType": "hydraulic", "weightKg": 33, "chargerA": 5, "maxLoadKg": 120, "climbDeg": null, "ip": "IPX6" },
      "images": ["nosfet-xeno-1.webp", "nosfet-xeno-2.webp", "nosfet-xeno-3.webp"]
    },
    {
      "id": "nosfet-apex",
      "brand": "nosfet",
      "model": "Apex",
      "badge": "flagship",
      "stock": "in",
      "priceGel": 9600,
      "oldPriceGel": null,
      "blurb": {
        "ka": "3200 W ძრავი და 2700 Wh ბატარეა 151V-ზე. Apex Nosfet-ის ფლაგმანია: ძრავი, ბატარეა და კონტროლერი Leaperkim-ის კონსტრუქციაა, ამორტიზაციის სვლა კი 150 მმ-მდე იზრდება.",
        "en": "A 3200 W motor and a 2700 Wh pack at 151V. The Apex is Nosfet's flagship: motor, battery and controller are Leaperkim designs, and suspension travel goes up to 150 mm."
      },
      "features": {
        "ka": [
          "ბერკეტიანი ამორტიზაცია DNM-ის ამორტიზატორით. სვლა 55-დან 150 მმ-მდე ხელით, ხელსაწყოს გარეშე რეგულირდება.",
          "ამორტიზაციასთან ერთად პედლების სიმაღლეც იცვლება: 225-დან 313 მმ-მდე.",
          "ამორტიზაციის მიმმართველები 6061-T6 ალუმინისაა, ზუსტად დამუშავებული და ანოდირებული, როგორც ველოსიპედის ჩანგალში.",
          "20 W წინა ფარი მოჭრილი სხივით, რომ შემხვედრი არ დააბრმავოს; სამი რეჟიმი და ავტომატური სიკაშკაშე.",
          "სწრაფი დატენვა 20 ამპერამდე შესაბამისი დამტენით: დაახლოებით 3 საათში 80%-მდე.",
          "სადგამი დაცემისას იკეცება და არ ტყდება, ფრთა კი დარტყმისას უბრალოდ იხსნება."
        ],
        "en": [
          "Linkage suspension with a DNM shock. Travel adjusts by hand from 55 to 150 mm, no tools needed.",
          "Pedal height moves with the suspension setting: 225 to 313 mm.",
          "The stanchions are 6061-T6 aluminium, precision ground and anodised, like a bicycle fork.",
          "A 20 W headlight with a cut-off beam so it does not blind oncoming traffic; three modes and auto brightness.",
          "Fast charging up to 20 A with a matching charger: about 3 hours to 80%.",
          "The kickstand folds away on a hard drop instead of snapping, and the mudguard breaks away on impact."
        ]
      },
      "specs": { "motorW": 3200, "peakW": null, "batteryWh": 2700, "voltage": 151, "cells": "Samsung 50S 21700", "topSpeedKmh": 88, "rangeKm": 95, "tire": "80/90-14", "suspensionMm": 150, "suspType": "hydraulic", "weightKg": 38.8, "chargerA": null, "maxLoadKg": 136, "climbDeg": null, "ip": "IPX6" },
      "images": ["nosfet-apex-1.webp", "nosfet-apex-2.webp", "nosfet-apex-3.webp"]
    },
    {
      "id": "leaperkim-patton-s",
      "brand": "leaperkim",
      "model": "Patton-S",
      "badge": null,
      "stock": "in",
      "priceGel": 8000,
      "oldPriceGel": null,
      "blurb": {
        "ka": "126V, 2220 Wh და 3000 W ძრავი (7000 W პიკზე) 12-ინჩიან საბურავზე. Patton-S სიმძლავრისა და მოქნილობის ბალანსით Leaperkim-ის ერთ-ერთი ყველაზე პოპულარული მოდელია.",
        "en": "126V, 2220 Wh and a 3000 W motor (7000 W peak) on a 12-inch tyre. The balance of power and agility makes the Patton-S one of Leaperkim's most popular wheels."
      },
      "features": {
        "ka": [
          "24 MOSFET-იანი კონტროლერი 680 ამპერი პიკური დენით. ჰოლის სენსორის მწყობრიდან გამოსვლისას ბალანსს ინარჩუნებს.",
          "80 მმ FastAce ჰიდრავლიკური ამორტიზაცია პროგრესიული ზამბარით; შეკუმშვა და დაბრუნება რეგულირდება.",
          "ჭკვიანი BMS აჩვენებს თითოეული ელემენტის ძაბვას, ტემპერატურას და დატენვა-განმუხტვის დენს.",
          "ბატარეის კოლოფები მაგნიუმისაა: პირველ Patton-ზე დაახლოებით 3.5 კგ-ით მსუბუქია.",
          "ორი 18 W წინა ფარი (2000 ლუმენი) და ხმოვანი გაფრთხილება, როცა ბატარეა იცლება.",
          "ორი დასატენი პორტი: შესაბამისი დამტენებით 20 ამპერამდე."
        ],
        "en": [
          "A 24-MOSFET controller with 680 A peak current. It keeps balancing if a hall sensor fails.",
          "80 mm FastAce hydraulic suspension with a progressive spring; compression and rebound adjust.",
          "Smart BMS showing each cell's voltage, temperature and charge/discharge current.",
          "Magnesium battery boxes: about 3.5 kg lighter than the original Patton.",
          "Twin 18 W headlights (2000 lumens) and an audible warning as the battery runs down.",
          "Two charge ports: up to 20 A with matching chargers."
        ]
      },
      "specs": { "motorW": 3000, "peakW": 7000, "batteryWh": 2220, "voltage": 126, "cells": "Samsung 50S 21700, 30S4P", "topSpeedKmh": 80, "rangeKm": 100, "tire": "3.0-12", "suspensionMm": 80, "suspType": "hydraulic", "weightKg": 36.5, "chargerA": 5, "maxLoadKg": 145, "climbDeg": 40, "ip": null },
      "images": ["leaperkim-patton-s-1.webp", "leaperkim-patton-s-2.webp", "leaperkim-patton-s-3.webp"]
    },
    {
      "id": "leaperkim-lynx-s",
      "brand": "leaperkim",
      "model": "Lynx-S",
      "badge": "offroad",
      "stock": "in",
      "priceGel": 9900,
      "oldPriceGel": null,
      "blurb": {
        "ka": "3800 W ძრავი (10000 W პიკზე), 2700 Wh და სრული ამორტიზაცია 20-ინჩიან ბორბალზე. თბილისის ორმოებსა და მთის ბილიკებზე გათვლილი მოდელი.",
        "en": "3800 W (10000 W peak), 2700 Wh and full suspension on a 20-inch wheel. Built for Tbilisi potholes and mountain trails alike."
      },
      "features": {
        "ka": [
          "C42 ძრავი 42 მმ სიგანის სტატორით: პირველ Lynx-ზე 25%-ით მძლავრი.",
          "36 MOSFET-იანი კონტროლერი 840 ამპერი პიკური დენით; ძრავს ტემპერატურის სენსორი აქვს.",
          "90 მმ FastAce ჰიდრავლიკური ამორტიზაცია ზამბარით და ჰაერის კამერით; შეკუმშვა და დაბრუნება ორივე მხარეს რეგულირდება.",
          "დიდი წვეტიანი პედლები სამ სიმაღლეზე ყენდება. ფეხის კაუჭები და დარტყმაგამძლე დასაკეცი სადგამი ჩაშენებულია.",
          "დატენვა 20 ამპერამდე (დაახლოებით 3 kW): 10 ამპერით ბატარეა დაახლოებით 2 საათში ივსება."
        ],
        "en": [
          "C42 motor with a 42 mm stator: 25% more power than the original Lynx.",
          "A 36-MOSFET controller with 840 A peak current; the motor has a temperature sensor.",
          "90 mm FastAce hydraulic suspension with a coil spring and an air chamber; compression and rebound adjust on both sides.",
          "Large spiked pedals with three height positions. Toe hooks and a crash-resistant folding kickstand are built in.",
          "Charging up to 20 A (about 3 kW): at 10 A the pack fills in about 2 hours."
        ]
      },
      "specs": { "motorW": 3800, "peakW": 10000, "batteryWh": 2700, "voltage": 151, "cells": "Samsung 50S 21700", "topSpeedKmh": 95, "rangeKm": 100, "tire": "80/90-14", "suspensionMm": 90, "suspType": "hydraulicAir", "weightKg": 42.5, "chargerA": 5, "maxLoadKg": 150, "climbDeg": 45, "ip": null },
      "images": ["leaperkim-lynx-s-1.webp", "leaperkim-lynx-s-2.webp", "leaperkim-lynx-s-3.webp"]
    },
    {
      "id": "leaperkim-sherman-p",
      "brand": "leaperkim",
      "model": "Sherman-P",
      "badge": "new",
      "stock": "order",
      "priceGel": 11500,
      "oldPriceGel": null,
      "blurb": {
        "ka": "176V, 4700 Wh და 3800 W ძრავი (10000 W პიკზე). Sherman-P-ში Oryx-ის დიდი ბატარეა Sherman-L-ის კომპაქტურ კორპუსშია ჩასმული: ერთი დატენვით მთელი დღე.",
        "en": "176V, 4700 Wh and a 3800 W motor (10000 W peak). The Sherman-P puts the Oryx's big battery into the compact Sherman-L body: a whole day out of one charge."
      },
      "features": {
        "ka": [
          "176V-იანი 4700 Wh ბატარეა Samsung 50S ელემენტებით, ორ ბლოკად. Oryx-ზე 4.5 კგ-ით მსუბუქია.",
          "Lynx-S-ის C42 ძრავი, 176V-ზე გადაწყობილი: 351 ნიუტონ-მეტრი მაქსიმალური მომენტი და ტემპერატურის სენსორი.",
          "36 MOSFET-იანი კონტროლერი 960 ამპერი პიკური დენით. ჰოლის სენსორის მწყობრიდან გამოსვლისას ბალანსს ინარჩუნებს.",
          "BMS 3.0 ორ ბლოკს შორის ელემენტებს აბალანსებს და ტემპერატურას ექვს ზონაში აკონტროლებს.",
          "90 მმ FastAce ჰიდრავლიკური ამორტიზაცია ზამბარით და ჰაერის კამერით, Lynx-S-ზე ხისტი ზამბარით მძიმე ბატარეისთვის.",
          "დამალული სატარებელი სახელური, დასაკეცი სადგამი, ფეხის კაუჭები და IPX6 წყალგამძლეობა."
        ],
        "en": [
          "A 176V 4700 Wh pack of Samsung 50S cells in two blocks. About 4.5 kg lighter than the Oryx.",
          "The Lynx-S C42 motor rewound for 176V: 351 Nm peak torque and a temperature sensor.",
          "A 36-MOSFET controller with 960 A peak current. It keeps balancing if a hall sensor fails.",
          "BMS 3.0 balances cells between the two blocks and watches temperature in six zones.",
          "90 mm FastAce hydraulic suspension with a coil and an air chamber, sprung stiffer than the Lynx-S for the heavier pack.",
          "Hidden trolley handle, folding kickstand, toe hooks and IPX6 water resistance."
        ]
      },
      "specs": { "motorW": 3800, "peakW": 10000, "batteryWh": 4700, "voltage": 176, "cells": "Samsung 50S 21700, 42S6P", "topSpeedKmh": 100, "rangeKm": 200, "tire": "80/90-14", "suspensionMm": 90, "suspType": "hydraulicAir", "weightKg": 52, "chargerA": 5, "maxLoadKg": 150, "climbDeg": null, "ip": "IPX6" },
      "images": ["leaperkim-sherman-p-1.webp", "leaperkim-sherman-p-2.webp", "leaperkim-sherman-p-3.webp"]
    }
  ]
};
