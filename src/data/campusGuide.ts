export interface LabVideo {
  id: string;
  title: string;
  labs: string[];
  fileId: string;
  driveUrl: string;
  embedUrl: string;
  description: string;
  badgeColor: string;
}

export interface TransportRoute {
  id: string;
  name: string;
  gate: 'بوابة الزرقاء' | 'البوابة الرئيسية' | 'بوابة عمان';
  gateKey: 'zarqa' | 'main' | 'amman';
  company: 'حكايا' | 'مسك والمتكاملة والأسطول';
  schedule: string;
  returnSchedule?: string;
  routeDetails?: string;
  pickupPoint?: string;
  supervisorName?: string;
  supervisorPhone?: string;
  whatsappGroup?: string;
  isNew?: boolean; // 🔴 مسار مستحدث
}

export interface TransportPoster {
  id: string;
  title: string;
  image: string;
  gate: string;
  description: string;
}

export const LAB_VIDEOS: LabVideo[] = [
  {
    id: 'lab-1',
    title: 'مختبرات ابن حيان · الخوارزمي · ابن رشد',
    labs: ['مختبر ابن حيان', 'مختبر الخوارزمي', 'مختبر ابن رشد'],
    fileId: '1ke5SOk5_mT7KvLmyHkObHvlRIPkd--uK',
    driveUrl: 'https://drive.google.com/file/d/1ke5SOk5_mT7KvLmyHkObHvlRIPkd--uK/view?usp=drivesdk',
    embedUrl: 'https://drive.google.com/file/d/1ke5SOk5_mT7KvLmyHkObHvlRIPkd--uK/preview',
    description: 'فيديو إرشادي مصور يوضح المسار المباشر للوصول إلى مجمع مختبرات ابن حيان والخوارزمي وابن رشد داخل الحرم الجامعي.',
    badgeColor: 'from-rose-600 to-rose-800'
  },
  {
    id: 'lab-2',
    title: 'التعليم الإلكتروني · ابن سينا · ابن خلدون',
    labs: ['مركز التعليم الإلكتروني', 'مختبر ابن سينا', 'مختبر ابن خلدون'],
    fileId: '1unR1dM30YZ9YkSfm7vPkg8SuWPn9sPHG',
    driveUrl: 'https://drive.google.com/file/d/1unR1dM30YZ9YkSfm7vPkg8SuWPn9sPHG/view?usp=drivesdk',
    embedUrl: 'https://drive.google.com/file/d/1unR1dM30YZ9YkSfm7vPkg8SuWPn9sPHG/preview',
    description: 'دليل مرئي يرشد الطلبة إلى مبنى مركز التعليم الإلكتروني ومختبرات ابن سينا ومختبرات ابن خلدون.',
    badgeColor: 'from-amber-600 to-rose-700'
  },
  {
    id: 'lab-3',
    title: 'مختبرات طفولة 1 · طفولة 2 · الطبري',
    labs: ['مختبر طفولة 1', 'مختبر طفولة 2', 'مختبر الطبري'],
    fileId: '1pdjRz8Rd2HD9HnfCbH4nQiqzE0NMKTj3',
    driveUrl: 'https://drive.google.com/file/d/1pdjRz8Rd2HD9HnfCbH4nQiqzE0NMKTj3/view?usp=drivesdk',
    embedUrl: 'https://drive.google.com/file/d/1pdjRz8Rd2HD9HnfCbH4nQiqzE0NMKTj3/preview',
    description: 'شرح وتصوير مسار المشي للوصول إلى مختبرات الطفولة (1 و 2) ومختبر الطبري بدقة واختصار للوقت.',
    badgeColor: 'from-purple-600 to-rose-700'
  }
];

export const TRANSPORT_POSTERS: TransportPoster[] = [
  {
    id: 'cover',
    title: 'مواصلات الجامعة الهاشمية - اعرف باصك وبوابتك',
    image: '/transport/transport-cover.png',
    gate: 'دليل شامل',
    description: 'دليل البوابات الثلاث: بوابة الزرقاء · بوابة عمان · البوابة الرئيسية'
  },
  {
    id: 'zarqa-gate',
    title: 'خطوط باصات بوابة الزرقاء',
    image: '/transport/transport-zarqa-gate.png',
    gate: 'بوابة الزرقاء',
    description: 'خطوط الزرقاء، الباص السريع، شفا بدران، أبو نصير، عدن، الياسمين، المفرق، الحرية، البقعة'
  },
  {
    id: 'main-gate',
    title: 'خطوط باصات البوابة الرئيسية',
    image: '/transport/transport-main-gate.png',
    gate: 'البوابة الرئيسية',
    description: 'خطوط المحافظات: إربد، عجلون، جرش، مأدبا، السلط'
  },
  {
    id: 'amman-gate',
    title: 'خطوط باصات بوابة عمان',
    image: '/transport/transport-amman-gate.png',
    gate: 'بوابة عمان',
    description: 'خطوط العاصمة: رغدان، سحاب، البيادر، مجمع الشمال، الجامعة الأردنية'
  },
  {
    id: 'footer',
    title: 'ثلاث بوابات... طريق واحد، وNeuro معكم',
    image: '/transport/transport-footer.png',
    gate: 'رسالة ودعاء',
    description: 'معكم بكل خطوة نحو التميز الأكاديمي والجامعي'
  }
];

export const TRANSPORT_ROUTES: TransportRoute[] = [
  // === بوابة الزرقاء (شركة حكايا) ===
  {
    id: 'zarqa-old',
    name: 'حكايا الزرقاء (المجمع القديم)',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'حركة مستمرة ابتداءً من 6:45 صباحاً لغاية 5:00 مساءً من الجامعة',
    returnSchedule: 'باصات مستمرة لغاية الساعة 5:00 عصراً من الجامعة',
    supervisorName: 'مشرف خط حكايا الزرقاء',
    supervisorPhone: '0789333082'
  },
  {
    id: 'zarqa-brt',
    name: 'حكايا خط الباص السريع - الزرقاء',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'انطلاقة الباص الأول 7:15 صباحاً، ثم حركة مستمرة حتى 2:00 ظهراً',
    returnSchedule: 'متوفر باصات للعودة من 9:00 صباحاً إلى 4:30 عصراً',
    routeDetails: 'الدفع عن طريق بطاقة الباص السريع BRT',
    supervisorName: 'مشرف خط الباص السريع',
    supervisorPhone: '0789333248'
  },
  {
    id: 'jabal-shamali',
    name: 'الجبل الشمالي',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'باصات مستمرة من 6:50 صباحاً إلى 11:00 صباحاً',
    returnSchedule: 'العودة من الساعة 10:00 صباحاً إلى 4:30 عصراً',
    supervisorName: 'مشرف خط الجبل الشمالي',
    supervisorPhone: '0789333011'
  },
  {
    id: 'marj-hamam',
    name: 'مرج الحمام',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الباص الأول الساعة 7:00 صباحاً، بعدها حركة مستمرة للباصات حتى 10:00 صباحاً',
    returnSchedule: 'العودة متوفرة من الساعة 10:00 صباحاً إلى 4:30 عصراً',
    supervisorName: 'مشرف خط مرج الحمام',
    supervisorPhone: '0780402024'
  },
  {
    id: 'hurriya-street',
    name: 'شارع الحرية - الجمرك',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الباص الأول 7:00 ص (الحرية مول) · الثاني 7:15 ص (أبو زغلة) · ثم باصات متتالية حتى 10:20 ص',
    returnSchedule: 'العودة متاحة عبر بوابة الزرقاء',
    routeDetails: 'نقاط التحميل: الحرية مول ومطعم أبو زغلة',
    supervisorName: 'مشرف خط شارع الحرية',
    supervisorPhone: '0780401404'
  },
  {
    id: 'yasmin',
    name: 'حي الياسمين',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'انطلاقة أول باص 7:00 صباحاً، ثم حركة مستمرة للباصات حتى 10:00 صباحاً',
    supervisorName: 'مشرف خط الياسمين',
    supervisorPhone: '0780881841'
  },
  {
    id: 'quweismeh',
    name: 'القويسمة',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الباص الأول 7:00 صباحاً · الباص الثاني 8:15 صباحاً',
    supervisorName: 'مشرف خط القويسمة',
    supervisorPhone: '0789333012'
  },
  {
    id: 'abu-alanda',
    name: 'أبو علندا',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الباص الأول 7:00 ص · الثاني 7:15 ص · حركة مستمرة حتى 10:00 ص',
    supervisorName: 'مشرف خط أبو علندا',
    supervisorPhone: '0789333012'
  },
  {
    id: 'umm-nawarah',
    name: 'أم نوارة',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الباص الأول 7:00 صباحاً · الباص الثاني 8:30 صباحاً',
    supervisorName: 'مشرف خط أم نوارة',
    supervisorPhone: '0786660938'
  },
  {
    id: 'adan-jebali',
    name: 'عدن الجبالي',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الأول 7:00 ص · الثاني 7:15 ص · الثالث 8:15 ص · الرابع 9:00 ص',
    supervisorName: 'مشرف خط عدن الجبالي',
    supervisorPhone: '0786660938'
  },
  {
    id: 'naour',
    name: 'ناعور',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الباص الأول 6:50 صباحاً · الباص الثاني 7:45 صباحاً',
    returnSchedule: 'العودة متوفرة من الساعة 10:00 صباحاً إلى 4:30 عصراً',
    supervisorName: 'مشرف خط ناعور',
    supervisorPhone: '0780402024'
  },
  {
    id: 'shafa-badran',
    name: 'شفا بدران (الكوم)',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الجولة الأولى (باصين) 7:00 ص · الجولة الثانية (باصين) 8:00 ص · الجولة الثالثة (باص) 9:00 ص',
    supervisorName: 'مشرف خط شفا بدران',
    supervisorPhone: '0789333085'
  },
  {
    id: 'abu-nseir',
    name: 'أبو نصير (مجمع السوق)',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الباص الأول 7:00 ص، بعد ذلك باصات متوفرة لغاية 10:00 ص',
    returnSchedule: 'العودة من الساعة 10:00 صباحاً إلى 4:30 عصراً',
    supervisorName: 'مشرف خط أبو نصير',
    supervisorPhone: '0789333085'
  },
  {
    id: 'baqaa',
    name: 'البقعة',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الباص الأول 7:00 صباحاً · الباص الثاني 8:00 صباحاً',
    returnSchedule: 'العودة من الساعة 10:00 صباحاً إلى 4:30 عصراً',
    supervisorName: 'مشرف خط البقعة',
    supervisorPhone: '0789333085'
  },
  {
    id: 'mafraq',
    name: 'المفرق',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الباص الأول 7:15 صباحاً · آخر باص للذهاب 11:00 صباحاً',
    returnSchedule: 'العودة متوفرة من 10:00 صباحاً إلى 4:30 عصراً',
    supervisorName: 'مشرف خط المفرق',
    supervisorPhone: '0777702147'
  },
  {
    id: 'bunayat',
    name: 'البنيات',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'متوفر باص الساعة 7:00 صباحاً',
    supervisorName: 'مشرف خط البنيات',
    supervisorPhone: '0780401404'
  },
  {
    id: 'muwaqqar',
    name: 'الموقر (مسار مستحدث)',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'الباص الأول 7:00 ص · الثاني 8:00 ص · الثالث 9:00 ص',
    returnSchedule: 'العودة متوفرة من 10:00 صباحاً إلى 4:30 عصراً',
    pickupPoint: 'متصرفية الموقر',
    routeDetails: 'دوار صقر > المنشية - المظلة > شارع المية',
    whatsappGroup: 'https://chat.whatsapp.com/HOO92zlUhwK6epFzcHOi8Z',
    isNew: true
  },
  {
    id: 'south-complex',
    name: 'مجمع الجنوب - ضاحية الحاج حسن (مسار مستحدث)',
    gate: 'بوابة الزرقاء',
    gateKey: 'zarqa',
    company: 'حكايا',
    schedule: 'متوفر باصين: الأول 7:00 صباحاً · الثاني 8:15 صباحاً',
    routeDetails: 'دوار الضاحية الكبير > مجمع الجنوب (مكتبة أبو طوق) > دوار الحويان > دوار الجمرك > العبدلية > شارع المية',
    isNew: true
  },

  // === البوابة الرئيسية (شركة حكايا وغيرها) ===
  {
    id: 'irbid',
    name: 'إربد (مجمع عمان)',
    gate: 'البوابة الرئيسية',
    gateKey: 'main',
    company: 'حكايا',
    schedule: 'تتوافر عدة باصات متتابعة من 6:30 ص إلى 9:00 ص',
    returnSchedule: 'العودة من الساعة 11:00 صباحاً إلى 4:30 عصراً',
    supervisorName: 'مشرف خط إربد',
    supervisorPhone: '0788975643'
  },
  {
    id: 'ajloun',
    name: 'عجلون',
    gate: 'البوابة الرئيسية',
    gateKey: 'main',
    company: 'حكايا',
    schedule: 'متوفر باصين: انطلاقة الأول 6:00 ص · والثاني 6:20 ص',
    returnSchedule: 'عودة الباص الأول 2:00 ظهراً · والباص الثاني 4:30 عصراً',
    supervisorName: 'مشرف خط عجلون',
    supervisorPhone: '0777650445'
  },
  {
    id: 'jerash',
    name: 'جرش',
    gate: 'البوابة الرئيسية',
    gateKey: 'main',
    company: 'حكايا',
    schedule: 'انطلاقة الباص الأول 6:30 ص، ثم حركة مستمرة للباصات حتى 9:00 ص',
    returnSchedule: 'العودة متوفرة من الساعة 11:00 صباحاً إلى 4:30 عصراً',
    supervisorName: 'مشرف خط جرش',
    supervisorPhone: '0789333198'
  },
  {
    id: 'salt',
    name: 'السلط',
    gate: 'البوابة الرئيسية',
    gateKey: 'main',
    company: 'حكايا',
    schedule: 'متوفر باصين: انطلاقة الأول 6:10 ص · والثاني 6:20 ص',
    returnSchedule: 'عودة الباص الأول 2:00 ظهراً · والباص الثاني 4:30 عصراً',
    supervisorName: 'مشرف خط السلط',
    supervisorPhone: '0775571293'
  },
  {
    id: 'madaba-complex',
    name: 'مأدبا (مجمع مأدبا)',
    gate: 'البوابة الرئيسية',
    gateKey: 'main',
    company: 'حكايا',
    schedule: 'يتوفر باص من 6:00 ص وانطلاقته 6:30 ص، ثم باصات متوفرة للـ 9:30 ص',
    returnSchedule: 'العودة من الساعة 11:00 صباحاً إلى 4:30 عصراً',
    supervisorName: 'مشرف خط مأدبا',
    supervisorPhone: '077274944'
  },
  {
    id: 'madaba-kanzaman',
    name: 'مأدبا (كان زمان)',
    gate: 'البوابة الرئيسية',
    gateKey: 'main',
    company: 'حكايا',
    schedule: 'يتوفر باص من 6:00 ص وانطلاقته 6:30 ص، ثم باصات متوفرة للـ 8:30 ص',
    returnSchedule: 'العودة من الساعة 11:00 صباحاً إلى 4:30 عصراً'
  },
  {
    id: 'abu-zaghleh-main',
    name: 'أبو زغلة',
    gate: 'البوابة الرئيسية',
    gateKey: 'main',
    company: 'حكايا',
    schedule: 'يتوفر باص من 6:00 ص وانطلاقته 6:30 ص، ثم باصات حتى 9:00 ص',
    returnSchedule: 'آخر باص عودة الساعة 3:30 عصراً'
  },

  // === بوابة عمان (شركة مسك، والمتكاملة، والأسطول الدولي) ===
  {
    id: 'raghadan',
    name: 'مجمع رغدان',
    gate: 'بوابة عمان',
    gateKey: 'amman',
    company: 'مسك والمتكاملة والأسطول',
    schedule: 'حركة مستمرة من 7:00 ص إلى 1:30 ظهراً',
    returnSchedule: 'الباصات متوفرة للعودة حتى 4:30 - 5:00 عصراً من الجامعة',
    supervisorName: 'مشرف خط رغدان',
    supervisorPhone: '0797061588'
  },
  {
    id: 'sahab',
    name: 'سحاب (مجمع باصات سحاب)',
    gate: 'بوابة عمان',
    gateKey: 'amman',
    company: 'مسك والمتكاملة والأسطول',
    schedule: 'باصات متتالية من الساعة 7:00 ص إلى 10:30 ص',
    returnSchedule: 'الباصات متوفرة للعودة حتى الساعة 4:00 عصراً من الجامعة',
    supervisorName: 'مشرف خط سحاب',
    supervisorPhone: '0797061588'
  },
  {
    id: 'bayader',
    name: 'البيادر',
    gate: 'بوابة عمان',
    gateKey: 'amman',
    company: 'مسك والمتكاملة والأسطول',
    schedule: 'الباصات متوفرة من 7:00 ص إلى 7:45 ص',
    returnSchedule: 'العودة متاحة عبر بوابة عمان',
    supervisorName: 'مشرف خط البيادر',
    supervisorPhone: '0777469271'
  },
  {
    id: 'pepsi-bridge',
    name: 'جسر الببسي',
    gate: 'بوابة عمان',
    gateKey: 'amman',
    company: 'مسك والمتكاملة والأسطول',
    schedule: 'متوفر باصات من 7:00 ص إلى 8:00 ص'
  },
  {
    id: 'jiza',
    name: 'الجيزة',
    gate: 'بوابة عمان',
    gateKey: 'amman',
    company: 'مسك والمتكاملة والأسطول',
    schedule: 'متوفر باصات من 7:00 ص إلى 8:00 ص'
  },
  {
    id: 'taybeh',
    name: 'الطيبة',
    gate: 'بوابة عمان',
    gateKey: 'amman',
    company: 'مسك والمتكاملة والأسطول',
    schedule: 'متوفر باص الساعة 7:20 صباحاً'
  },
  {
    id: 'hay-nazzal',
    name: 'حي نزّال',
    gate: 'بوابة عمان',
    gateKey: 'amman',
    company: 'مسك والمتكاملة والأسطول',
    schedule: 'متوفر باص الساعة 7:15 صباحاً'
  }
];

export const HAKAYA_MANAGEMENT = {
  name: 'عمّار مشاقبة',
  role: 'مدير حركة باصات حكايا',
  phone: '0789333243'
};
