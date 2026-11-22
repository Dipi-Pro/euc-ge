/* ==========================================================================
   ZIPI.GE-ის კატალოგი: ერთადერთი ფაილი, რომელიც ფასების შესაცვლელად გჭირდება.

   priceGel: მიმდინარე ფასი ლარში (მთელი რიცხვი, გამყოფების გარეშე)
   oldPriceGel: ძველი, გადახაზული ფასი; null, თუ ფასდაკლება არ არის
   blurb: მოკლე აღწერა (ka / en), ჩანს მოდელის ფანჯარაში
   features: მთავარი თავისებურებები სიად (ka / en), ჩანს ფოტოების ქვეშ
   ფოტოები: თითო მოდელს თავისი საქაღალდე აქვს: assets/wheels/<id>/ (მაგ.
     assets/wheels/nosfet-aero/). ჩაყარე ფოტოები (jpg, png ან webp); მთავარი ფოტო,
     რომელიც ბარათზე ჩანს, დაარქვი "1" (მაგ. 1.jpg), დანარჩენები 2, 3, 4...
     ამ რიგით ჩანს გალერეაში. აქ ჩამოწერა საჭირო აღარ არის.

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
     chargeH: დატენვის დრო ამ დამტენით, საათი (ტექსტი, მაგ. "4" ან "2.5-3")
     fastA / fastH: მწარმოებლის მაქსიმალური რეკომენდებული დენი, ამპერი, და დატენვის დრო ამ დენით
     maxLoadKg: რაიდერის მაქსიმალური წონა, კგ
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
    /* საკონტაქტო საათები, ყოველდღე (ჩანს საიტზე და Google-ის მონაცემებში) */
    "hoursOpen": "12:00",
    "hoursClose": "22:00",
    /* მარაგის სტატუსი Google-ისთვის: null (არ ვუთითებთ), "InStock" (მარაგშია),
       "PreOrder" (წინასწარი შეკვეთა) ან "BackOrder" (შეკვეთით). მოდელს შეიძლება
       საკუთარი "availability" ჰქონდეს, რომელიც ამას გადაწონის. */
    "availability": null
  },
  /* კატალოგის განყოფილებები და ქვეკატეგორიები (მონობორბლების გარდა, რომლებიც
     ბრენდებით იყოფა). ეს სია ავსებს ჰედერის ჩამოსაშლელ მენიუს და კატალოგის
     ღილაკებს. ახალი ქვეკატეგორია: დაამატე { "id", "name" } შესაბამის children-ში.
     id: მხოლოდ ლათინური ასოები, ციფრები და "-". */
  "categories": [
    { "id": "parts", "name": { "ka": "ნაწილები", "en": "Parts" }, "children": [
      { "id": "tires", "name": { "ka": "საბურავი", "en": "Tyres" } },
      { "id": "lubricants", "name": { "ka": "საპოხი მასალები", "en": "Lubricants" } }
    ] },
    { "id": "accessories", "name": { "ka": "აქსესუარები", "en": "Accessories" }, "children": [
      { "id": "pads", "name": { "ka": "პადები", "en": "Pads" } },
      { "id": "seats", "name": { "ka": "დასაჯდომი", "en": "Seats" } },
      { "id": "alarms", "name": { "ka": "სიგნალი/სიგნალიზაცია", "en": "Horns & alarms" } },
      { "id": "lights", "name": { "ka": "ციმციმა", "en": "Flashing lights" } },
      { "id": "locks", "name": { "ka": "საკეტი", "en": "Locks" } },
      { "id": "mirrors", "name": { "ka": "სარკე", "en": "Mirrors" } }
    ] },
    { "id": "protection", "name": { "ka": "დამცავები", "en": "Protective gear" }, "children": [
      { "id": "helmets", "name": { "ka": "ჩაფხუტი", "en": "Helmets" } },
      { "id": "knee", "name": { "ka": "სამუხლე", "en": "Knee guards" } },
      { "id": "elbow", "name": { "ka": "საიდაყვე", "en": "Elbow guards" } },
      { "id": "wrist", "name": { "ka": "მაჯის დამცავი", "en": "Wrist guards" } },
      { "id": "body", "name": { "ka": "სხეულის დამცავი", "en": "Body armour" } },
      { "id": "shorts", "name": { "ka": "შორტი", "en": "Padded shorts" } },
      { "id": "shoes", "name": { "ka": "ფეხსაცმელი", "en": "Shoes" } }
    ] },
    { "id": "print3d", "name": { "ka": "3D ბეჭდვა", "en": "3D printing" }, "children": [
      { "id": "leaperkim", "name": { "ka": "LEAPERKIM", "en": "LEAPERKIM" }, "children": [
        { "id": "sherman-p", "name": { "ka": "Sherman-P", "en": "Sherman-P" } },
        { "id": "lynx-s", "name": { "ka": "Lynx-S", "en": "Lynx-S" } },
        { "id": "patton-s", "name": { "ka": "Patton-S", "en": "Patton-S" } }
      ] },
      { "id": "nosfet", "name": { "ka": "NOSFET", "en": "NOSFET" }, "children": [
        { "id": "aero", "name": { "ka": "Aero", "en": "Aero" } },
        { "id": "aeon", "name": { "ka": "Aeon", "en": "Aeon" } },
        { "id": "xeno", "name": { "ka": "Xeno", "en": "Xeno" } },
        { "id": "apex", "name": { "ka": "Apex", "en": "Apex" } }
      ] }
    ] }
  ],
  /* ნაწილები, აქსესუარები, დამცავები და 3D ბეჭდვის ნაწარმი. თითო პროდუქტი ასე იწერება:
     {
       "id": "unique-id",
       "cat": "accessories/pads",         // განყოფილების გზა id-ებით, "/"-ით გაყოფილი,
                                          // მაგ. "parts/tires" ან "print3d/nosfet/xeno"
       "name": { "ka": "სახელი", "en": "Name" },
       "blurb": { "ka": "მოკლე აღწერა", "en": "Short description" },
       "priceGel": 120,                   // ან null, თუ ფასი WhatsApp-ზე
       "desc": { "ka": "...", "en": "..." },   // არასავალდებულო: ვრცელი აღწერა ("აღწერა და მახასიათებლები")
       "specs": [ { "k": { "ka": "წონა", "en": "Weight" }, "v": { "ka": "66 გ", "en": "66 g" } } ],
                                          // არასავალდებულო: მახასიათებლები; "v" შეიძლება უბრალო ტექსტიც იყოს
       // ფოტოები: assets/wheels/<id>/ საქაღალდეში, მთავარი "1" (როგორც მოდელებზე)
     }
     სანამ განყოფილებაში პროდუქტი არ არის, საიტზე "მალე დაემატება" ჩანს. */
  "extras": [
    { "id": "pads-universal-2", "cat": "accessories/pads", "name": { "ka": "2 ნაწილიანი უნივერსალი", "en": "2-piece universal pads" }, "priceGel": 150 },
    { "id": "pads-universal-3", "cat": "accessories/pads", "name": { "ka": "3 ნაწილიანი უნივერსალი", "en": "3-piece universal pads" }, "priceGel": 250 },
    { "id": "pads-nosfet-aeon", "cat": "accessories/pads", "name": { "ka": "NOSFET Aeon-სთვის", "en": "For NOSFET Aeon" }, "priceGel": 250 },
    { "id": "pads-nosfet-xeno", "cat": "accessories/pads", "name": { "ka": "NOSFET Xeno-სთვის", "en": "For NOSFET Xeno" }, "priceGel": 260 },
    { "id": "pads-leaperkim-all", "cat": "accessories/pads", "name": { "ka": "უნივერსალი LEAPERKIM-სთვის", "en": "Universal pads for LEAPERKIM" }, "priceGel": 250 },
    { "id": "seat-lynx-s", "cat": "accessories/seats", "name": { "ka": "Lynx-S-სთვის", "en": "For Lynx-S" }, "priceGel": 240 },
    { "id": "seat-nosfet-aeon-aero", "cat": "accessories/seats", "name": { "ka": "Aeon და Aero-სთვის", "en": "For Aeon and Aero" }, "priceGel": 220 },
    { "id": "seat-sherman-p", "cat": "accessories/seats", "name": { "ka": "Sherman-P-სთვის", "en": "For Sherman-P" }, "priceGel": 240 },
    { "id": "seat-nosfet-xeno", "cat": "accessories/seats", "name": { "ka": "Xeno-სთვის", "en": "For Xeno" }, "priceGel": 200 },
    {
      "id": "alarm-pidzoom-fh60", "cat": "accessories/alarms", "priceGel": 200,
      "name": { "ka": "Pidzoom FH60", "en": "Pidzoom FH60" },
      "blurb": { "ka": "120 dB უსადენო საყვირი თითის პულტით და მოძრაობის სიგნალიზაციით.", "en": "120 dB wireless horn with a finger remote and a motion alarm." },
      "desc": {
        "ka": "PIDZOOM Finger Horn FH60: უფრო ხმამაღალი უსადენო საყვირი ქალაქგარეთ და მანქანების ნაკადში სასიარულოდ. პულტი თითზე იკეთება: ცენტრალურ ღილაკზე დაჭერით საყვირი ირთვება, დანარჩენი ღილაკებით კი მოძრაობის სიგნალიზაცია ირთვება და ითიშება. თუ ჩართული სიგნალიზაციისას ბორბალს ვინმე შეეხება, საყვირი ხმას გამოსცემს. განკუთვნილია მონობორბლის, OneWheel-ის, სკეიტბორდის, სკუტერის და ველოსიპედის რაიდერებისთვის.",
        "en": "PIDZOOM Finger Horn FH60: a louder wireless horn for suburban roads and traffic. The remote is worn on a finger: the centre button sounds the horn, the other buttons arm and disarm the motion alarm. If someone moves the wheel while the alarm is armed, the horn sounds. Made for riders of electric unicycles, OneWheels, skateboards, scooters and bikes."
      },
      "specs": [
        { "k": { "ka": "ხმის სიძლიერე", "en": "Sound level" }, "v": "120 dB" },
        { "k": { "ka": "საყვირის დიამეტრი", "en": "Horn diameter" }, "v": { "ka": "70 მმ", "en": "70 mm" } },
        { "k": { "ka": "წონა", "en": "Weight" }, "v": { "ka": "250 გ", "en": "250 g" } },
        { "k": { "ka": "ბატარეა", "en": "Battery" }, "v": "780 mAh (7.4 V)" },
        { "k": { "ka": "ხმა", "en": "Sound" }, "v": { "ka": "ელექტრონული საყვირი", "en": "Electronic horn" } },
        { "k": { "ka": "სიგნალიზაცია", "en": "Alarm" }, "v": { "ka": "მოძრაობის სენსორი, ირთვება პულტით", "en": "Motion sensor, armed from the remote" } }
      ]
    },
    {
      "id": "alarm-pidzoom-fh30", "cat": "accessories/alarms", "priceGel": 100,
      "name": { "ka": "Pidzoom FH30", "en": "Pidzoom FH30" },
      "blurb": { "ka": "115 dB კომპაქტური საყვირი თითის პულტით, სიგნალიზაციით და Type-C დატენვით.", "en": "Compact 115 dB horn with a finger remote, motion alarm and Type-C charging." },
      "desc": {
        "ka": "PIDZOOM Finger Horn FH30: პატარა და მსუბუქი (66 გ) უსადენო საყვირი ველობილიკებისთვის და ქალაქისთვის. პულტი თითზე ან საჭეზე მაგრდება: ცენტრალური ღილაკით საყვირი ირთვება, ზედა და ქვედა ღილაკებით მოძრაობის სიგნალიზაცია ირთვება და ითიშება. ერთი დატენვა 3–6 თვე ყოფნის. დამაგრება შეიძლება სამაგრით, Velcro-თი ან წებოვანი ფირფიტით. განკუთვნილია მონობორბლის, OneWheel-ის, სკეიტბორდის, სკუტერის და ველოსიპედის რაიდერებისთვის.",
        "en": "PIDZOOM Finger Horn FH30: a small, light (66 g) wireless horn for bike paths and the city. The remote goes on a finger or the handlebar: the centre button sounds the horn, the top and bottom buttons arm and disarm the motion alarm. One charge lasts 3–6 months. Mounts with a clamp base, Velcro or an adhesive pad. Made for riders of electric unicycles, OneWheels, skateboards, scooters and bikes."
      },
      "specs": [
        { "k": { "ka": "ხმის სიძლიერე", "en": "Sound level" }, "v": "115 dB" },
        { "k": { "ka": "ზომა", "en": "Size" }, "v": { "ka": "46 × 43 × 41 მმ", "en": "46 × 43 × 41 mm" } },
        { "k": { "ka": "წონა", "en": "Weight" }, "v": { "ka": "66 გ", "en": "66 g" } },
        { "k": { "ka": "ბატარეა", "en": "Battery" }, "v": "400 mAh (3.7 V)" },
        { "k": { "ka": "ერთი დატენვა", "en": "One charge lasts" }, "v": { "ka": "3–6 თვე", "en": "3–6 months" } },
        { "k": { "ka": "დატენვა", "en": "Charging" }, "v": { "ka": "USB Type-C, სრულად ~4 სთ (5 V, 2 A-მდე)", "en": "USB Type-C, full in ~4 h (5 V, up to 2 A)" } },
        { "k": { "ka": "წყალგამძლეობა", "en": "Water resistance" }, "v": "IPX5" },
        { "k": { "ka": "ხმა", "en": "Sound" }, "v": { "ka": "ელექტრონული საყვირი და ზარის ხმა", "en": "Electronic horn and bell sound" } },
        { "k": { "ka": "პულტი", "en": "Remote" }, "v": { "ka": "Ø31 × 15 მმ, 2 × CR2016 ელემენტი", "en": "Ø31 × 15 mm, 2 × CR2016 cells" } },
        { "k": { "ka": "პულტის რადიუსი", "en": "Remote range" }, "v": { "ka": "4 მ-მდე", "en": "Up to 4 m" } }
      ]
    },
    {
      "id": "mirror-pidzoom-helmet", "cat": "accessories/mirrors", "priceGel": 130,
      "name": { "ka": "Pidzoom ჩაფხუტის სარკე", "en": "Pidzoom helmet mirror" },
      "blurb": { "ka": "ჩაფხუტზე სამაგრი უკანა ხედის სარკე: ამოზნექილი და ბრტყელი სარკე, სამი სიგრძის ღერო.", "en": "Helmet-mounted rear-view mirror: convex and flat mirrors, three arm lengths." },
      "desc": {
        "ka": "PIDZOOM Helmet Mirror: უკანა ხედის სარკე ჩაფხუტზე, შექმნილი ელექტრო ტრანსპორტის რაიდერების საზოგადოებასთან ერთად. კომპლექტში ორი სარკეა: ამოზნექილი ფართო ხედისთვის და ბრტყელი უფრო ზუსტი, დეტალური ხედისთვის. ღეროს სამი სიგრძე და ოთხი სახის საძირე ნებისმიერ ჩაფხუტზე დამაგრების საშუალებას იძლევა. ორი სფერული სახსარი და ხელით მოსაჭერი ხრახნი კუთხეს მარტივად აწყობს და მყარად აფიქსირებს. სტაბილურია ~96 კმ/სთ-მდე სიჩქარეზე და ნახტომებზეც; ღეროს მომრგვალებული კიდეები ბასრი კუთხეების გარეშეა. განკუთვნილია მონობორბლის, სკუტერის და ველოსიპედის რაიდერებისთვის.",
        "en": "PIDZOOM Helmet Mirror: a rear-view mirror for your helmet, designed with input from the electric-vehicle riding community. It comes with two mirrors: convex for a wider view and flat for a more focused, detailed one. Three arm lengths and four base types fit any helmet. Two ball joints and thumb nuts make it easy to set the angle and lock it. Stable at up to ~96 km/h (60 mph) and over trail jumps; the arm has rounded edges with no sharp corners. Made for electric unicycle, scooter and bike riders."
      },
      "specs": [
        { "k": { "ka": "სარკეები", "en": "Mirrors" }, "v": { "ka": "ამოზნექილი და ბრტყელი", "en": "Convex and flat" } },
        { "k": { "ka": "ღერო", "en": "Arm" }, "v": { "ka": "3 სიგრძე, მომრგვალებული კიდეები", "en": "3 lengths, rounded edges" } },
        { "k": { "ka": "საძირე", "en": "Bases" }, "v": { "ka": "4 სახის, ნებისმიერი ჩაფხუტისთვის", "en": "4 types, for any helmet" } },
        { "k": { "ka": "რეგულირება", "en": "Adjustment" }, "v": { "ka": "2 სფერული სახსარი, ხელის ხრახნით", "en": "2 ball joints with thumb nuts" } },
        { "k": { "ka": "სტაბილურობა", "en": "Stability" }, "v": { "ka": "~96 კმ/სთ-მდე (60 mph)", "en": "Up to ~96 km/h (60 mph)" } }
      ]
    },
    {
      "id": "mirror-wrist", "cat": "accessories/mirrors", "priceGel": 60,
      "name": { "ka": "მაჯის სარკე", "en": "Wrist mirror" },
      "blurb": { "ka": "ამოზნექილი სარკე Velcro-ს სამაგრით, ხელზე ან ხელთათმანზე.", "en": "A convex mirror on a Velcro strap, worn on the hand or glove." },
      "desc": {
        "ka": "კომპაქტური უკანა ხედის სარკე, რომელიც ხელზე იკეთება. Velcro-ს რეგულირებადი ღვედი ხელისგულზე ან ხელთათმანზე სწრაფად მაგრდება, ასე რომ, უკან გასახედად საკმარისია ხელის აწევა. ამოზნექილი ლინზა ფართო ხედს იძლევა და დამზადებულია დარტყმაგამძლე აკრილისგან. როცა არ გჭირდება, პატარა ზომის გამო ადვილად ინახება.",
        "en": "A compact rear-view mirror you wear on your hand. The adjustable Velcro strap goes around the palm or a glove in seconds, so a look behind is just a raise of the hand away. The convex lens gives a wide view and is made of impact-resistant acrylic. Small enough to stow easily when you don't need it."
      },
      "specs": [
        { "k": { "ka": "ლინზა", "en": "Lens" }, "v": { "ka": "ამოზნექილი, დარტყმაგამძლე აკრილი", "en": "Convex, impact-resistant acrylic" } },
        { "k": { "ka": "დამაგრება", "en": "Mounting" }, "v": { "ka": "Velcro-ს რეგულირებადი ღვედი ბალთით", "en": "Adjustable Velcro strap with buckle" } },
        { "k": { "ka": "ფერი", "en": "Colour" }, "v": { "ka": "შავი", "en": "Black" } }
      ]
    }
  ],
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
        "ka": "შორ მანძილზე რაიდერების არჩევანი. 4700 Wh-მდე ბატარეა და ჩარჩო, რომელიც უსწორმასწორო გზას ითმენს.",
        "en": "What long-distance riders pick. Up to 4700 Wh and a frame that tolerates broken tarmac."
      }
    },
    {
      "id": "kingsong",
      "name": "KINGSONG",
      "tagline": {
        "ka": "ქალაქის მოდელებიდან ოფროუდამდე",
        "en": "From city wheels to off-road"
      },
      "blurb": {
        "ka": "მსუბუქი ქალაქის მოდელებიდან (14D Pro, 16S Pro) ოფროუდის F-სერიამდე (F16, F18): 420-დან 2664 Wh-მდე ბატარეა და ყველაზე ხელმისაწვდომი ფასები კატალოგში.",
        "en": "From light city wheels (14D Pro, 16S Pro) to the off-road F series (F16, F18): 420 to 2664 Wh and the most affordable prices in the catalogue."
      }
    }
  ],
  "wheels": [
    {
      "id": "nosfet-aero",
      "brand": "nosfet",
      "model": "Aero",
      "priceGel": 6000,
      "oldPriceGel": null,
      "blurb": {
        "ka": "24.5 კგ, მაგნიუმის ჩარჩო და 70 მმ ამორტიზაცია. Aero კატალოგში ყველაზე მსუბუქი მოდელია: მანქანის საბარგულშიც და ლიფტშიც თავისუფლად ეტევა.",
        "en": "24.5 kg, a magnesium frame and 70 mm of suspension. The Aero is the lightest wheel here: it fits a car boot or a lift without a fight."
      },
      "features": {
        "ka": [
          "ჩარჩო ერთიანი მაგნიუმის შენადნობისგანაა ჩამოსხმული, პედლების სამაგრიც მასშია ჩაშენებული.",
          "თუ ჰოლის სენსორი (ძრავის მდებარეობის სენსორი) მწყობრიდან გამოვიდა, მონობორბალი ბალანსს არ კარგავს და უსაფრთხოდ გაჩერების საშუალებას გაძლევს.",
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
      "specs": { "motorW": 2000, "peakW": null, "batteryWh": 1110, "voltage": 126, "cells": "Samsung 50S 21700", "topSpeedKmh": 50, "rangeKm": 60, "tire": "3.0-10", "suspensionMm": 70, "suspType": "hydraulic", "weightKg": 24.5, "chargerA": 5, "chargeH": "2.5-3", "fastA": 10, "fastH": "1.5", "maxLoadKg": 120, "climbDeg": null, "ip": "IPX6" }
    },
    {
      "id": "nosfet-aeon",
      "brand": "nosfet",
      "model": "Aeon",
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
      "specs": { "motorW": 2200, "peakW": 8000, "batteryWh": 1300, "voltage": 151, "cells": "Samsung 50S 21700", "topSpeedKmh": 60, "rangeKm": 80, "tire": "3.0-12", "suspensionMm": 90, "suspType": "hydraulic", "weightKg": 29, "chargerA": 5, "chargeH": "2-3", "fastA": 10, "fastH": "1.5", "maxLoadKg": 120, "climbDeg": null, "ip": "IPX6" }
    },
    {
      "id": "nosfet-xeno",
      "brand": "nosfet",
      "model": "Xeno",
      "priceGel": 8000,
      "oldPriceGel": null,
      "blurb": {
        "ka": "2500 W, 2200 Wh და 20-ინჩიანი ბორბალი 33 კილოგრამად. Xeno Nosfet-ის მსუბუქი სერიის ყველაზე დიდი მოდელია: გრძელ მარშრუტზე სტაბილურია, ხელში კი ისევ მართვადი.",
        "en": "2500 W, 2200 Wh and a 20-inch wheel at 33 kg. The Xeno is the biggest of Nosfet's light series: steady on long routes, still manageable by hand."
      },
      "features": {
        "ka": [
          "ქარხნულ ტესტში 80 კგ წონის რაიდერმა საშუალოდ 36 კმ/სთ სიჩქარით ერთი დატენვით 103 კმ გაიარა.",
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
      "specs": { "motorW": 2500, "peakW": null, "batteryWh": 2200, "voltage": 126, "cells": "Samsung 50S 21700", "topSpeedKmh": 75, "rangeKm": 110, "tire": "80/90-14", "suspensionMm": 90, "suspType": "hydraulic", "weightKg": 33, "chargerA": 5, "chargeH": "5", "fastA": 5, "fastH": "5", "maxLoadKg": 120, "climbDeg": null, "ip": "IPX6" }
    },
    {
      "id": "nosfet-apex",
      "brand": "nosfet",
      "model": "Apex",
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
          "ორი დასატენი პორტი: შესაბამისი დამტენებით 20 ამპერამდე, სრული დატენვა დაახლოებით 2 საათში.",
          "სადგამი დაცემისას იკეცება და არ ტყდება, ფრთა კი დარტყმისას უბრალოდ იხსნება."
        ],
        "en": [
          "Linkage suspension with a DNM shock. Travel adjusts by hand from 55 to 150 mm, no tools needed.",
          "Pedal height moves with the suspension setting: 225 to 313 mm.",
          "The stanchions are 6061-T6 aluminium, precision ground and anodised, like a bicycle fork.",
          "A 20 W headlight with a cut-off beam so it does not blind oncoming traffic; three modes and auto brightness.",
          "Two charge ports: up to 20 A with matching chargers, a full charge in about 2 hours.",
          "The kickstand folds away on a hard drop instead of snapping, and the mudguard breaks away on impact."
        ]
      },
      "specs": { "motorW": 3200, "peakW": null, "batteryWh": 2700, "voltage": 151, "cells": "Samsung 50S 21700", "topSpeedKmh": 90, "rangeKm": 130, "tire": "80/90-14", "suspensionMm": 150, "suspType": "hydraulic", "weightKg": 38.8, "chargerA": 5, "chargeH": "4", "fastA": 20, "fastH": "2", "maxLoadKg": 136, "climbDeg": null, "ip": "IPX6" }
    },
    {
      "id": "leaperkim-patton-s",
      "brand": "leaperkim",
      "model": "Patton-S",
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
      "specs": { "motorW": 3000, "peakW": 7000, "batteryWh": 2220, "voltage": 126, "cells": "Samsung 50S 21700, 30S4P", "topSpeedKmh": 80, "rangeKm": 110, "tire": "3.0-12", "suspensionMm": 80, "suspType": "hydraulic", "weightKg": 36.5, "chargerA": 5, "chargeH": "4.5", "fastA": 20, "fastH": "1.5", "maxLoadKg": 145, "climbDeg": 40, "ip": null }
    },
    {
      "id": "leaperkim-lynx-s",
      "brand": "leaperkim",
      "model": "Lynx-S",
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
          "დატენვა 15 ამპერამდე (მწარმოებლის ინსტრუქციით): 10 ამპერით ბატარეა დაახლოებით 2 საათში ივსება.",
        ],
        "en": [
          "C42 motor with a 42 mm stator: 25% more power than the original Lynx.",
          "A 36-MOSFET controller with 840 A peak current; the motor has a temperature sensor.",
          "90 mm FastAce hydraulic suspension with a coil spring and an air chamber; compression and rebound adjust on both sides.",
          "Large spiked pedals with three height positions. Toe hooks and a crash-resistant folding kickstand are built in.",
          "Charging up to 15 A (per the manufacturer's manual): at 10 A the pack fills in about 2 hours."
        ]
      },
      "specs": { "motorW": 3800, "peakW": 10000, "batteryWh": 2700, "voltage": 151, "cells": "Samsung 50S 21700", "topSpeedKmh": 100, "rangeKm": 130, "tire": "80/90-14", "suspensionMm": 90, "suspType": "hydraulicAir", "weightKg": 42.5, "chargerA": 5, "chargeH": "4", "fastA": 15, "fastH": "1.5", "maxLoadKg": 150, "climbDeg": 45, "ip": null }
    },
    {
      "id": "leaperkim-sherman-p",
      "brand": "leaperkim",
      "model": "Sherman-P",
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
      "specs": { "motorW": 3800, "peakW": 10000, "batteryWh": 4700, "voltage": 176, "cells": "Samsung 50S 21700, 42S6P", "topSpeedKmh": 120, "rangeKm": 230, "tire": "80/90-14", "suspensionMm": 90, "suspType": "hydraulicAir", "weightKg": 52, "chargerA": 5, "chargeH": "6", "fastA": 20, "fastH": "1.5", "maxLoadKg": 150, "climbDeg": null, "ip": "IPX6" }
    },
    /* KingSong: 14D Pro და 16S Pro kingsong.com-ის მონაცემებიდან (16S Pro: მომხმარებლის
       სახელმძღვანელოც) და ევროპელი გამყიდველებიდან; F18 kingsongeurope.com-ის ცხრილიდან;
       F16 KingSong-ის ოფიციალური მონაცემებიდან (newatlas.com) და ewheels.com-იდან. 2026-11-22. */
    {
      "id": "kingsong-14d-pro",
      "brand": "kingsong",
      "model": "14D Pro",
      "priceGel": 1700,
      "oldPriceGel": null,
      "blurb": {
        "ka": "800 W ძრავი (2400 W პიკზე), 420 Wh ბატარეა და 14-ინჩიანი ბორბალი 14.5 კილოგრამად. 14D Pro კატალოგში ყველაზე მსუბუქი და ხელმისაწვდომი მოდელია: სწავლისთვის და ქალაქში მოკლე მარშრუტებისთვის.",
        "en": "An 800 W motor (2400 W peak), a 420 Wh battery and a 14-inch wheel at 14.5 kg. The 14D Pro is the lightest and most affordable wheel here: made for learning and short city trips."
      },
      "features": {
        "ka": [
          "Samsung 35E ელემენტებით აწყობილი ბატარეა და ჩაშენებული BMS (ბატარეის მართვის სისტემა).",
          "სრული დატენვა დაახლოებით 3.5 საათში.",
          "მაქსიმალური სიჩქარე 30 კმ/სთ; დამწყებისთვის ზღვარი აპლიკაციაში შეგიძლია კიდევ შეამცირო.",
          "14.5 კგ და კომპაქტური 14-ინჩიანი ბორბალი: ხელში ტარება და მანქანაში ჩადება მარტივია.",
          "რაიდერის მაქსიმალური წონა 120 კგ."
        ],
        "en": [
          "A battery built from Samsung 35E cells with an integrated BMS (battery management system).",
          "A full charge in about 3.5 hours.",
          "30 km/h top speed; beginners can set a lower limit in the app.",
          "14.5 kg and a compact 14-inch wheel: easy to carry and to put in a car.",
          "Maximum rider weight 120 kg."
        ]
      },
      "specs": { "motorW": 800, "peakW": 2400, "batteryWh": 420, "voltage": 67, "cells": "Samsung 35E 18650", "topSpeedKmh": 30, "rangeKm": 35, "tire": "14x2.125", "suspensionMm": 0, "suspType": "none", "weightKg": 14.5, "chargerA": 2, "chargeH": "3.5", "fastA": 2, "fastH": "3.5", "maxLoadKg": 120, "climbDeg": null, "ip": null }
    },
    {
      "id": "kingsong-16s-pro",
      "brand": "kingsong",
      "model": "16S Pro",
      "priceGel": 2300,
      "oldPriceGel": null,
      "blurb": {
        "ka": "1200 W ძრავი (3800 W პიკზე), 840 Wh ბატარეა და 16-ინჩიანი ბორბალი 17.4 კილოგრამად. 16S Pro ქალაქის მონობორბალია UL 2272 სერტიფიკატით: 14D Pro-ზე ორჯერ დიდი ბატარეით და გარბენით.",
        "en": "A 1200 W motor (3800 W peak), an 840 Wh battery and a 16-inch wheel at 17.4 kg. The 16S Pro is a UL 2272 certified city wheel with twice the battery and range of the 14D Pro."
      },
      "features": {
        "ka": [
          "UL 2272 სერტიფიკატი: ელექტრო და ხანძარსაწინააღმდეგო უსაფრთხოების დამოუკიდებელი შემოწმება.",
          "Samsung 35E ელემენტები და ჭკვიანი BMS (ბატარეის მართვის სისტემა).",
          "მაქსიმალური სიჩქარე 40 კმ/სთ, რომელიც პირველი 5 კილომეტრის შემდეგ იხსნება.",
          "გარბენი 70 კმ-მდე; რეალური გარბენი წონაზე, სიჩქარეზე და ამინდზეა დამოკიდებული.",
          "კომპლექტის დამტენით დატენვა დაახლოებით 7 საათი, სწრაფი 5 ამპერიანი დამტენით დაახლოებით 3.5 საათი."
        ],
        "en": [
          "UL 2272 certified: independent electrical and fire safety testing.",
          "Samsung 35E cells and a smart BMS (battery management system).",
          "40 km/h top speed, unlocked after the first 5 km.",
          "Up to 70 km of range; real-world range depends on weight, speed and weather.",
          "About 7 hours to charge with the included charger, about 3.5 hours with an optional 5 A fast charger."
        ]
      },
      "specs": { "motorW": 1200, "peakW": 3800, "batteryWh": 840, "voltage": 67, "cells": "Samsung 35E 18650", "topSpeedKmh": 40, "rangeKm": 70, "tire": "16x2.125", "suspensionMm": 0, "suspType": "none", "weightKg": 17.4, "chargerA": 2, "chargeH": "7", "fastA": 5, "fastH": "3.5", "maxLoadKg": 120, "climbDeg": null, "ip": null }
    },
    {
      "id": "kingsong-f16",
      "brand": "kingsong",
      "model": "F16",
      "priceGel": 7800,
      "oldPriceGel": null,
      "blurb": {
        "ka": "3500 W ძრავი (10000 W პიკზე), 2200 Wh ბატარეა და ოთხამორტიზატორიანი შეკიდება 38 კილოგრამად. F16 (Aven) KingSong-ის ახალი ოფროუდ F-სერიის შესასვლელი მოდელია: ქალაქშიც და ბილიკებზეც.",
        "en": "A 3500 W motor (10000 W peak), a 2200 Wh battery and four-shock suspension at 38 kg. The F16 (Aven) is the entry model of KingSong's new off-road F series, at home in the city and on trails."
      },
      "features": {
        "ka": [
          "170 ნიუტონ-მეტრი მომენტი; სრული სიჩქარე პირველი 5 კილომეტრის შემდეგ იხსნება.",
          "ოთხი ამორტიზატორი 80 მმ-მდე სვლით: შეკუმშვა, დაბრუნება და ზამბარის დაჭიმულობა ცალ-ცალკე რეგულირდება.",
          "ბორბალი ძრავთან ერთად ცხრა ჭანჭიკით იხსნება, ამიტომ საბურავის შეცვლა მარტივია.",
          "ავტომატური ჩაკეტვა: მონობორბალი პატრონის მიახლოებისას თავისით ირთვება და დაშორებისას იკეტება.",
          "30 W წინა ფარი, RGB უკანა განათება სამუხრუჭე სანათით და მოხვევის მაჩვენებლებით.",
          "ნახშირბადის ბოჭკოს სახელური, წერტილოვანი ეკრანი და პროგრამის განახლება ინტერნეტით."
        ],
        "en": [
          "170 Nm of torque; full speed unlocks after the first 5 km.",
          "Four shocks with up to 80 mm of travel: compression, rebound and spring preload adjust separately.",
          "The wheel and motor come out after removing nine screws, which makes tyre changes easy.",
          "Proximity lock: the wheel powers up as its owner walks up and locks when they walk away.",
          "A 30 W headlight and RGB rear lights with a brake light and turn signals.",
          "Carbon-fibre handle, dot-matrix display and over-the-air firmware updates."
        ]
      },
      "specs": { "motorW": 3500, "peakW": 10000, "batteryWh": 2200, "voltage": 126, "cells": "Samsung 50S 21700", "topSpeedKmh": 80, "rangeKm": 110, "tire": "3.0-12", "suspensionMm": 80, "suspType": "hydraulic", "weightKg": 38, "chargerA": 5, "chargeH": "4-5", "fastA": 10, "fastH": "2.5", "maxLoadKg": 120, "climbDeg": 45, "ip": "IP54" }
    },
    {
      "id": "kingsong-f18",
      "brand": "kingsong",
      "model": "F18",
      "priceGel": 9200,
      "oldPriceGel": null,
      "blurb": {
        "ka": "5000 W ძრავი (9000 W პიკზე), 2664 Wh ბატარეა და 100 მმ ჰაერის ამორტიზაცია 41 კილოგრამად. F18 KingSong-ის ოფროუდ სერიის ძლიერი მოდელია: მოდულური კონსტრუქციით და მაგნიუმის ჩარჩოთი.",
        "en": "A 5000 W motor (9000 W peak), a 2664 Wh battery and 100 mm of air suspension at 41 kg. The F18 is the muscle of KingSong's off-road series, with a modular build and a magnesium frame."
      },
      "features": {
        "ka": [
          "ოთხწერტილიანი ჰაერის ამორტიზაცია 100 მმ სვლით და ჩაქრობის 25 დონით.",
          "მოდულური კონსტრუქცია: ძრავი, განათება და დინამიკები სწრაფად მოსახსნელი შემაერთებლებით უერთდება.",
          "Samsung 50S ელემენტები, 144 ცალი; კომპლექტის 10 ამპერიანი დამტენით ბატარეა 1-3 საათში ივსება.",
          "რეგულირებადი პედლები: სიმაღლე 145-დან 245 მმ-მდე და დახრის კუთხე.",
          "მაგნიუმის შენადნობის ჩარჩო, ნახშირბადის ბოჭკოს სახელური და ჩაშენებული Apple Find My."
        ],
        "en": [
          "Four-point air suspension with 100 mm of travel and 25 damping levels.",
          "Modular build: motor, lights and speakers plug in with quick-release connectors.",
          "144 Samsung 50S cells; the included 10 A charger fills the pack in 1-3 hours.",
          "Adjustable pedals: height from 145 to 245 mm, plus angle.",
          "Magnesium alloy frame, carbon-fibre handle and built-in Apple Find My."
        ]
      },
      "specs": { "motorW": 5000, "peakW": 9000, "batteryWh": 2664, "voltage": 151, "cells": "Samsung 50S 21700, 36S4P", "topSpeedKmh": 108, "rangeKm": 130, "tire": "2.75-14", "suspensionMm": 100, "suspType": "air", "weightKg": 41, "chargerA": 10, "chargeH": "2-3", "fastA": 20, "fastH": "1-1.5", "maxLoadKg": 140, "climbDeg": 45, "ip": "IPX6" }
    }
  ]
};
