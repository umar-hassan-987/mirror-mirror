"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PrivacyPolicy() {
  const { t, locale, dir } = useLanguage();

  const sections = {
    en: [
      { title: "1. Information We Collect", content: [
        { bold: "Personal Information:", text: "When you book an event, request a quote, or contact us, we may collect your name, email address, phone number, and event details." },
        { bold: "Event Data (Photos & Media):", text: "During events, our photo booths capture photos, GIFs, and videos of guests. These are temporarily stored to allow for instant digital sharing (via QR code, SMS, or Email) and printing." },
        { bold: "Analytics:", text: "We collect non-identifiable usage data on our website (like pages visited) to improve our services and user experience." }
      ]},
      { title: "2. How We Use Your Information", content: [
        { bold: "Service Delivery:", text: "To provide you with quotes, confirm bookings, and coordinate logistics for your event." },
        { bold: "Media Sharing:", text: "To send digital copies of photos directly to guests upon their explicit request at the photo booth." },
        { bold: "Marketing (With Consent):", text: "Occasionally, we may use your contact info to send you updates or promotions. You can opt out at any time." }
      ]},
      { title: "3. Data Retention and Security", text: "Media captured at events is stored securely. We provide the event host with a private gallery of all captures. After 30 days post-event, or as otherwise agreed with the client, the media is permanently deleted from our active servers. We implement robust industry-standard security measures to prevent unauthorized access." },
      { title: "4. Third-Party Services", text: "We do not sell your personal data. We may use trusted third-party platforms for hosting, payment processing, and email delivery. These providers are bound by strict data processing agreements." },
      { title: "5. Your Rights", text: "You have the right to request access to, correction of, or deletion of your personal data. If you have any concerns regarding how your data is handled, please contact us." }
    ],
    ar: [
      { title: "١. المعلومات التي نجمعها", content: [
        { bold: "المعلومات الشخصية:", text: "عند حجز فعالية أو طلب عرض سعر أو الاتصال بنا، قد نجمع اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وتفاصيل الفعالية." },
        { bold: "بيانات الفعالية (الصور والوسائط):", text: "خلال الفعاليات، تلتقط أكشاك التصوير الخاصة بنا صوراً وملفات GIF ومقاطع فيديو للضيوف. يتم تخزينها مؤقتاً للسماح بالمشاركة الرقمية الفورية والطباعة." },
        { bold: "التحليلات:", text: "نجمع بيانات استخدام غير قابلة لتحديد الهوية على موقعنا لتحسين خدماتنا وتجربة المستخدم." }
      ]},
      { title: "٢. كيف نستخدم معلوماتك", content: [
        { bold: "تقديم الخدمات:", text: "لتزويدك بعروض الأسعار وتأكيد الحجوزات وتنسيق الخدمات اللوجستية لفعاليتك." },
        { bold: "مشاركة الوسائط:", text: "لإرسال نسخ رقمية من الصور مباشرة إلى الضيوف بناءً على طلبهم الصريح في كشك التصوير." },
        { bold: "التسويق (بموافقة):", text: "من حين لآخر، قد نستخدم معلومات الاتصال الخاصة بك لإرسال تحديثات أو عروض ترويجية. يمكنك إلغاء الاشتراك في أي وقت." }
      ]},
      { title: "٣. الاحتفاظ بالبيانات وأمنها", text: "يتم تخزين الوسائط الملتقطة في الفعاليات بشكل آمن. نوفر لمضيف الفعالية معرضاً خاصاً لجميع الصور. بعد ٣٠ يوماً من الفعالية، أو كما هو متفق عليه خلاف ذلك مع العميل، يتم حذف الوسائط نهائياً من خوادمنا النشطة." },
      { title: "٤. خدمات الطرف الثالث", text: "نحن لا نبيع بياناتك الشخصية. قد نستخدم منصات موثوقة تابعة لجهات خارجية للاستضافة ومعالجة المدفوعات وتسليم البريد الإلكتروني." },
      { title: "٥. حقوقك", text: "يحق لك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها. إذا كانت لديك أي مخاوف بشأن كيفية التعامل مع بياناتك، يرجى الاتصال بنا." }
    ]
  };

  const data = locale === 'en' ? sections.en : sections.ar;
  const effectiveDate = locale === 'en' ? "Effective Date: October 1, 2023" : "تاريخ السريان: ١ أكتوبر ٢٠٢٣";
  const contactText = locale === 'en' 
    ? "If you have any questions about this Privacy Policy, please email us at" 
    : "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى مراسلتنا عبر البريد الإلكتروني على";

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <Image src="/images/terms-bg.webp" alt="Privacy Policy" fill priority sizes="100vw" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-hero-overlay via-hero-overlay/40 to-transparent z-20"></div>
        </div>
        <div className="relative z-30 max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter pb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 font-inter text-sm font-medium group">
            {dir === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t("nav.home")}
          </Link>
          <h1 className="font-plus-jakarta font-extrabold text-5xl md:text-5xl md:text-7xl text-white leading-tight">
            {t("privacy.heroTitle")} <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-[#731be5] text-transparent bg-clip-text gradient-span">{t("privacy.heroHighlight")}</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 px-margin-mobile md:px-gutter">
        <div className="max-w-3xl mx-auto">
          <p className="font-inter font-bold text-sm text-primary mb-10 uppercase tracking-wider">{effectiveDate}</p>
          
          <p className="font-inter text-base text-on-surface-variant leading-relaxed mb-12">
            {locale === 'en' 
              ? "At Mirror Mirror Photowall Qatar, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website, book our services, or interact with our interactive photo walls at events."
              : "في \"مرآة مرآة فوتووال قطر\"، خصوصيتك هي أولويتنا. توضح سياسة الخصوصية هذه كيف نقوم بجمع واستخدام وحماية معلوماتك الشخصية عند استخدام موقعنا الإلكتروني، أو حجز خدماتنا، أو التفاعل مع جدران التصوير التفاعلية الخاصة بنا في الفعاليات."
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
