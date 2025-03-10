'use client';
import React, { useState } from 'react'
import * as Yup from "yup";
import { Button, Modal } from "flowbite-react";
import { Vazirmatn } from 'next/font/google';
import { useFormik } from 'formik'; import { Datepicker } from "flowbite-react";
import 'react-international-phone/style.css';
import { InputAdornment, MenuItem, Select, TextField, Typography, } from '@mui/material';
import { defaultCountries, FlagImage, parseCountry, usePhoneInput, } from 'react-international-phone';
import Link from 'next/link';
import { TermsOfService } from '@/components/TermsOfService';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
const v = `يجب أن يكون كلمة المرور مكونة من 8 أحرف أو أكثر وتحتوي على:
1. حرف واحد على الأقل من الحروف الكبيرة .
2. حرف واحد على الأقل من الحروف الصغيرة .
3. رقم واحد على الأقل (0-9).
4. رمز خاص واحد على الأقل (مثل #؟!@$%^&*-).`;
const countries = ["السعوديه", "الإمارات", "مصر", "الكويت", "البحرين", "قطر", "عمان", "الأردن", "لبنان", "فلسطين", "اليمن", "الجزائر", "المغرب", "تونس", "ليبيا", "السودان", "موريتانيا", "جيبوتي", "جزر القمر", "الصومال"
]
const governorates = {
    السعوديه: ["الرياض", "جدة", "مكة المكرمة", "الدمام", "المدينة المنورة", "الخبر", "الطائف", "القصيم", "الخرج", "تبوك"]
    , الإمارات: ["دبي", "أبوظبي", "الشارقة", "العين", "رأس الخيمة", "الفجيرة", "أم القيوين", "الذيد"]
    , مصر: ["القاهرة", "الإسكندرية", "الجيزة", "الأقصر", "أسوان", "طنطا", "المنصورة", "شرم الشيخ", "المحلة الكبرى", "الزقازيق"]
    , الكويت: ["الكويت العاصمة", "الفروانية", "حولي", "الجهراء", "مبارك الكبير", "الأحمدي", "الصور", "العديلية"]
    , البحرين: ["المنامة", "المحرق", "الحد", "سترة", "الرفاع", "مركز البحرين التجاري", "السانبوسة", "مدينة عيسى"]
    , قطر: ["الدوحة", "الريان", "الوكرة", "الخور", "مسيعيد", "الشیحانیة", "أم صلال", "الزبارة"]
    , عمان: ["مسقط", "صلالة", "نزهة", "نزوى", "البريمي", "صحار", "الرستاق", "مطرح", "بهلاء"]
    , الأردن: ["عمان", "إربد", "الزرقاء", "السلط", "عجلون", "الكرك", "معان", "مادبا", "الطفيلة"]
    , فلسطين: ["القدس", "رام الله", "غزة", "نابلس", "بيت لحم", "الخليل", "جنين", "أريحا", "طولكرم", "قلقيلية"]
    , اليمن: ["صنعاء", "عدن", "تعز", "المكلا", "المعلا", "إب", "الحديدة", "لحج", "الضالع", "ذمار"]
    , لبنان: ["بيروت", "طرابلس", "صيدا", "صور", "بعلبك", "زحلة", "جبيل", "النبطية", "المتن", "كسروان"]
    , الجزائر: ["الجزائر العاصمة", "وهران", "قسنطينة", "عنابة", "المدية", "تلمسان", "سيدي بلعباس", "البليدة", "الشلف", "ورقلة"]
    , المغرب: ["الرباط", "الدار البيضاء", "مراكش", "فاس", "طنجة", "أكادير", "العيون", "تطوان", "مكناس", "الجدية"]
    , تونس: ["تونس العاصمة", "سوسة", "صفاقس", "قابس", "المنستير", "المهدية", "قصر هلال", "قليبية", "نابل", "بنزرت"]
    , ليبيا: ["طرابلس", "بنغازي", "مصراتة", "البيضاء", "الزاوية", "طرابلس", "درنة", "سبها", "الخمس", "سرت"]
    , السودان: ["الخرطوم", "أم درمان", "الخرطوم بحري", "مدني", "بورتسودان", "الأبيض", "كوستي", "كادقلي", "دنقلا", "نيالا"]
    , موريتانيا: ["نواكشوط", "نواديبو", "كيفة", "الزويرات", "نواكشوط الجنوبية", "ألاك", "بوتلميت", "الشيخ"]
    , جيبوتي: ["جيبوتي العاصمة", "علي سبيح", "تخوتا", "سمحة", "مخا", "مريسي"]
    , جزر_القمر: ["موروني", "فومبوني", "موتسامودو", "دوموني", "بامبي", "ويوني"]
    , الصومال: ["مقديشو", "هرجيسا", "بوصاصو", "جروي", "كيسمايو", "بلدوين", "بيدوا", "طوسمريب", "شكوشو"]
}
const options = [
    "التكنولوجيا والابتكار -",
    "الذكاء الاصطناعي والتعلم الآلي",
    "البرمجيات كخدمة (SaaS) والتطبيقات",
    "التكنولوجيا المالية (FinTech) والمدفوعات الرقمية",
    "الأمن السيبراني وحماية البيانات",
    "البلوكتشين والعملات الرقمية",
    "إنترنت الأشياء (IoT) والأتمتة الذكية",
    "الواقع الافتراضي والمعزز (VR/AR)",
    "الحوسبة السحابية وتحليل البيانات الضخمة",
    "الروبوتات والأنظمة الذكية",
    "التجارة والخدمات -",
    "التجارة الإلكترونية والمتاجر الرقمية",
    "التجزئة والماركات التجارية",
    "الخدمات اللوجستية والتوصيل",
    "إدارة سلاسل الإمداد والتوزيع",
    "السياحة والسفر والفنادق",
    "إدارة الفعاليات والترفيه",
    "التأمين والخدمات المالية",
    "البنية التحتية والتطوير العقاري -",
    "التطوير العقاري السكني والتجاري",
    "المدن الذكية والبنية التحتية الرقمية",
    "تقنيات البناء والهندسة المعمارية",
    "المقاولات والتشييد",
    "إدارة الممتلكات وصناديق العقارات",
    "الصناعة والتصنيع -",
    "التصنيع الذكي والروبوتات الصناعية",
    "السيارات الكهربائية وتقنيات التنقل الذكي",
    "الطباعة ثلاثية الأبعاد والتصنيع المبتكر",
    "الصناعات الثقيلة والمعدات الهندسية",
    "الصناعات الكيميائية والبتروكيماويات",
    "الإلكترونيات وأشباه الموصلات",
    "الطاقة والاستدامة -",
    "الطاقة المتجددة (الطاقة الشمسية، الرياح، الهيدروجين الأخضر)",
    "إدارة النفايات وإعادة التدوير",
    "تحلية المياه ومعالجة المياه الذكية",
    "الكفاءة الطاقية وحلول الاستدامة",
    "النفط والغاز والطاقة التقليدية",
    "الزراعة والصناعات الغذائية -",
    "الزراعة الذكية والتكنولوجيا الزراعية (AgriTech)",
    "إنتاج وتصنيع الأغذية والمشروبات",
    "الأمن الغذائي والاستدامة الزراعية",
    "الاستزراع السمكي والموارد البحرية",
    "تقنيات الأسمدة والمبيدات الحيوية",
    "الرعاية الصحية والتكنولوجيا الطبية -",
    "الأدوية والتكنولوجيا الحيوية (BioTech)",
    "الأجهزة الطبية والتقنيات العلاجية",
    "الرعاية الصحية الرقمية والتطبيب عن بُعد ",
    "الذكاء الاصطناعي في الطب وتحليل البيانات الصحية",
    "الطب التجديدي والعلاج الجيني",
    "الإعلام والترفيه -",
    "صناعة المحتوى الرقمي والإعلام الجديد",
    "ألعاب الفيديو والرياضات الإلكترونية",
    "السينما والإنتاج الإعلامي",
    "البث المباشر ومنصات الفيديو",
    "الصحافة الرقمية والإعلام التفاعلي",
    "التعليم والتطوير المهني -",
    "تكنولوجيا التعليم (EdTech) والتعلم الإلكتروني",
    "الجامعات والمراكز البحثية",
    "التدريب المهني وتنمية المهارات",
    "الذكاء الاصطناعي في التعليم",
    "الاستثمار والتمويل -",
    "ريادة الأعمال والاستثمار",
    "رأس المال الجريء (Venture Capital) والاستثمارات الناشئة",
    "الأسهم والأسواق المالية",
    "العقارات والصناديق الاستثمارية",
    "القروض والتمويل الجماعي",
    "العملات الرقمية والاستثمار اللامركزي (DeFi)",
    "النقل والمواصلات -",
    "الطيران وتقنيات الفضاء",
    "المواصلات الذكية والبنية التحتية للطرق",
    "الشحن والنقل البحري",
    "القطارات والمترو وأنظمة النقل الجماعي",
    "المنتجات الاستهلاكية والموضة -",
    "الأزياء والملابس",
    "مستحضرات التجميل والعناية الشخصية",
    "المنتجات المنزلية والإلكترونية",
    "المجوهرات والساعات الفاخرة",
    "الصناعات البيطرية ورعاية الحيوانات -",
    "الأدوية البيطرية والتكنولوجيا البيطرية",
    "مستلزمات الحيوانات الأليفة",
    "مزارع الإنتاج الحيواني الحديثة",
    "التكنولوجيا المساعدة وذوي الاحتياجات الخاصة -",
    "الأجهزة الطبية المساعدة",
    "البرمجيات والتقنيات الموجهة لذوي الاحتياجات الخاصة",
    "إمكانية الوصول الرقمي والتصميم الشامل"
];
const options2 = [
    "التكنولوجيا والابتكار -",
    "الذكاء الاصطناعي والتعلم الآلي",
    "البرمجيات كخدمة (SaaS) والتطبيقات",
    "التكنولوجيا المالية (FinTech) والمدفوعات الرقمية",
    "الأمن السيبراني وحماية البيانات",
    "البلوكتشين والعملات الرقمية",
    "إنترنت الأشياء (IoT) والأتمتة الذكية",
    "الواقع الافتراضي والمعزز (VR/AR)",
    "الحوسبة السحابية وتحليل البيانات الضخمة",
    "الروبوتات والأنظمة الذكية",
    "التجارة والخدمات -",
    "التجارة الإلكترونية والمتاجر الرقمية",
    "التجزئة والماركات التجارية",
    "الخدمات اللوجستية والتوصيل",
    "إدارة سلاسل الإمداد والتوزيع",
    "السياحة والسفر والفنادق",
    "إدارة الفعاليات والترفيه",
    "التأمين والخدمات المالية",
    "البنية التحتية والتطوير العقاري -",
    "التطوير العقاري السكني والتجاري",
    "المدن الذكية والبنية التحتية الرقمية",
    "تقنيات البناء والهندسة المعمارية",
    "المقاولات والتشييد",
    "إدارة الممتلكات وصناديق العقارات",
    "الصناعة والتصنيع -",
    "التصنيع الذكي والروبوتات الصناعية",
    "السيارات الكهربائية وتقنيات التنقل الذكي",
    "الطباعة ثلاثية الأبعاد والتصنيع المبتكر",
    "الصناعات الثقيلة والمعدات الهندسية",
    "الصناعات الكيميائية والبتروكيماويات",
    "الإلكترونيات وأشباه الموصلات",
    "الطاقة والاستدامة -",
    "الطاقة المتجددة (الطاقة الشمسية، الرياح، الهيدروجين الأخضر)",
    "إدارة النفايات وإعادة التدوير",
    "تحلية المياه ومعالجة المياه الذكية",
    "الكفاءة الطاقية وحلول الاستدامة",
    "النفط والغاز والطاقة التقليدية",
    "الزراعة والصناعات الغذائية -",
    "الزراعة الذكية والتكنولوجيا الزراعية (AgriTech)",
    "إنتاج وتصنيع الأغذية والمشروبات",
    "الأمن الغذائي والاستدامة الزراعية",
    "الاستزراع السمكي والموارد البحرية",
    "تقنيات الأسمدة والمبيدات الحيوية",
    "الرعاية الصحية والتكنولوجيا الطبية -",
    "الأدوية والتكنولوجيا الحيوية (BioTech)",
    "الأجهزة الطبية والتقنيات العلاجية",
    "الرعاية الصحية الرقمية والتطبيب عن بُعد ",
    "الذكاء الاصطناعي في الطب وتحليل البيانات الصحية",
    "الطب التجديدي والعلاج الجيني",
    "الإعلام والترفيه -",
    "صناعة المحتوى الرقمي والإعلام الجديد",
    "ألعاب الفيديو والرياضات الإلكترونية",
    "السينما والإنتاج الإعلامي",
    "البث المباشر ومنصات الفيديو",
    "الصحافة الرقمية والإعلام التفاعلي",
    "التعليم والتطوير المهني -",
    "تكنولوجيا التعليم (EdTech) والتعلم الإلكتروني",
    "الجامعات والمراكز البحثية",
    "التدريب المهني وتنمية المهارات",
    "الذكاء الاصطناعي في التعليم",
    "الاستثمار والتمويل -",
    "ريادة الأعمال والاستثمار",
    "رأس المال الجريء (Venture Capital) والاستثمارات الناشئة",
    "الأسهم والأسواق المالية",
    "العقارات والصناديق الاستثمارية",
    "القروض والتمويل الجماعي",
    "العملات الرقمية والاستثمار اللامركزي (DeFi)",
    "النقل والمواصلات -",
    "الطيران وتقنيات الفضاء",
    "المواصلات الذكية والبنية التحتية للطرق",
    "الشحن والنقل البحري",
    "القطارات والمترو وأنظمة النقل الجماعي",
    "المنتجات الاستهلاكية والموضة -",
    "الأزياء والملابس",
    "مستحضرات التجميل والعناية الشخصية",
    "المنتجات المنزلية والإلكترونية",
    "المجوهرات والساعات الفاخرة",
    "الصناعات البيطرية ورعاية الحيوانات -",
    "الأدوية البيطرية والتكنولوجيا البيطرية",
    "مستلزمات الحيوانات الأليفة",
    "مزارع الإنتاج الحيواني الحديثة",
    "التكنولوجيا المساعدة وذوي الاحتياجات الخاصة -",
    "الأجهزة الطبية المساعدة",
    "البرمجيات والتقنيات الموجهة لذوي الاحتياجات الخاصة",
    "إمكانية الوصول الرقمي والتصميم الشامل"
];
const options3 = [
    "تمويل واستثمار",
    "دعم مالي ومصرفي",
    "استشارات قانونية وإدارية",
    "تطوير الأعمال والتخطيط الاستراتيجي",
    "تدريب وإرشاد",
    "منح وتسهيلات حكومية",
    "تطوير تقني ودعم تكنولوجي",
    "دعم العمليات التشغيلية واللوجستية",
    "حاضنات ومساحات عمل",
    "تسويق وترويج",
    "أخرى"
];
const options4 = [
    "Pre_Seed (النماذج الأولية)",
    "Seed (مرحلة التأسيس والتمويل الأولي)",
    "Series A (التوسع الأولي)",
    "Series B (التوسع والنمو السريع)",
    "Late Stage / IPO (ما قبل الطرح العام)"
];

