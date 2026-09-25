"use client";

import { motion } from "framer-motion";
import { ExternalLink, BookOpen, FlaskConical, Microscope, Computer, Activity, Zap, Leaf, BookText, Heart, Dumbbell } from "lucide-react";

interface Subject {
  id: string;
  nameAr: string;
  descAr: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  tag?: string;
}

const subjects: Subject[] = [
  {
    id: "anatomy",
    nameAr: "تشريح الإنسان",
    descAr: "اجباري كلية – 3 ساعات",
    url: "https://neuro-anatomy.carrd.co",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-rose-500 to-rose-700",
    tag: "محاضرات + تفاريغ",
  },
  {
    id: "anatomy-lab",
    nameAr: "لاب تشريح",
    descAr: "لاب تشريح الإنسان",
    url: "https://anatomyneuro.carrd.co",
    icon: <Microscope className="w-6 h-6" />,
    color: "from-pink-500 to-pink-700",
    tag: "عملي",
  },
  {
    id: "chem",
    nameAr: "كيمياء حيوية",
    descAr: "كيمياء 107 – اجباري كلية",
    url: "https://neuro-chem107.carrd.co",
    icon: <FlaskConical className="w-6 h-6" />,
    color: "from-amber-500 to-amber-700",
    tag: "محاضرات + تفاريغ",
  },
  {
    id: "chem-lab",
    nameAr: "لاب كيمياء",
    descAr: "لاب كيمياء 107",
    url: "https://neuro-chemlab107.carrd.co",
    icon: <FlaskConical className="w-6 h-6" />,
    color: "from-yellow-500 to-yellow-700",
    tag: "عملي",
  },
  {
    id: "physio",
    nameAr: "فسيولوجيا",
    descAr: "فسيولوجيا الإنسان",
    url: "https://neuro-physio.carrd.co",
    icon: <Activity className="w-6 h-6" />,
    color: "from-emerald-500 to-emerald-700",
    tag: "محاضرات + تفاريغ",
  },
  {
    id: "physio-lab",
    nameAr: "لاب فسيولوجيا",
    descAr: "لاب فسيولوجيا",
    url: "https://neuro-labphysio.carrd.co",
    icon: <Activity className="w-6 h-6" />,
    color: "from-teal-500 to-teal-700",
    tag: "عملي",
  },
  {
    id: "physics",
    nameAr: "فيزياء",
    descAr: "فيزياء طبية",
    url: "https://neuro-physics.carrd.co",
    icon: <Zap className="w-6 h-6" />,
    color: "from-violet-500 to-violet-700",
    tag: "محاضرات + تفاريغ",
  },
  {
    id: "computer",
    nameAr: "حاسوبية",
    descAr: "مهارات حاسوبية",
    url: "https://neuro-computer.carrd.co",
    icon: <Computer className="w-6 h-6" />,
    color: "from-sky-500 to-sky-700",
    tag: "محاضرات",
  },
  {
    id: "bio",
    nameAr: "أحياء",
    descAr: "أحياء عامة",
    url: "https://neuro-bio.carrd.co",
    icon: <Leaf className="w-6 h-6" />,
    color: "from-green-500 to-green-700",
    tag: "محاضرات + تفاريغ",
  },
  {
    id: "bio-lab",
    nameAr: "لاب أحياء",
    descAr: "لاب أحياء عامة",
    url: "https://neuro-biolab.carrd.co",
    icon: <Microscope className="w-6 h-6" />,
    color: "from-lime-500 to-lime-700",
    tag: "عملي",
  },
  {
    id: "environment",
    nameAr: "التنمية والبيئة",
    descAr: "مساق التنمية والبيئة",
    url: "https://neuro-environment.carrd.co",
    icon: <Leaf className="w-6 h-6" />,
    color: "from-cyan-500 to-cyan-700",
    tag: "محاضرات",
  },
  {
    id: "arabic-applied",
    nameAr: "عربي تطبيقي",
    descAr: "اللغة العربية التطبيقية",
    url: "https://neuro-arabic.carrd.co",
    icon: <BookText className="w-6 h-6" />,
    color: "from-orange-500 to-orange-700",
    tag: "محاضرات",
  },
  {
    id: "health-culture",
    nameAr: "إسعافات أولية",
    descAr: "الثقافة الصحية والإسعافات",
    url: "https://neuro-healthculture.carrd.co",
    icon: <Heart className="w-6 h-6" />,
    color: "from-red-500 to-red-700",
    tag: "محاضرات",
  },
  {
    id: "sports",
    nameAr: "رياضة وصحة",
    descAr: "التربية البدنية والصحة",
    url: "https://neuro-sports.carrd.co",
    icon: <Dumbbell className="w-6 h-6" />,
    color: "from-indigo-500 to-indigo-700",
    tag: "محاضرات",
  },
  {
    id: "arabic-101",
    nameAr: "عربي 101",
    descAr: "اللغة العربية 101",
    url: "https://neuro-arab101.carrd.co",
    icon: <BookText className="w-6 h-6" />,
    color: "from-fuchsia-500 to-fuchsia-700",
    tag: "محاضرات",
  },
];

export default function MaterialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-white dark:from-[#080406] dark:via-[#150B10]/60 dark:to-[#080406]">
      {/* Header */}
      <section className="pt-28 pb-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            مواد السنة الأولى
          </span>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] bg-clip-text text-transparent mb-4">
            المواد الدراسية
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            ملخصات، تفاريغ، ودروس لكل مواد السنة الأولى في كلية العلوم الطبية التطبيقية والتمريض
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subject, index) => (
            <motion.a
              key={subject.id}
              href={subject.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-rose-900/10 dark:border-rose-900/25 bg-white dark:bg-[#100508]/80 shadow-md hover:shadow-xl hover:shadow-rose-900/10 dark:hover:shadow-rose-900/30 transition-all duration-300 cursor-pointer"
            >
              {/* Gradient top strip */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${subject.color}`} />

              <div className="p-5 flex flex-col gap-3">
                {/* Icon + name */}
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${subject.color} text-white flex items-center justify-center shadow-sm flex-shrink-0`}>
                    {subject.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                      {subject.nameAr}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 truncate">
                      {subject.descAr}
                    </p>
                  </div>
                </div>

                {/* Tag + Arrow */}
                <div className="flex items-center justify-between">
                  {subject.tag && (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-rose-950/40 text-slate-600 dark:text-rose-300">
                      {subject.tag}
                    </span>
                  )}
                  <span className="mr-auto flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:gap-2 transition-all">
                    فتح المادة
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl ring-1 ring-inset ring-rose-500/20" />
            </motion.a>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-slate-500 dark:text-slate-500 text-sm"
        >
          <p>📚 يتم تحديث المواد بشكل مستمر من قِبل فريق نيورو</p>
          <p className="mt-1 text-xs">انقر على أي مادة للوصول إلى ملخصاتها وتفاريغها</p>
        </motion.div>
      </section>
    </div>
  );
}
