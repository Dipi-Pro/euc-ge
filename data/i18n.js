/* ==========================================================================
   ტექსტები ორ ენაზე. HTML-ში ყოველ ტექსტს აქვს data-t="გასაღები" და
   app.js აქედან ავსებს. {n}, {m} და {x} ადგილს იჭერს რიცხვისთვის ან სახელისთვის.

   ახალი ტექსტის დამატება: ჩაწერე გასაღები ორივე ენაზე, მერე HTML-ში
   დაწერე <span data-t="ახალი.გასაღები">ქართული</span>.

   ტერმინები, რომლებიც მთელ საიტზე ერთნაირად უნდა იყოს:
     motor / ძრავი, controller / კონტროლერი, cells / ელემენტები (ბატარეის),
     suspension / ამორტიზაცია, range / გარბენი, peak power / პიკური სიმძლავრე.
   ========================================================================== */
window.I18N = {
  ka: {
    "html.lang": "ka",
    "logo.sub": "ელექტრო მონობორბლები",

    "nav.home": "მთავარი",
    "nav.catalog": "კატალოგი",
    "nav.service": "სერვისი",
    "nav.about": "ჩვენ შესახებ",
    "nav.contact": "კონტაქტი",
    "nav.tips": "რჩევები",
    "nav.menu": "მენიუ",
    "nav.catalogMenu": "კატალოგის განყოფილებები",

    "theme.label": "თემა",
    "theme.light": "ღია",
    "theme.dark": "მუქი",
    "lang.label": "ენა",

    "cta.wa": "მოგვწერე WhatsApp-ზე",
    "cta.waShort": "WhatsApp",
    "cta.catalog": "კატალოგის ნახვა",
    "cta.details": "დეტალები",
    "flag.hint": "დეტალების ნახვა",
    "flag.prev": "წინა მოდელი",
    "flag.next": "შემდეგი მოდელი",
    "cta.close": "დახურვა",

    /* WhatsApp-ის ჩატში წინასწარ ჩაწერილი შეტყობინებები */
    "wa.hello": "გამარჯობა! მაინტერესებს ელექტრო მონობორბალი.",
    "wa.model": "გამარჯობა! მაინტერესებს {x}.",

    "hero.h1b": "ქალაქი",
    "hero.h1c": "დგას, შენ მოძრაობ",
    "hero.lead": "მაღალი სიმძლავრის ელექტრო მონობორბლები NOSFET-ისა და LEAPERKIM-ისგან. ფასები ლარში, 12 თვიანი გარანტია და სერვისი ადგილზე.",





    "cat.eyebrow": "კატალოგი",
    "cat.h2": "ყველა მონობორბალი",
    "cat.all": "ყველა",
    "cat.wheels": "მონობორბლები",
    "cat.soon": "ამ განყოფილებაში პროდუქცია მალე დაემატება. რაც გაინტერესებს, მოგვწერე WhatsApp-ზე.",
    "cat.sort": "სორტირება",
    "cat.empty": "ამ ფილტრით მოდელი ვერ მოიძებნა.",

    "sort.priceAsc": "ფასი: ზრდადობით",
    "sort.priceDesc": "ფასი: კლებადობით",
    "sort.powerDesc": "სიმძლავრე: მაღლიდან",
    "sort.rangeDesc": "გარბენი: მაღლიდან",

    "stock.ask": "მარაგის შესამოწმებლად დაგვიკავშირდით",

    "warranty.short": "გარანტია {n} თვე",
    "warranty.long": "{n} თვე: ძრავი, კონტროლერი, ელემენტები",
    "warranty.title": "გარანტია {n} თვე",
    "warranty.body": "ძრავზე, კონტროლერზე და ბატარეის ელემენტებზე. თუ რომელიმე მათგანი ქარხნული დეფექტის გამო მწყობრიდან გამოვა, უფასოდ შევაკეთებთ ან შევცვლით.",

    "sheet.about": "აღწერა",
    "sheet.feats": "მთავარი თავისებურებები",
    "sheet.specs": "ტექნიკური მახასიათებლები",


    "spec.price": "ფასი",
    "spec.motor": "ძრავი, ნომინალური სიმძლავრე",
    "spec.peak": "ძრავი, პიკური სიმძლავრე",
    "spec.battery": "ბატარეის ტევადობა",
    "spec.voltage": "ძაბვა",
    "spec.cells": "ბატარეა",
    "spec.speed": "მაქს. სიჩქარე",
    "spec.range": "გარბენი ერთი დატენვით",
    "spec.tire": "საბურავი",
    "spec.susp": "ამორტიზაციის სვლა",
    "spec.suspType": "ამორტიზაციის ტიპი",
    "spec.weight": "წონა",
    "spec.charger": "დამტენი (სტანდარტული)",
    "spec.load": "მაქს. დატვირთვა",
    "spec.climb": "აღმართი, მაქს.",
    "spec.ip": "წყალგამძლეობა",
    "spec.warranty": "გარანტია",
    "spec.none": "არ აქვს",
    "susp.air": "ჰაერის",
    "susp.coil": "ზამბარიანი",
    "susp.hydraulic": "ჰიდრავლიკური, ზამბარით",
    "susp.hydraulicAir": "ჰიდრავლიკური, ზამბარა და ჰაერი",
    "susp.none": "არ აქვს",
    "unit.kmh": "კმ/სთ",
    "unit.km": "კმ",
    "unit.kg": "კგ",
    "unit.mm": "მმ",

    "sheet.note": "მახასიათებლები მწარმოებლის მონაცემებია. გარბენი დამოკიდებულია წონაზე, სიჩქარეზე და ამინდზე. ფასს და მარაგს WhatsApp-ზე დაგიდასტურებთ.",
    "sheet.photo": "ფოტო {n}",

    /* შედარება */
    "cmp.add": "+ შედარება",
    "cmp.added": "✓ შედარებაში",
    "cmp.tray": "შესადარებლად: {n} / {m}",
    "cmp.max": "ერთდროულად მაქსიმუმ {n} მოდელი",
    "cmp.remove": "{x}: შედარებიდან ამოღება",
    "cmp.removeShort": "ამოღება",
    "cmp.needTwo": "მონიშნე კიდევ ერთი",
    "cmp.go": "შედარება ({n})",
    "cmp.clear": "გასუფთავება",
    "cmp.eyebrow": "შედარება",
    "cmp.title": "მოდელების შედარება",
    "cmp.only": "მხოლოდ განსხვავებები",
    "cmp.legend": "ფერადად მონიშნულია საუკეთესო მნიშვნელობა, მარცხენა ხაზით კი სტრიქონი, სადაც მოდელები ერთმანეთისგან განსხვავდება.",

    "svc.eyebrow": "სერვის ცენტრი",
    "svc.h2": "ყიდვის შემდეგ არ გვშორდები",
    "svc.lead": "ყველა მოდელს 12 თვიანი გარანტია აქვს ძრავზე, კონტროლერზე და ბატარეის ელემენტებზე. საბურავს, ამორტიზაციას და ბატარეას ადგილზე ვემსახურებით.",
    "svc.1t": "გარანტია",
    "svc.1h": "12 თვე ძრავზე, კონტროლერზე და ელემენტებზე",
    "svc.1p": "თუ ძრავი, კონტროლერი ან ბატარეის ელემენტი ქარხნული დეფექტის გამო მწყობრიდან გამოვიდა, 12 თვის განმავლობაში უფასოდ ვცვლით ან ვაკეთებთ.",
    "svc.2t": "ბატარეა",
    "svc.2h": "ბატარეის შეკეთება და შეცვლა",
    "svc.2p": "ელემენტების შეცვლა, BMS-ის დიაგნოსტიკა, დატენვის და ავტონომიის დაცემის მიზეზის დადგენა.",
    "svc.3t": "მექანიკა",
    "svc.3h": "საბურავი და ამორტიზაცია",
    "svc.3p": "საბურავის შეცვლა, ამორტიზაციის მომსახურება, პედლების და დამცავების მორგება რაიდერზე.",

    "about.eyebrow": "ჩვენ შესახებ",
    "about.h2": "მაღაზია, რომელსაც რაიდერები ქმნიან",
    "about.p1": "ZIPI.GE თბილისში ელექტრო მონობორბლების მაღაზიაა. ვყიდით მხოლოდ იმ ბრენდებს, რომლებსაც თვითონ დავდივართ და რომლებზეც ნაწილების მოტანა შეგვიძლია. ყველა მონობორბალი მოწოდებამდე იხსნება, იტესტება და ხელახლა იკვრება.",

    "contact.eyebrow": "კონტაქტი",
    "contact.phone": "ტელეფონი / WhatsApp",
    "contact.address": "მისამართი",
    "contact.addressValue": "თბილისი, საქართველო",
    "contact.hours": "საკონტაქტო საათები",

    "foot.blurb": "NOSFET და LEAPERKIM მონობორბლები, ნაწილები და სერვისი თბილისში.",
    "foot.catalog": "კატალოგი",
    "foot.shop": "მაღაზია",
    "foot.contact": "კონტაქტი",
    "skip": "გადადი მთავარ შიგთავსზე"
  },

  en: {
    "html.lang": "en",
    "logo.sub": "electric unicycles",

    "nav.home": "Home",
    "nav.catalog": "Catalogue",
    "nav.service": "Service",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.tips": "Tips",
    "nav.menu": "Menu",
    "nav.catalogMenu": "Catalogue sections",

    "theme.label": "Theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "lang.label": "Language",

    "cta.wa": "Message us on WhatsApp",
    "cta.waShort": "WhatsApp",
    "cta.catalog": "See the catalogue",
    "cta.details": "Details",
    "flag.hint": "View details",
    "flag.prev": "Previous model",
    "flag.next": "Next model",
    "cta.close": "Close",

    "wa.hello": "Hello! I'm interested in an electric unicycle.",
    "wa.model": "Hello! I'm interested in the {x}.",

    "hero.h1b": "The city",
    "hero.h1c": "stands still, you keep moving",
    "hero.lead": "High-power electric unicycles from NOSFET and LEAPERKIM. Prices in lari, a 12-month warranty and service on site.",





    "cat.eyebrow": "Catalogue",
    "cat.h2": "Every wheel",
    "cat.all": "All",
    "cat.wheels": "Unicycles",
    "cat.soon": "Products for this section are coming soon. Message us on WhatsApp about anything you need.",
    "cat.sort": "Sort by",
    "cat.empty": "Nothing matches this filter.",

    "sort.priceAsc": "Price: low to high",
    "sort.priceDesc": "Price: high to low",
    "sort.powerDesc": "Power: highest first",
    "sort.rangeDesc": "Range: longest first",

    "stock.ask": "Contact us to check stock",

    "warranty.short": "{n}-month warranty",
    "warranty.long": "{n} months: motor, controller, cells",
    "warranty.title": "{n}-month warranty",
    "warranty.body": "Covers the motor, the controller and the battery cells. If any of them fails from a factory defect, we repair or replace it free of charge.",

    "sheet.about": "Description",
    "sheet.feats": "Key features",
    "sheet.specs": "Specifications",


    "spec.price": "Price",
    "spec.motor": "Motor, nominal",
    "spec.peak": "Motor, peak",
    "spec.battery": "Battery capacity",
    "spec.voltage": "Voltage",
    "spec.cells": "Battery",
    "spec.speed": "Top speed",
    "spec.range": "Range per charge",
    "spec.tire": "Tyre",
    "spec.susp": "Suspension travel",
    "spec.suspType": "Suspension type",
    "spec.weight": "Weight",
    "spec.charger": "Charger (standard)",
    "spec.load": "Max. load",
    "spec.climb": "Max. climb",
    "spec.ip": "Water resistance",
    "spec.warranty": "Warranty",
    "spec.none": "None",
    "susp.air": "Air",
    "susp.coil": "Coil spring",
    "susp.hydraulic": "Hydraulic, coil spring",
    "susp.hydraulicAir": "Hydraulic, coil and air",
    "susp.none": "None",
    "unit.kmh": "km/h",
    "unit.km": "km",
    "unit.kg": "kg",
    "unit.mm": "mm",

    "sheet.note": "Specs are the manufacturer's figures. Range depends on rider weight, speed and weather. We confirm price and stock on WhatsApp.",
    "sheet.photo": "Photo {n}",

    "cmp.add": "+ Compare",
    "cmp.added": "✓ Comparing",
    "cmp.tray": "To compare: {n} / {m}",
    "cmp.max": "Up to {n} wheels at a time",
    "cmp.remove": "Remove {x} from the comparison",
    "cmp.removeShort": "Remove",
    "cmp.needTwo": "Pick one more",
    "cmp.go": "Compare ({n})",
    "cmp.clear": "Clear",
    "cmp.eyebrow": "Compare",
    "cmp.title": "Side by side",
    "cmp.only": "Differences only",
    "cmp.legend": "The best value in each row is coloured; a bar on the left marks rows where the wheels differ.",

    "svc.eyebrow": "Service centre",
    "svc.h2": "We do not disappear after the sale",
    "svc.lead": "Every wheel carries a 12-month warranty on the motor, the controller and the battery cells. Tyres, suspension and batteries are serviced here.",
    "svc.1t": "Warranty",
    "svc.1h": "12 months on motor, controller and cells",
    "svc.1p": "If the motor, the controller or a battery cell fails from a factory defect within 12 months, we repair or replace it at no charge.",
    "svc.2t": "Battery",
    "svc.2h": "Battery repair and replacement",
    "svc.2p": "Cell replacement, BMS diagnostics, finding out why charging or range has dropped.",
    "svc.3t": "Mechanics",
    "svc.3h": "Tyres and suspension",
    "svc.3p": "Tyre changes, suspension service, pedals and pads set up around the rider.",

    "about.eyebrow": "About us",
    "about.h2": "A shop run by riders",
    "about.p1": "ZIPI.GE is an electric unicycle shop in Tbilisi. We only sell the brands we ride ourselves and can get parts for. Every wheel is opened, tested and reassembled before it is handed over.",

    "contact.eyebrow": "Contact",
    "contact.phone": "Phone / WhatsApp",
    "contact.address": "Address",
    "contact.addressValue": "Tbilisi, Georgia",
    "contact.hours": "Contact hours",

    "foot.blurb": "NOSFET and LEAPERKIM wheels, parts and service in Tbilisi.",
    "foot.catalog": "Catalogue",
    "foot.shop": "Shop",
    "foot.contact": "Contact",
    "skip": "Skip to main content"
  }
};