const empNumArray = ["5-10", "10-20", "20-40", "40-60", "اكثر من ذلك"]
const SignUp = () => {
    const [currentStep, setCurrentStep] = useState(1); console.log(Object.values(governorates).flat());
    const [preview, setPreview] = useState(null);
    const [openTermsOfServiceModal, setOpenTermsOfServiceModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [openModal4, setOpenModal4] = useState(false);
    const [fileName, setFileName] = useState("لم يتم اختيار ملف بعد");
    const validation = Yup.object().shape({
        CommercialRegister: Yup.string().required("يجب ادخال رقم السجل التجارى  ").matches(/(^\d{10,15}$)|(^[A-Za-z0-9]{10,15}$)/, " يجب ادخال رقم سجل تجارى  صالح"),
        Taxcard: Yup.string().required("يجب ادخال رقم البطاقه الضريبيه  ").matches(/(^\d{10,15}$)|(^[A-Za-z0-9]{10,15}$)/, "يجب ادخال رقم بطاقه ضريبيه صالح     "),
        Companyrepresentativename: Yup.string().required("يجب ادخال الاسم ").min(3).max(30),
        CompanyrepresentativenameEmail: Yup.string().required("يجب ادخال البريد الالكتروني").email("ادخل بريد الكتروني صالح"),
        nationalId: Yup.string().required("يجب ادخال الرقم القومي (لو مصرى ) او جواز السفر( لو غير مصرى)  ").matches(/(^\d{14}$)|(^[A-Za-z0-9]{6,9}$)/, "يجب ادخال id صالح "),
        notification: Yup.boolean(),
        agreement: Yup.boolean().oneOf([true], "يجب الموافقه على الشروط والاحكام بعد الاطلاع عليها لاتمام التسجيل معنا").required(),
        organizationName: Yup.string().required("يجب ادخال الاسم ").min(3).max(30),
        englishName: Yup.string().required("يجب ادخال الاسم بالانجليزيه").matches(/^[A-Za-z- ]+$/, "الاسم باللغه الانجليزيه لو سمحت").min(3).max(20),
        organizationType: Yup.string().oneOf(["حاضنة الأعمال", "مسرعة الأعمال", "مركز الابتكار والتكنولوجيا", "رأس المال الجريء", "مؤسسة تمويل جماعي", "بنك/ مؤسسة تمويلية", "منظمة حكومية/ هيئة اقتصادية", "أخرى"], "الاختيار غير صحيح").required("ادخل نوع مناسب"),
        image: Yup.mixed().required("الصورة مطلوبة").test("fileRequired", "يجب رفع صورة", (value) => value instanceof File),
        organizationEmail: Yup.string().required("يجب ادخال البريد الالكتروني").email("ادخل بريد الكتروني صالح"),
        phone: Yup.string().matches(/^\+?[1-9]\d{3,14}$/, '! ادخل رقم تليفون او محمول صالح').required('! التليفون مطلوب'),
        organizationWebsite: Yup.string().matches(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,6}(\/[a-z0-9\-._~:\/?#[\]@!$&'()*+,;=]*)?$/, 'رابط الموقع غير صالح').required('رابط الويب مطلوب'),
        country: Yup.string().oneOf(countries, "الاختيار غير صحيح").required("اختار دوله مناسبه"),
        Headquarters: Yup.string().oneOf(Object.values(governorates).flat(), "الاختيار غير صحيح").required("اختار محافظه او ولايه مناسبه"),
        rePassword: Yup.string().required("اعد كتابه كلمه السر").oneOf([Yup.ref("password")], "يجب مطابقه كلمه السر الاصليه "),
        password: Yup.string().required("ادخل كلمه سر مناسبه").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, v),
        FieldsSupported: Yup.array().min(1, "يجب اختيار خيار واحد على الأقل").required("هذا الحقل مطلوب"),
        supportTypes: Yup.array().min(1, "يجب اختيار خيار واحد على الأقل").required("هذا الحقل مطلوب"),
        targetedprojectsStages: Yup.array().min(1, "يجب اختيار خيار واحد على الأقل").required("هذا الحقل مطلوب"),
        programs: Yup.string().required("يجب ادخال البرامج ").min(3),
        numOfProjects: Yup.number().required("عدد المشاريع مطلوب").min(1, "عدد المشاريع يجب أن يكون على الأقل 1").max(10000000000, "عدد المشاريع يجب أن يكون منطقي").integer("عدد المشاريع يجب أن يكون عدد صحيح").positive("عدد المشاريع يجب أن يكون عدد إيجابي"),
        Targetfinancingvalue: Yup.number().min(.01, "قيمة التمويل المستهدفةغير صالحه)"),
    });
    async function submitting(value) {
        console.log(value)
        const formData = new FormData();
        formData.append("organizationName", value.organizationName);
        formData.append("englishName", value.englishName);
        formData.append("organizationType", value.organizationType);
        formData.append("CommercialRegister", value.CommercialRegister);
        formData.append("Taxcard", value.Taxcard);
        formData.append("Companyrepresentativename", value.Companyrepresentativename);
        formData.append("CompanyrepresentativenameEmail", value.CompanyrepresentativenameEmail);
        formData.append("nationalId", value.nationalId);
        formData.append("notification", value.notification);
        formData.append("agreement", value.agreement);
        if (value.image) {
            formData.append("image", value.image);
        }
        formData.append("organizationEmail", value.organizationEmail);
        formData.append("phone", value.phone);
        formData.append("organizationWebsite", value.organizationWebsite);
        formData.append("country", value.country);
        formData.append("Headquarters", value.Headquarters);
        formData.append("password", value.password);
        formData.append("rePassword", value.rePassword);
        formData.append("FieldsSupported", JSON.stringify(value.FieldsSupported));
        formData.append("supportTypes", JSON.stringify(value.supportTypes));
        formData.append("targetedprojectsStages", JSON.stringify(value.targetedprojectsStages));
        formData.append("programs", value.programs);
        formData.append("numOfProjects", value.numOfProjects);
        formData.append("Targetfinancingvalue", value.Targetfinancingvalue);
        formData.forEach((value, key) => {
            console.log(key, value);
        });
    }
    const x = useFormik({
        initialValues: {
            organizationName: "", englishName: "", FieldsSupported: [], supportTypes: [], targetedprojectsStages: [], image: null, organizationEmail: "", phone: "", organizationWebsite: "",
            country: "", Headquarters: "", password: "", rePassword: "", programs: "",
            organizationType: "", numOfProjects: "", Targetfinancingvalue: "",
            CommercialRegister: "", Taxcard: "", Companyrepresentativename: "", CompanyrepresentativenameEmail: "",
            nationalId: "", notification: false, agreement: false
        },
        onSubmit: submitting,
        validationSchema: validation,
    });
    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };
    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        }
    }; console.log(x)
    function show1() {
        if (currentStep == 1) {
            if (Object.keys(x.touched).length == 0 || !x.values.image || x.errors.englishName || x.errors.organizationType || x.errors.organizationEmail || x.errors.password || x.errors.rePassword
                || x.errors.organizationName || x.errors.phone || x.errors.organizationWebsite || x.errors.country || x.errors.Headquarters
            ) {
                return true
            }
        } return false
    }
    function show2() {
        if (currentStep == 2) {
            if (Object.keys(x.touched).length == 0 || x.errors.programs
                || x.errors.FieldsSupported || x.errors.numOfProjects || x.errors.supportTypes || x.errors.Targetfinancingvalue || x.errors.targetedprojectsStages) {
                return true
            }
        } return false
    }
    const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
        usePhoneInput({
            defaultCountry: 'eg',
            value: x.values.phone,
            countries: defaultCountries,
            onChange: (data) => {
                x.setFieldValue("phone", data.phone);
            },
        });
    function submitdisable() {
        if (Object.keys(x.errors).length > 0 || Object.keys(x.touched).length == 0 || currentStep < 3) {
            return true
        }
        return false
    }
    return (
        <div className={vazir.className}>
            <div className="my-20">
                {openTermsOfServiceModal && (
                    <TermsOfService
                        openTermsOfServiceModal={openTermsOfServiceModal}
                        setOpenTermsOfServiceModal={setOpenTermsOfServiceModal}
                    />
                )}//خاص بالمودال
                <form onSubmit={x.handleSubmit}>
                    <div className='w-full md:w-[50%] px-4 mx-auto'>
                        <h2 className=' font-vazir text-white  me-4 text-center  font-extrabold text-5xl'>كلمتين مبرين </h2>
                        <p style={{ direction: 'rtl' }} className=' font-vazir  text-[#00F560B0] me-4 font-thin text-2xl'>
                            جملة مؤثرة
                        </p>
                        <div style={{ direction: 'rtl' }} className='w-full py-16 px-2 flex  justify-center items-center'>
                            <div className='w-1/3 px-1'>
                                <div className={` border-b-[3px] ${currentStep === 1 || currentStep === 2 || currentStep === 3 ? "border-b-[#00F560]" : ""}`}>
                                    <p className={`${currentStep === 1 || currentStep === 2 || currentStep === 3 ? "text-[#00F560]" : ""} m-2`}>بيانات اساسية</p>
                                </div>
                            </div>
                            <div className='w-1/3 px-1'>
                                <div className={` border-b-[3px] ${currentStep === 2 || currentStep === 3 ? "border-b-[#00F560]" : "border-b-[#A1A1AA]"}  `}>
                                    <p className={`${currentStep === 2 || currentStep === 3 ? "text-[#00F560]" : "text-[#A1A1AA]"} m-2`}>  تفاصيل المنظمة </p>
                                </div>
                            </div>
                            <div className='w-1/3 px-1'>
                                <div className={` border-b-[3px]  ${currentStep === 3 ? "border-b-[#00F560]" : "border-b-[#A1A1AA]"}`}>
                                    <p className={`${currentStep === 3 ? "text-[#00F560]" : "text-[#A1A1AA]"} m-2`}>  البيانات الثبوتية</p>
                                </div>
                            </div>
                        </div>
                        {currentStep === 1 && (
                            <>
                                <div className='mb-10'>
                                    <label htmlFor='organizationName' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        اسم المنظمة  {' '}
                                    </label>
                                    <input placeholder=' اسم المنظمه' onBlur={x.handleBlur} value={x.values.organizationName} onChange={x.handleChange} name='organizationName' id='organizationName' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.organizationName && x.touched.organizationName && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.organizationName}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='englishName' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        اسم المستخدم {' '}
                                    </label>
                                    <input placeholder='  @Example_A' onBlur={x.handleBlur} value={x.values.englishName} onChange={x.handleChange} name='englishName' id='englishName' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.englishName && x.touched.englishName && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.englishName}
                                    </div>
                                )}
                                <div className='mb-14 relative w-full ' >
                                    <label htmlFor='organizationType' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        <p> نوع المنظمة</p>
                                    </label>
                                    <div className="relative" style={{ direction: "rtl" }}>
                                        <select id="organizationType" onBlur={x.handleBlur} value={x.values.organizationType} onChange={x.handleChange} className=" border  mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                            <option defaultValue> نوع المنظمة</option>
                                            <option value="حاضنة الأعمال">حاضنة الأعمال (Business Incubator)</option>
                                            <option value="مسرعة الأعمال">مسرعة الأعمال (Startup Accelerator)</option>
                                            <option value="مركز الابتكار والتكنولوجيا">مركز الابتكار والتكنولوجيا (Innovation Hub)</option>
                                            <option value="رأس المال الجريء">رأس المال الجريء (Venture Capital Firm)</option>
                                            <option value="مؤسسة تمويل جماعي">مؤسسة تمويل جماعي (Crowdfunding Platform)</option>
                                            <option value="بنك/ مؤسسة تمويلية">بنك/ مؤسسة تمويلية (Bank/Financial Institution)</option>
                                            <option value="منظمة حكومية/ هيئة اقتصادية">منظمة حكومية/ هيئة اقتصادية (Government Organization/Economic Authority)</option>
                                            <option value="أخرى">أخرى (Other)</option>

                                        </select>
                                        <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                    </div>
                                    {x.errors.organizationType && x.touched.organizationType && (
                                        <div className='p-4 mb-4 sx:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                            <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                خطأ :{' '}
                                            </span>
                                            {x.errors.organizationType}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-10'>
                                    <div className="flex items-center  justify-end">
                                        <div className=' flex justify-between flex-col xs:flex-row items-center w-full' style={{ direction: "rtl" }}>
                                            <div className='w-[104px] border overflow-hidden xs:my-0 my-4 border-[#00F56059] justify-center flex items-center h-[104px] rounded-full bg-[#D9D9D940]'>
                                                {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded" /> || <i className="fa-regular text-white opacity-70 text-[56px] fa-user"></i>}
                                            </div>
                                            <div className='w-[85%] flex-col sm:flex-row flex justify-start items-center '>
                                                <label onClick={(event) => { x.setFieldTouched("image", true) }} htmlFor="image" className="bg-[#00F560] mx-4  text-white p-2 px-4 rounded-full cursor-pointer">
                                                    ارفع شعار المنظمه
                                                </label>
                                                <span className="ml-4 mt-4 sm:mt-0 text-white">{fileName}</span>
                                            </div>
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                id="image"
                                                className="hidden"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setFileName(file ? file.name : "لم يتم اختيار ملف بعد");
                                                    x.setFieldValue("image", file);
                                                    if (file) {
                                                        setPreview(URL.createObjectURL(file));
                                                        x.setFieldValue("image", file);
                                                    } else { setPreview(null); }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {x.errors.image && x.touched.image && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.image}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='organizationEmail' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p>  البريد الالكتروني الرسمي للمنظمه </p>{' '}
                                    </label>
                                    <input placeholder=' example@gmail.com' onBlur={x.handleBlur} value={x.values.organizationEmail} onChange={x.handleChange} name='organizationEmail' id='organizationEmail' type='email' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.organizationEmail && x.touched.organizationEmail && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.organizationEmail}
                                    </div>
                                )}
                                <div className='mb-10  w-full'>
                                    <label htmlFor='phone' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p> رقم هاتف المنظمة</p>{' '}
                                    </label>
                                    <TextField
                                        variant="outlined"
                                        value={inputValue}
                                        name='phone'
                                        onBlur={x.handleBlur}
                                        id='phone'
                                        onChange={handlePhoneValueChange}
                                        type="tel"
                                        inputRef={inputRef}
                                        InputProps={{
                                            style: {
                                                backgroundColor: "transparent",
                                                borderRadius: "9999px",
                                                border: "1px solid #84e1bc",
                                                color: "white",
                                                padding: "12px 16px", width: "100%"
                                            },
                                            startAdornment: (
                                                <InputAdornment position="start" style={{ marginRight: "2px", borderColor: "black", marginLeft: "-8px" }}>
                                                    <Select
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: "300px",
                                                                    width: "360px", backgroundColor: "black"
                                                                },
                                                            },
                                                        }}
                                                        sx={{
                                                            width: "max-content",
                                                            borderRadius: "9999px",
                                                            border: "none",
                                                            '& .MuiSelect-select': {
                                                                padding: "8px",
                                                                paddingRight: "24px !important",
                                                            },
                                                            '&.Mui-focused': {
                                                                border: "0px solid #84e1bc",
                                                            },
                                                        }}
                                                        value={country.iso2}
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        renderValue={(value) => (<div className="flex justify-between items-center">
                                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down"></i>
                                                            <FlagImage iso2={value} style={{ display: "flex" }} />
                                                        </div>
                                                        )}>
                                                        {defaultCountries.map((c) => {
                                                            const country = parseCountry(c);
                                                            return (
                                                                <MenuItem key={country.iso2} value={country.iso2}>
                                                                    <FlagImage iso2={country.iso2} style={{ marginRight: "8px" }} />
                                                                    <Typography marginRight="8px" color="white">{country.name}</Typography>
                                                                    <Typography color="gray">+{country.dialCode}</Typography>
                                                                </MenuItem>
                                                            );
                                                        })}
                                                    </Select>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            width: "100%",
                                            input: {
                                                color: "white",
                                                placeholderColor: "#ccc",
                                            },
                                            fieldset: {
                                                display: "none",
                                            },
                                            '&.Mui-focused fieldset': {
                                                display: "block",
                                                borderColor: "#84e1bc",
                                            },
                                        }}
                                    />
                                </div>
                                {x.errors.phone && x.touched.phone && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.phone}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='organizationWebsite' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        الموقع الالكتروني للمنظمه{' '}
                                    </label>
                                    <input placeholder=' www.example.com ' onBlur={x.handleBlur} value={x.values.organizationWebsite} onChange={x.handleChange} name='organizationWebsite' id='organizationWebsite' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.organizationWebsite && x.touched.organizationWebsite && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.organizationWebsite}
                                    </div>
                                )}
                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14  relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='Headquarters' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>   المقر  </p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="Headquarters" onBlur={x.handleBlur} value={x.values.Headquarters} onChange={x.handleChange} className=" border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                                <option >مكان المقر </option>
                                                {
                                                    governorates[x?.values?.country]?.map((p) => {
                                                        return <option value={p}>{p}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.Headquarters && x.touched.Headquarters && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.Headquarters}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14  relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='country' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> الدوله </p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="country" onBlur={x.handleBlur} value={x.values.country} onChange={(e) => { x.handleChange(e); x.setFieldValue("Headquarters", ""); }} className=" border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                                <option >اختر الدوله </option>
                                                {countries.map((country) => {
                                                    return <option value={country}>{country}
                                                    </option>
                                                })}
                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.country && x.touched.country && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.country}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <label htmlFor='password' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p> كلمة المرور</p>{' '}
                                    </label>
                                    <input placeholder=' **********' onBlur={x.handleBlur} value={x.values.password} onChange={x.handleChange} name='password' id='password' type='password' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.password && x.touched.password && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.password}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='rePassword' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p> تأكيد كلمة المرور</p>{' '}
                                    </label>
                                    <input placeholder=' **********' onBlur={x.handleBlur} value={x.values.rePassword} onChange={x.handleChange} name='rePassword' id='rePassword' type='password' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.rePassword && x.touched.rePassword && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.rePassword}
                                    </div>)} </>)}
                        {currentStep === 2 && (
                            <>
                                <div className='mb-14  relative w-full ' >
                                    <label htmlFor='FieldsSupported' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        <p>  مجالات المشاريع التي تدعمها المنظمة </p>
                                        <p className='text-gray-200'></p>{' '}
                                    </label>
                                    <div className="relative" style={{ direction: "rtl" }}>
                                        <div className='border select-none mb-4 text-start ps-10 truncate border-green-300  text-lg rounded-full py-5 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500' onClick={() => { setOpenModal2(true); x.setFieldTouched("FieldsSupported", true); }}> {x.values.FieldsSupported[0] || "مجالات المشاريع التي تدعمها المنظمه "}</div>
                                        <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        <Modal
                                            dismissible
                                            show={openModal2}
                                            onClose={() => setOpenModal2(false)}
                                            className="bg-black bg-opacity-80  backdrop-blur-sm"
                                        >
                                            <Modal.Header className="bg-black border  border-b border-green-400">
                                                <p className="text-white"> مجالات المشاريع </p>
                                            </Modal.Header>
                                            <Modal.Body className="bg-black border-x border-green-300 text-white">
                                                <div className="space-y-6">
                                                    {options2.map((option) => (
                                                        <label key={option} className="flex items-center mb-2 text-sm font-thin text-white">
                                                            {option.includes('-') ? (
                                                                <p className="text-green-400 border mb-4 font-semibold border-green-300 text-center text-lg rounded-full py-2    block w-full p-2.5 ">{option.replace('-', '')}</p>
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="checkbox"
                                                                        name="FieldsSupported"
                                                                        value={option}
                                                                        checked={x.values.FieldsSupported.includes(option)}
                                                                        onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            let newSelection = [...x.values.FieldsSupported];
                                                                            if (checked) {
                                                                                newSelection.push(value);
                                                                            } else {
                                                                                newSelection = newSelection.filter(
                                                                                    (item) => item !== value
                                                                                );
                                                                            }
                                                                            x.setFieldValue("FieldsSupported", newSelection);
                                                                        }}
                                                                        className="w-5 h-5 text-green-500 mx-3 bg-transparent border border-green-500 rounded-md focus:outline-none focus:ring-0"
                                                                    />
                                                                    {option}
                                                                </>
                                                            )}
                                                        </label>
                                                    ))}
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer className="bg-black  border  border-t border-green-300">
                                                <button
                                                    className="hover:bg-[#00F560]  me-2 mb-2  focus:outline-none rounded-full bg-green-400 text-white font-semibold px-4 py-2 "
                                                    onClick={() => setOpenModal2(false)}
                                                >
                                                    done
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    {x.errors.FieldsSupported && x.touched.FieldsSupported && (
                                        <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                            <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                خطأ :{' '}
                                            </span>
                                            {x.errors.FieldsSupported}
                                        </div>
                                    )}
                                </div>
                                <div className='flex justify-between xs:flex-row flex-col-reverse items-center'>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='Targetfinancingvalue' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>قيمة التمويل المستهدفة (إن وجد)</p>
                                        </label>
                                        <input placeholder=' ' type="number" pattern="\d*" onBlur={x.handleBlur} value={x.values.Targetfinancingvalue} onChange={x.handleChange} name='Targetfinancingvalue' id='Targetfinancingvalue' className=' border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 bg-transparent   ' />
                                        {x.errors.Targetfinancingvalue && x.touched.Targetfinancingvalue && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.Targetfinancingvalue}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='numOfProjects' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>  عدد المشاريع التي تدعمها المنظمه   </p>
                                        </label>
                                        <input placeholder=' ' type="number" pattern="\d*" onBlur={x.handleBlur} value={x.values.numOfProjects} onChange={x.handleChange} name='numOfProjects' id='numOfProjects' className=' border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 bg-transparent   ' />
                                        {x.errors.numOfProjects && x.touched.numOfProjects && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.numOfProjects}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='mb-14  relative w-full ' >
                                    <label htmlFor='supportTypes' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        <p>  أنواع الدعم</p>
                                        <p className='text-gray-200'></p>{' '}
                                    </label>
                                    <div className="relative" style={{ direction: "rtl" }}>
                                        <div className='border select-none mb-4 text-start ps-10 truncate border-green-300  text-lg rounded-full py-5 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500' onClick={() => { setOpenModal3(true); x.setFieldTouched("supportTypes", true); }}> {x.values.supportTypes[0] || "انواع الدعم "}</div>
                                        <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        <Modal
                                            dismissible
                                            show={openModal3}
                                            onClose={() => setOpenModal3(false)}
                                            className="bg-black bg-opacity-80  backdrop-blur-sm"
                                        >
                                            <Modal.Header className="bg-black border  border-b border-green-400">
                                                <p className="text-white"> مجالات الاستثمار</p>
                                            </Modal.Header>
                                            <Modal.Body className="bg-black border-x border-green-300 text-white">
                                                <div className="space-y-6">
                                                    {options3.map((option) => (
                                                        <label key={option} className="flex items-center mb-2 text-sm font-thin text-white">
                                                            {option.includes('-') ? (
                                                                <p className="text-green-400 border mb-4 font-semibold border-green-300 text-center text-lg rounded-full py-2    block w-full p-2.5 ">{option.replace('-', '')}</p>
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="checkbox"
                                                                        name="supportTypes"
                                                                        value={option}
                                                                        checked={x.values.supportTypes.includes(option)}
                                                                        onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            let newSelection = [...x.values.supportTypes];
                                                                            if (checked) {
                                                                                newSelection.push(value);
                                                                            } else {
                                                                                newSelection = newSelection.filter(
                                                                                    (item) => item !== value
                                                                                );
                                                                            }
                                                                            x.setFieldValue("supportTypes", newSelection);
                                                                        }}
                                                                        className="w-5 h-5 text-green-500 mx-3 bg-transparent border border-green-500 rounded-md focus:outline-none focus:ring-0"
                                                                    />
                                                                    {option}
                                                                </>
                                                            )}
                                                        </label>
                                                    ))}
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer className="bg-black  border  border-t border-green-300">
                                                <button
                                                    className="hover:bg-[#00F560]  me-2 mb-2  focus:outline-none rounded-full bg-green-400 text-white font-semibold px-4 py-2 "
                                                    onClick={() => setOpenModal3(false)}
                                                >
                                                    done
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    {x.errors.supportTypes && x.touched.supportTypes && (
                                        <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                            <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                خطأ :{' '}
                                            </span>
                                            {x.errors.supportTypes}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-14  relative w-full ' >
                                    <label htmlFor='targetedprojectsStages' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        <p>  مراحل المشاريع المستهدفه</p>
                                        <p className='text-gray-200'></p>{' '}
                                    </label>
                                    <div className="relative" style={{ direction: "rtl" }}>
                                        <div className='border select-none mb-4 text-start ps-10 truncate border-green-300  text-lg rounded-full py-5 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500' onClick={() => { setOpenModal4(true); x.setFieldTouched("targetedprojectsStages", true); }}> {x.values.targetedprojectsStages[0] || "مراحل المشاريع المستهدفه "}</div>
                                        <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        <Modal
                                            dismissible
                                            show={openModal4}
                                            onClose={() => setOpenModal4(false)}
                                            className="bg-black bg-opacity-80  backdrop-blur-sm">
                                            <Modal.Header className="bg-black border  border-b border-green-400">
                                                <p className="text-white"> مجالات الاستثمار</p>
                                            </Modal.Header>
                                            <Modal.Body className="bg-black border-x border-green-300 text-white">
                                                <div className="space-y-6">
                                                    {options4.map((option) => (
                                                        <label key={option} className="flex items-center mb-2 text-sm font-thin text-white">
                                                            {option.includes('-') ? (
                                                                <p className="text-green-400 border mb-4 font-semibold border-green-300 text-center text-lg rounded-full py-2    block w-full p-2.5 ">{option.replace('-', '')}</p>
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="checkbox"
                                                                        name="targetedprojectsStages"
                                                                        value={option}
                                                                        checked={x.values.targetedprojectsStages.includes(option)}
                                                                        onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            let newSelection = [...x.values.targetedprojectsStages];
                                                                            if (checked) {
                                                                                newSelection.push(value);
                                                                            } else {
                                                                                newSelection = newSelection.filter(
                                                                                    (item) => item !== value
                                                                                );
                                                                            }
                                                                            x.setFieldValue("targetedprojectsStages", newSelection);
                                                                        }}
                                                                        className="w-5 h-5 text-green-500 mx-3 bg-transparent border border-green-500 rounded-md focus:outline-none focus:ring-0"
                                                                    />
                                                                    {option}
                                                                </>
                                                            )}
                                                        </label>
                                                    ))}
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer className="bg-black  border  border-t border-green-300">
                                                <button
                                                    className="hover:bg-[#00F560]  me-2 mb-2  focus:outline-none rounded-full bg-green-400 text-white font-semibold px-4 py-2 "
                                                    onClick={() => setOpenModal4(false)}
                                                >
                                                    done
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    {x.errors.targetedprojectsStages && x.touched.targetedprojectsStages && (
                                        <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                            <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                خطأ :{' '}
                                            </span>
                                            {x.errors.targetedprojectsStages}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-10'>
                                    <label htmlFor='programs' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        البرامج التي تقدمها المنظمة{' '}
                                    </label>
                                    <input placeholder='   البرامج التي تقدمها الشركة' onBlur={x.handleBlur} value={x.values.programs} onChange={x.handleChange} name='programs' id='programs' type='text' className='bg-transparent border  border-green-300  text-lg rounded-[35px] py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.programs && x.touched.programs && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.programs}
                                    </div>
                                )}
                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                <div className='mb-10'>
                                    <label htmlFor='CommercialRegister' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        رقم السجل التجاري{' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.CommercialRegister} onChange={x.handleChange} name='CommercialRegister' id='CommercialRegister' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.CommercialRegister && x.touched.CommercialRegister && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.CommercialRegister}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='Taxcard' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        رقم البطاقة الضريبية إن وجد  {' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.Taxcard} onChange={x.handleChange} name='Taxcard' id='Taxcard' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.Taxcard && x.touched.Taxcard && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.Taxcard}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='Companyrepresentativename' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        اسم ممثل الشركة {' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.Companyrepresentativename} onChange={x.handleChange} name='Companyrepresentativename' id='Companyrepresentativename' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.Companyrepresentativename && x.touched.Companyrepresentativename && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.Companyrepresentativename}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='CompanyrepresentativenameEmail' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        البريد الالكتروني لممثل الشركة{' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.CompanyrepresentativenameEmail} onChange={x.handleChange} name='CompanyrepresentativenameEmail' id='CompanyrepresentativenameEmail' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.CompanyrepresentativenameEmail && x.touched.CompanyrepresentativenameEmail && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.CompanyrepresentativenameEmail}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='nationalId' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        الرقم القومي/ رقم جواز السفر لممثل الشركة   {' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.nationalId} onChange={x.handleChange} name='nationalId' id='nationalId' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.nationalId && x.touched.nationalId && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.nationalId}
                                    </div>
                                )}
                                <div className="mb-10">
                                    <div className='flex justify-end items-center'>
                                        <label htmlFor="notification" className="block  me-4 text-sm font-thin text-end   text-white"> <p >  هل تود تلقي اشعارات بآخر الفرص والتحديثات؟ </p> </label>
                                        <input onBlur={x.handleBlur} checked={x.values.notification} onChange={x.handleChange} name="notification" id="notification" type="checkbox" className="w-5 h-5 text-green-600 mx-3  bg-transparent border-[#00F56059]  rounded-md focus:outline-none focus:ring-0" />
                                    </div>
                                </div>
                                <div className="mb-10">
                                    <div className='flex justify-end items-center'>
                                        <label className="block  me-4 text-sm font-thin text-end   text-white"> <p >  أوافق على <span onClick={() => { setOpenTermsOfServiceModal(true) }} className='text-[#00F560] cursor-pointer'>الشروط والأحكام وسياسة الخصوصية الخاصة بمنصة استثمارات.</span></p> </label>
                                        <input onBlur={x.handleBlur} checked={x.values.agreement} onChange={x.handleChange} name="agreement" id="agreement" type="checkbox" className="w-5 h-5 text-green-600 mx-3  bg-transparent border-[#00F56059]  rounded-md focus:outline-none focus:ring-0" />
                                    </div>
                                </div>
                                {x.errors.agreement && x.touched.agreement && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-semibold" style={{ direction: 'rtl' }}>خطأ : </span>{x.errors.agreement}
                                </div>}
                            </>
                        )}
                        <div className="flex justify-between items-start mb-32 w-full">
                            <div className="flex flex-col-reverse  md:flex-row justify-start  ">
                                <button
                                    type="submit"
                                    disabled={submitdisable()}
                                    className={`text-white  rounded-full  text-xl ${submitdisable() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2cce6d] hover:bg-[#25ff7c]  focus:ring-green-300'} font-medium px-8 py-3 me-2 mb-2  focus:outline-none `}>
                                    تسجيل
                                </button>
                                <button
                                    type="button"
                                    disabled={show1() || show2() || currentStep === 3}
                                    onClick={handleNext}
                                    className={`text-white  rounded-full  text-xl ${show1() || show2() || currentStep === 3 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2cce6d] hover:bg-[#25ff7c]  focus:ring-green-300'} font-medium px-8 py-3 me-2 mb-2  focus:outline-none `}>
                                    التالى
                                </button>
                            </div>
                            <div className="flex justify-end  items-start ">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={currentStep === 1}
                                    className={`text-white rounded-full  text-xl ${currentStep === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2cce6d] hover:bg-[#25ff7c]  focus:ring-green-300'} font-medium   px-8 py-3 me-2 mb-2  focus:outline-none `}>
                                    السابق
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUp;