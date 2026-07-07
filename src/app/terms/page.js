"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TermsOfService() {
  const { t, locale, dir } = useLanguage();

  const sections = {
    en: [
      { title: "1. Booking and Payments", content: [
        { bold: "Deposits:", text: "A non-refundable deposit is required to secure your booking date. The remaining balance must be paid in full at least 7 days prior to the event date." },
        { bold: "Cancellations:", text: "Cancellations made within 14 days of the event will result in forfeiture of the full payment. Cancellations made earlier will forfeit the deposit only." },
        { bold: "Rescheduling:", text: "We will accommodate rescheduling requests based on availability. An administrative fee may apply." }
      ]},
      { title: "2. Service Operations", content: [
        { bold: "Space and Power:", text: "The client must ensure a flat, stable area of at least 3m x 3m and access to a standard 220V power outlet within 5 meters of the setup location." },
        { bold: "Setup Time:", text: "We require access to the venue at least 2 hours prior to the event start time for setup and testing." },
        { bold: "Attendants:", text: "Our trained attendants will be on-site to manage the equipment. Guests must follow the attendant's instructions regarding the use of the photo wall." }
      ]},
      { title: "3. Equipment Damage", text: "The client accepts full financial responsibility for any damage or loss of equipment caused by the client, their guests, or the venue staff during the rental period. This includes spills, physical impact, or tampering." },
      { title: "4. Content and Media", content: [
        { bold: "Usage Rights:", text: "By using our services, you grant Mirror Mirror Photowall Qatar the right to use selected event photos for promotional purposes, unless a strict non-disclosure agreement (NDA) is signed prior to the event." },
        { bold: "Inappropriate Content:", text: "Our attendants reserve the right to refuse printing or capturing media that is deemed offensive, illegal, or inappropriate." }
      ]},
      { title: "5. Liability", text: "Mirror Mirror Photowall Qatar shall not be held liable for any failure to perform its obligations due to circumstances beyond our reasonable control (e.g., power outages at the venue, extreme weather, or internet connectivity issues)." }
    ],
    ar: [
      { title: "١. الحجز والمدفوعات", content: [
        { bold: "العربون:", text: "يتطلب تأمين تاريخ حجزك دفع عربون غير قابل للاسترداد. يجب دفع الرصيد المتبقي بالكامل قبل ٧ أيام على الأقل من تاريخ الفعالية." },
        { bold: "الإلغاء:", text: "الإلغاءات التي تتم خلال ١٤ يوماً من الفعالية ستؤدي إلى مصادرة المبلغ المدفوع بالكامل. الإلغاءات التي تتم قبل ذلك ستؤدي إلى مصادرة العربون فقط." },
        { bold: "إعادة الجدولة:", text: "سنلبي طلبات إعادة الجدولة بناءً على التوفر. قد يتم تطبيق رسوم إدارية." }
      ]},
      { title: "٢. عمليات الخدمة", content: [
        { bold: "المساحة والطاقة:", text: "يجب على العميل التأكد من وجود منطقة مسطحة ومستقرة لا تقل مساحتها عن ٣م × ٣م والوصول إلى مأخذ طاقة قياسي 220 فولت في نطاق ٥ أمتار من موقع الإعداد." },
        { bold: "وقت الإعداد:", text: "نطلب الوصول إلى المكان قبل ساعتين على الأقل من وقت بدء الفعالية للإعداد والاختبار." },
        { bold: "الموظفون المرافقون:", text: "سيكون الموظفون المدربون لدينا في الموقع لإدارة المعدات. يجب على الضيوف اتباع تعليمات الموظف فيما يتعلق باستخدام جدار الصور." }
      ]},
      { title: "٣. تلف المعدات", text: "يتحمل العميل المسؤولية المالية الكاملة عن أي ضرر أو فقدان للمعدات يتسبب فيه العميل أو ضيوفه أو موظفو المكان خلال فترة الإيجار. وهذا يشمل انسكاب السوائل أو التأثير الجسدي أو العبث." },
      { title: "٤. المحتوى والوسائط", content: [
        { bold: "حقوق الاستخدام:", text: "باستخدام خدماتنا، فإنك تمنح \"مرآة مرآة فوتووال قطر\" الحق في استخدام صور الفعاليات المختارة للأغراض الترويجية، ما لم يتم توقيع اتفاقية عدم إفشاء صارمة قبل الفعالية." },
        { bold: "المحتوى غير اللائق:", text: "يحتفظ موظفونا بالحق في رفض طباعة أو التقاط الوسائط التي تعتبر مسيئة أو غير قانونية أو غير لائقة." }
      ]},
      { title: "٥. المسؤولية", text: "لا تتحمل \"مرآة مرآة فوتووال قطر\" المسؤولية عن أي فشل في أداء التزاماتها بسبب ظروف خارجة عن سيطرتنا المعقولة (مثل انقطاع التيار الكهربائي في المكان، الطقس القاسي، أو مشاكل الاتصال بالإنترنت)." }
    ]
  };

  const data = locale === 'en' ? sections.en : sections.ar;
  const effectiveDate = locale === 'en' ? "Effective Date: October 1, 2023" : "تاريخ السريان: ١ أكتوبر ٢٠٢٣";
  const contactText = locale === 'en' 
    ? "If you have any questions regarding these Terms of Service, please contact us at" 
    : "إذا كانت لديك أي أسئلة بخصوص شروط الخدمة هذه، يرجى الاتصال بنا على";

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <img src="/images/terms-bg.jpg" alt="Terms of Service" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-hero-overlay via-hero-overlay/40 to-transparent z-20"></div>
        </div>
        <div className="relative z-30 max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter pb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 font-inter text-sm font-medium group">
            {dir === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t("nav.home")}
          </Link>
          <h1 className="font-plus-jakarta font-extrabold text-5xl md:text-5xl md:text-7xl text-white leading-tight">
            {t("terms.heroTitle")} <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-[#731be5] text-transparent bg-clip-text gradient-span">{t("terms.heroHighlight")}</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 px-margin-mobile md:px-gutter">
        <div className="max-w-3xl mx-auto">
          <p className="font-inter font-bold text-sm text-primary mb-10 uppercase tracking-wider">{effectiveDate}</p>
          
          <p className="font-inter text-base text-on-surface-variant leading-relaxed mb-12">
            {locale === 'en' 
              ? "Welcome to Mirror Mirror Photowall Qatar. By booking our services, renting our photo booths, or using our website, you agree to be bound by the following Terms of Service. Please read them carefully."
              : "مرحباً بك في \"مرآة مرآة فوتووال قطر\". من خلال حجز خدماتنا أو استئجار أكشاك التصوير الخاصة بنا أو استخدام موقعنا الإلكتروني، فإنك توافق على الالتزام بشروط الخدمة التالية. يرجى قراءتها بعناية."
            }
          </p>

          {data.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h2 className="font-plus-jakarta font-bold text-2xl text-on-surface mb-4">{section.title}</h2>
              {section.text && (
                <p className="font-inter text-base text-on-surface-variant leading-relaxed">{section.text}</p>
              )}
              {section.content && (
                <ul className="space-y-3 mt-2">
                  {section.content.map((item, i) => (
                    <li key={i} className="font-inter text-base text-on-surface-variant leading-relaxed ms-5 list-disc">
                      <strong className="text-on-surface">{item.bold}</strong> {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-12 pt-8 border-t border-outline-variant/30">
            <h2 className="font-plus-jakarta font-bold text-2xl text-on-surface mb-4">{locale === 'en' ? 'Contact Us' : 'اتصل بنا'}</h2>
            <p className="font-inter text-base text-on-surface-variant leading-relaxed">
              {contactText}{" "}
              <a href="mailto:info@mirrormirrorphotowallqatar.com" className="text-primary hover:underline font-semibold">
                info@mirrormirrorphotowallqatar.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
