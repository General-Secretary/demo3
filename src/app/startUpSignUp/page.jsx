'use client';
import React, { useState } from 'react'
import * as Yup from "yup";
import { Button, Modal } from "flowbite-react";
import { Vazirmatn } from 'next/font/google';
import { useFormik } from 'formik'; import { Datepicker } from "flowbite-react";
import 'react-international-phone/style.css';
import { InputAdornment, MenuItem, Select, TextField, Typography, } from '@mui/material';
import { defaultCountries, FlagImage, parseCountry, usePhoneInput, } from 'react-international-phone';
import Link from 'next/link'; import { Field, ErrorMessage } from 'formik';
import { TermsOfService } from '@/components/TermsOfService';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
const v = `
يجب أن يكون كلمة المرور مكونة من 8 أحرف أو أكثر وتحتوي على:
1. حرف واحد على الأقل من الحروف الكبيرة .
2. حرف واحد على الأقل من الحروف الصغيرة .
3. رقم واحد على الأقل (0-9).
4. رمز خاص واحد على الأقل (مثل #؟!@$%^&*-).
`;
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
    "خدمات تقنية وتكنولوجية",
    "خدمات التسويق والترويج",
    "خدمات لوجستية وتشغيلية",
    "خدمات التدريب والتطوير المهني",
    "خدمات القانون والاستشارات",
    "خدمات إدارية",
    "خدمات أخرى"
];
const empNumArray = ["5-10", "10-20", "20-40", "40-60", "اكثر من ذلك"]
const SignUp = () => {
    const [currentStep, setCurrentStep] = useState(1); 
    const [openTermsOfServiceModal, setOpenTermsOfServiceModal] = useState(false);
    const [preview, setPreview] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [fileName, setFileName] = useState("لم يتم اختيار ملف بعد");
    const [BDFName, setBDFName] = useState("لم يتم اختيار ملف بعد");
    const [BDFName2, setBDFName2] = useState("لم يتم اختيار ملف بعد");
    const validation = Yup.object().shape({
        companyName: Yup.string().required("يجب ادخال اسم الشركه ").min(3, "يجب الا يقل اسم الشركه عن حرفين").max(30, "يجب الا يزيد الاسم عن 30 حرف"),
        englishName: Yup.string().required("يجب ادخال الاسم بالانجليزيه").matches(/^[A-Za-z- ]+$/, "الاسم باللغه الانجليزيه لو سمحت").min(3, "يجب الا يقل اسم المستخدم عن حرفين").max(30, "يجب الا يزيد الاسم عن 30 حرف"),
        Fields: Yup.array().min(1, "يجب اختيار خيار واحد على الأقل").required("هذا الحقل مطلوب"),
        level: Yup.string().oneOf(["Pre-Seed", "Seed", "Series A", "Series B", "Late Stage / IPO"], "الاختيار غير صحيح").required("ادخل مرحله مناسبه"),
        image: Yup.mixed().required("الصورة مطلوبة").test("fileRequired", "يجب رفع صورة", (value) => value instanceof File),
        companyEmail: Yup.string().required("يجب ادخال البريد الالكتروني").email("ادخل بريد الكتروني صالح"),
        phone: Yup.string().matches(/^\+?[1-9]\d{3,14}$/, '! ادخل رقم تليفون او محمول صالح').required('! التليفون مطلوب'),
        companyWebsite: Yup.string().matches(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,6}(\/[a-z0-9\-._~:\/?#[\]@!$&'()*+,;=]*)?$/, 'رابط الموقع غير صالح').required('رابط الويب مطلوب'),
        country: Yup.string().oneOf(countries, "الاختيار غير صحيح").required("اختار دوله مناسبه"),
        Headquarters: Yup.string().oneOf(Object.values(governorates).flat(), "الاختيار غير صحيح").required("اختار محافظه او ولايه مناسبه"),
        password: Yup.string().required("ادخل كلمه سر مناسبه").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, v),
        rePassword: Yup.string().required("اعد كتابه كلمه السر").oneOf([Yup.ref("password")], "يجب مطابقه كلمه السر الاصليه "),
        companyDescription: Yup.string().matches(/^\s*(\S+\s+){2,499}\S+\s*$/, "يجب الا يقل الوصف عن 3 كلمات والا يزيد عن 500 كلمه").required("يجب ادخال وصف الشركه  ").min(3),
        jopModel: Yup.string().oneOf(["B2B", "B2C", "B2B2C", "C2C", "Marketplace", "SaaS", "B2G", "أخرى"], "الاختيار غير صحيح").required("ادخل عمله مناسبه"),
        targetMarket: Yup.string().oneOf(["السوق المحلي", "الشرق الأوسط وشمال إفريقيا", "أفريقيا", "أوروبا", "آسيا", "أمريكا الشمالية", "أمريكا الجنوبية", "استراليا وأوقيانوسيا", "عالمي", "أخرى"], "الاختيار غير صحيح").required("ادخل عمله مناسبه"),
        services: Yup.string().required("يجب ادخال الخدمات "),
        numOfEmployees: Yup.string().oneOf(empNumArray, "الاختيار غير صحيح").required("ادخل عدد مناسب"),
        FoundingDate: Yup.string().required("ادخل تاريخ مناسب"),
        Partnerships: Yup.string().required("يجب ادخال الشراكات او (لايوجد)  ").min(3),
        bmc: Yup.mixed()
            .required(" نموذج العمل التجارى مطلوب !").test("fileRequired", "يجب رفع نموذج العمل التجارى", (value) => value instanceof File)
            .test("fileType", "الملف يجب أن يكون PDF أو DOC أو PPTX", (value) => {
                if (!value) return false;
                const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"];
                return allowedTypes.includes(value.type);
            }),
        videoLink: Yup.string().required("الرابط مطلوب").matches(/^(https?:\/\/)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?$/, "الرابط غير صالح"),
        wantedMoney: Yup.string().matches(/^\d+$/, "الرجاء إدخال أرقام فقط").required("يجب ادخال قيمه الاستثمار المطلوبه"),
        currency: Yup.string().oneOf(["EGP", "USD", "EUR", "SAR", "AED"], "الاختيار غير صحيح").required("ادخل عمله مناسبه"),
        share: Yup.number().required("النسبة المئوية مطلوبة").min(.00000001, "النسبة المئوية يجب أن تكون على الأقل 1").max(100, "النسبة المئوية يجب أن تكون على الأكثر 100"),
        customerNum: Yup.number().required("عدد العملاء مطلوب").min(1, "عدد العملاء يجب أن يكون على الأقل 1").max(10000000000, "عدد العملاء يجب أن يكون منطقي").integer("عدد العملاء يجب أن يكون عدد صحيح").positive("عدد العملاء يجب أن يكون عدد إيجابي"),
        financingPurpose: Yup.string().matches(/^\s*(\S+\s+){2,499}\S+\s*$/, "يجب الا يقل الوصف عن 3 كلمات والا يزيد عن 500 كلمه").required("يجب ادخال الغرض من التمويل ").min(3),
        Annualrevenue: Yup.string().required("يجب ادخال الايرادات السنويه "),
        Netprofits: Yup.string().required("يجب ادخال الارباح او الخسائر السنويه "),
        ProfitabilityRatio: Yup.number().required("النسبة المئوية مطلوبة").min(.00000001, "النسبة المئوية يجب أن تكون على الأقل .00000001"),
        breakEven: Yup.string().required("ادخل تاريخ مناسب"),
        Incomestatement: Yup.mixed().required(" نموذج العمل التجارى مطلوب !").test("fileRequired", "يجب رفع نموذج العمل التجارى", (value) => value instanceof File)
            .test("fileType", "الملف يجب أن يكون PDF أو DOC أو PPTX", (value) => {
                if (!value) return false;
                const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"];
                return allowedTypes.includes(value.type);
            }),
        servicesNeeded: Yup.array(),
        servicesdescription: Yup.object().shape({
            "خدمات تقنية وتكنولوجية": Yup.string(),//.required('وصف خدمات تقنية وتكنولوجية مطلوب'),
            "خدمات التسويق والترويج": Yup.string(),//.required('وصف خدمات التسويق والترويج 1 مطلوب'),
            "خدمات لوجستية وتشغيلية": Yup.string(),//.required('وصف خدمات لوجستية وتشغيلية  مطلوب'),
            "خدمات التدريب والتطوير المهني": Yup.string(),//.required('وصف خدمات التدريب والتطوير المهني  مطلوب'),
            "خدمات القانون والاستشارات": Yup.string(),//.required('وصف خدمات القانون والاستشارات  مطلوب'),
            "خدمات إدارية": Yup.string(),//.required('وصف خدمات إدارية 1 مطلوب'),
            "أخرى": Yup.string(),//.required('وصف الخدمات الاخرى مطلوب'),
        }),
        Exitstrategy: Yup.string().matches(/^\s*(\S+\s+){2,499}\S+\s*$/, "يجب الا يقل النص عن 3 كلمات والا يزيد عن 500 كلمه").required("يجب ادخال استراتيجيه الخروج ").min(3),
        Expectedannualprofits: Yup.string().matches(/^\s*(\S+\s+){2,499}\S+\s*$/, "يجب الا يقل النص عن 3 كلمات والا يزيد عن 500 كلمه").required("يجب ادخال الإيرادات والأرباح المستقبلية المتوقعة لكل سنة   ").min(3),
        risks: Yup.string().matches(/^\s*(\S+\s+){2,499}\S+\s*$/, "يجب الا يقل النص عن 3 كلمات والا يزيد عن 500 كلمه").required("يجب ادخال المخاطر والتحديات التي يواجهها المشروع ").min(3),
        CommercialRegister: Yup.string().required("يجب ادخال رقم السجل التجارى  ").matches(/(^\d{10,15}$)|(^[A-Za-z0-9]{10,15}$)/, " يجب ادخال رقم سجل تجارى  صالح"),
        Taxcard: Yup.string().required("يجب ادخال رقم البطاقه الضريبيه  ").matches(/(^\d{10,15}$)|(^[A-Za-z0-9]{10,15}$)/, "يجب ادخال رقم بطاقه ضريبيه صالح     "),
        Companyrepresentativename: Yup.string().required("يجب ادخال الاسم ").min(3, "يجب الا يقل الاسم عن 3 حروف").max(30, "يجب الا يزيد الاسم عن 30 حرف"),
        CompanyrepresentativenameEmail: Yup.string().required("يجب ادخال البريد الالكتروني").email("ادخل بريد الكتروني صالح"),
        nationalId: Yup.string().required("يجب ادخال الرقم القومي (لو مصرى ) او جواز السفر( لو غير مصرى)  ").matches(/(^\d{14}$)|(^[A-Za-z0-9]{6,9}$)/, "يجب ادخال رقم قومي/ رقم جواز سفر صالح "),
        notification: Yup.boolean(),
        agreement: Yup.boolean().oneOf([true], "يجب الموافقه على الشروط والاحكام بعد الاطلاع عليها لاتمام التسجيل معنا").required()
    });
    async function submitting(value) {
        
        const result = value.servicesNeeded.reduce((acc, service) => {
            acc[service] = value.servicesdescription[service] || "";
            return acc;
        }, {});
        const resultJSON = JSON.stringify(result);
        const formData = new FormData();
        formData.append("companyName", value.companyName);
        formData.append("englishName", value.englishName);
        formData.append("Fields", JSON.stringify(value.Fields));
        formData.append("level", value.level);
        if (value.image) {
            formData.append("image", value.image);
        }
        formData.append("companyEmail", value.companyEmail);
        formData.append("phone", value.phone);
        formData.append("companyWebsite", value.companyWebsite);
        formData.append("country", value.country);
        formData.append("Headquarters", value.Headquarters);
        formData.append("password", value.password);
        formData.append("rePassword", value.rePassword);
        formData.append("companyDescription", value.companyDescription);
        formData.append("jopModel", value.jopModel);
        formData.append("targetMarket", value.targetMarket);
        formData.append("services", value.services);
        formData.append("numOfEmployees", value.numOfEmployees);
        formData.append("FoundingDate", value.FoundingDate);
        formData.append("Partnerships", value.Partnerships);
        if (value.bmc) {
            formData.append("bmc", value.bmc);
        }
        formData.append("videoLink", value.videoLink);
        formData.append("wantedMoney", value.wantedMoney);
        formData.append("currency", value.currency);
        formData.append("share", value.share);
        formData.append("customerNum", value.customerNum);
        formData.append("financingPurpose", value.financingPurpose);
        formData.append("Annualrevenue", value.Annualrevenue);
        formData.append("Netprofits", value.Netprofits);
        formData.append("ProfitabilityRatio", value.ProfitabilityRatio);
        formData.append("breakEven", value.breakEven);
        if (value.Incomestatement) {
            formData.append("Incomestatement", value.Incomestatement);
        }
        formData.append("servicesNeeded", resultJSON);
        formData.append("Exitstrategy", value.Exitstrategy);
        formData.append("Expectedannualprofits", value.Expectedannualprofits);
        formData.append("risks", value.risks);
        formData.append("CommercialRegister", value.CommercialRegister);
        formData.append("Taxcard", value.Taxcard);
        formData.append("Companyrepresentativename", value.Companyrepresentativename);
        formData.append("CompanyrepresentativenameEmail", value.CompanyrepresentativenameEmail);
        formData.append("nationalId", value.nationalId);
        formData.append("notification", value.notification);
        formData.append("agreement", value.agreement);
        formData.forEach((value, key) => {
            console.log(key, value);
        });
    }
    const x = useFormik({
        initialValues: {
            companyName: "", englishName: "", Fields: [], level: "", image: null, companyEmail: "", phone: "", companyWebsite: "",
            country: "", Headquarters: "", password: "", rePassword: "", companyDescription: "", jopModel: "", targetMarket: "", services: "", numOfEmployees: "",
            FoundingDate: new Date(), Partnerships: "", bmc: null, videoLink: "", wantedMoney: "", currency: "", share: "", customerNum: "", financingPurpose: "", Annualrevenue: "", Netprofits: "", ProfitabilityRatio: "", breakEven: new Date(),
            Incomestatement: null, servicesNeeded: [], servicesdescription: "", Exitstrategy: "", Expectedannualprofits: "", risks: "", CommercialRegister: "", Taxcard: "", Companyrepresentativename: "", CompanyrepresentativenameEmail: "",
            nationalId: "", notification: false, agreement: false
        },
        onSubmit: submitting,
        validationSchema: validation,
    });
    const handleNext = () => {
        if (currentStep < 4) {
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
    };
    function show1() {
        if (currentStep == 1) {
            if (Object.keys(x.touched).length == 0 || !x.values.image || x.errors.englishName || x.errors.companyEmail || x.errors.password || x.errors.rePassword
                || x.errors.companyName || x.errors.Fields || x.errors.level || x.errors.phone || x.errors.companyWebsite || x.errors.country || x.errors.Headquarters
            ) {
                return true
            }
        } return false
    }
    function show2() {
        if (currentStep == 2) {
            if (Object.keys(x.touched).length == 0 || x.errors.companyDescription || x.errors.jopModel || x.errors.targetMarket || x.errors.services || x.errors.numOfEmployees
                || x.errors.FoundingDate || x.errors.Partnerships || x.errors.bmc || x.errors.videoLink) {
                return true
            }
        } return false
    }
    function show3() {

        if (x.values.servicesNeeded.some(service => {
            return x.values.servicesdescription[service] === "" || x.values.servicesdescription[service] === undefined;
        })) return true;

        if (currentStep == 3) {
            if (Object.keys(x.touched).length == 0 || x.errors.wantedMoney || x.errors.currency || x.errors.share || x.errors.customerNum || x.errors.financingPurpose
                || x.errors.Annualrevenue || x.errors.Netprofits || x.errors.ProfitabilityRatio || x.errors.breakEven || x.errors.Incomestatement || x.errors.servicesNeeded
                || x.errors.servicesdescription || x.errors.Exitstrategy || x.errors.Expectedannualprofits || x.errors.risks
            ) {
                return true
            }
        } return false
    }


    const handleDescriptionChange = (e) => {
        const { name, value } = e.target;
        x.setFieldValue('servicesdescription', {
            ...x.values.servicesdescription,
            [name]: value,
        });
    };

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
        if (Object.keys(x.errors).length > 0 || Object.keys(x.touched).length == 0 || currentStep < 4) {
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
                                <div className={` border-b-[3px] ${currentStep === 1 || currentStep === 2 || currentStep === 3 || currentStep === 4 ? "border-b-[#00F560]" : ""}`}>
                                    <p className={`${currentStep === 1 || currentStep === 2 || currentStep === 3 || currentStep === 4 ? "text-[#00F560]" : ""} m-2`}>بيانات اساسية</p>
                                </div>
                            </div>
                            <div className='w-1/3 px-1'>
                                <div className={` border-b-[3px] ${currentStep === 2 || currentStep === 3 || currentStep === 4 ? "border-b-[#00F560]" : "border-b-[#A1A1AA]"}  `}>
                                    <p className={`${currentStep === 2 || currentStep === 3 || currentStep === 4 ? "text-[#00F560]" : "text-[#A1A1AA]"} m-2`}> تفاصيل المشروع </p>
                                </div>
                            </div>
                            <div className='w-1/3 px-1'>
                                <div className={` border-b-[3px]  ${currentStep === 3 || currentStep === 4 ? "border-b-[#00F560]" : "border-b-[#A1A1AA]"}`}>
                                    <p className={`${currentStep === 3 || currentStep === 4 ? "text-[#00F560]" : "text-[#A1A1AA]"} my-5 sm:my-2 m-2`}>  المالية</p>
                                </div>
                            </div>
                            <div className='w-1/3 px-1'>
                                <div className={` border-b-[3px]  ${currentStep === 4 ? "border-b-[#00F560]" : "border-b-[#A1A1AA]"}`}>
                                    <p className={`${currentStep === 4 ? "text-[#00F560]" : "text-[#A1A1AA]"} m-2`}>  البيانات الثبوتية</p>
                                </div>
                            </div>
                        </div>
                        {currentStep === 1 && (
                            <>
                                <div className='mb-10'>
                                    <label htmlFor='companyName' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        اسم الشركه بالكامل{' '}
                                    </label>
                                    <input placeholder=' اسم الشركه' onBlur={x.handleBlur} value={x.values.companyName} onChange={x.handleChange} name='companyName' id='companyName' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.companyName && x.touched.companyName && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.companyName}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='englishName' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        اسم المستخدم بالانجليزيه{' '}
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
                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14  relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='level' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>  مرحلة المشروع  </p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="level" onBlur={x.handleBlur} value={x.values.level} onChange={x.handleChange} className=" border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 truncate text-white focus:ring-green-500">
                                                <option >مرحلة المشروع  </option>
                                                <option value="Pre-Seed">Pre-Seed ( النماذج الأولية)
                                                </option>
                                                <option value="Seed">Seed (مرحلة التأسيس والتمويل الأولي)
                                                </option>
                                                <option value="Series A">Series A (التوسع الأولي)
                                                </option>
                                                <option value="Series B">Series B  (التوسع والنمو السريع)
                                                </option>
                                                <option value="Late Stage / IPO">Late Stage / IPO  (ما قبل الطرح العام)</option>
                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.level && x.touched.level && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.level}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14  relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='Fields' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>  مجال الشركه</p>
                                            <p className='text-gray-200'></p>{' '}
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <div className='border select-none mb-4 text-start ps-10 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400  truncate text-white focus:ring-green-500' onClick={() => { setOpenModal(true); x.setFieldTouched("Fields", true); }}> {x.values.Fields[0] || "مجال الشركه"}</div>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                            <Modal
                                                dismissible
                                                show={openModal}
                                                onClose={() => setOpenModal(false)}
                                                className="bg-black bg-opacity-80  backdrop-blur-sm"
                                            >
                                                <Modal.Header className="bg-black border  border-b border-green-400">
                                                    <p className="text-white">  مجالات الشركه</p>
                                                </Modal.Header>
                                                <Modal.Body className="bg-black border-x border-green-300 text-white">
                                                    <div className="space-y-6">
                                                        {options.map((option) => (
                                                            <label key={option} className="flex items-center mb-2 text-sm font-thin text-white">
                                                                {option.includes('-') ? (
                                                                    <p className="text-green-400 border mb-4 font-semibold border-green-300 text-center text-lg rounded-full py-2    block w-full p-2.5 ">{option.replace('-', '')}</p>
                                                                ) : (
                                                                    <>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="Fields"
                                                                            value={option}
                                                                            checked={x.values.Fields.includes(option)}
                                                                            onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                let newSelection = [...x.values.Fields];
                                                                                if (checked) {
                                                                                    newSelection.push(value);
                                                                                } else {
                                                                                    newSelection = newSelection.filter(
                                                                                        (item) => item !== value
                                                                                    );
                                                                                }
                                                                                x.setFieldValue("Fields", newSelection);
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
                                                        onClick={() => setOpenModal(false)}
                                                    >
                                                        done
                                                    </button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                        {x.errors.Fields && x.touched.Fields && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.Fields}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <div className="flex items-center  justify-end">
                                        <div className=' flex justify-between flex-col xs:flex-row items-center w-full' style={{ direction: "rtl" }}>
                                            <div className='w-[104px] my-3 xs:my-0 border overflow-hidden border-[#00F56059] justify-center flex items-center h-[104px] rounded-full bg-[#D9D9D940]'>
                                                {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded" /> || <i className="fa-regular text-white opacity-70 text-[56px] fa-user"></i>}
                                            </div>
                                            <div className='w-[85%] flex-col xs:flex-row flex justify-start items-center '>
                                                <label onClick={(event) => { x.setFieldTouched("image", true) }} htmlFor="image" className="bg-[#00F560] mx-4  text-white p-2 px-4 rounded-full cursor-pointer">
                                                    ارفع صورة الشعار
                                                </label>
                                                <span className="ml-4 mt-4 xs:mt-0 text-white">{fileName}</span>
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
                                    <label htmlFor='companyEmail' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p>  البريد الالكتروني الرسمي للشركه </p>{' '}
                                    </label>
                                    <input placeholder=' example@gmail.com' onBlur={x.handleBlur} value={x.values.companyEmail} onChange={x.handleChange} name='companyEmail' id='companyEmail' type='email' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.companyEmail && x.touched.companyEmail && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.companyEmail}
                                    </div>
                                )}
                                <div className='mb-10  w-full'>
                                    <label htmlFor='phone' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p> رقم هاتف للتواصل </p>{' '}
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
                                                        )}
                                                    >
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
                                    <label htmlFor='companyWebsite' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        الموقع الالكتروني للشركة{' '}
                                    </label>
                                    <input placeholder=' www.example.com ' onBlur={x.handleBlur} value={x.values.companyWebsite} onChange={x.handleChange} name='companyWebsite' id='companyWebsite' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.companyWebsite && x.touched.companyWebsite && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.companyWebsite}
                                    </div>
                                )}
                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14  relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='Headquarters' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>   المقر الرئيسي  </p>
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
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
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
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
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
                                    </div>
                                )}
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <div className='mb-10'>
                                    <label htmlFor='companyDescription' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        وصف الشركة (بحد اقصي 500 كلمه) {' '}
                                    </label>
                                    <textarea placeholder='  وصف الشركة' onBlur={x.handleBlur} value={x.values.companyDescription} onChange={x.handleChange} name='companyDescription' rows="5" id='companyDescription' type='text' className='bg-transparent border  border-green-300  text-lg rounded-[35px] py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.companyDescription && x.touched.companyDescription && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.companyDescription}
                                    </div>
                                )}
                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='targetMarket' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> السوق المستهدف</p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="targetMarket" onBlur={x.handleBlur} value={x.values.targetMarket} onChange={x.handleChange} className=" border  mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                                <option defaultValue>السوق المستهدف</option>
                                                <option value="السوق المحلي">السوق المحلي</option>
                                                <option value="الشرق الأوسط وشمال إفريقيا">الشرق الأوسط وشمال إفريقيا</option>
                                                <option value="أفريقيا">أفريقيا</option>
                                                <option value="أوروبا">أوروبا</option>
                                                <option value="آسيا">آسيا</option>
                                                <option value="أمريكا الشمالية">أمريكا الشمالية</option>
                                                <option value="أمريكا الجنوبية">أمريكا الجنوبية</option>
                                                <option value="استراليا وأوقيانوسيا">استراليا وأوقيانوسيا</option>
                                                <option value="عالمي">عالمي</option>
                                                <option value="أخرى">أخرى</option>

                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.targetMarket && x.touched.targetMarket && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.targetMarket}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='jopModel' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> نموذج العمل</p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="jopModel" onBlur={x.handleBlur} value={x.values.jopModel} onChange={x.handleChange} className=" border truncate mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                                <option defaultValue> نموذج العمل</option>
                                                <option value="B2B">B2B</option>
                                                <option value="B2C">B2C</option>
                                                <option value="B2B2C">B2B2C</option>
                                                <option value="C2C">C2C</option>
                                                <option value="Marketplace">Marketplace</option>
                                                <option value="SaaS">SaaS</option>
                                                <option value="B2G">B2G</option>
                                                <option value="أخرى">أخرى</option>
                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.jopModel && x.touched.jopModel && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.jopModel}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <label htmlFor='services' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        خدمات/ منتجات الشركة {' '}
                                    </label>
                                    <input placeholder='   الخدمات التي تقدمها الشركة' onBlur={x.handleBlur} value={x.values.services} onChange={x.handleChange} name='services' id='services' type='text' className='bg-transparent border  border-green-300  text-lg rounded-[35px] py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.services && x.touched.services && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.services}
                                    </div>
                                )}
                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='FoundingDate' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> تاريخ التأسيس </p>
                                            <p>(فى حاله عدم التحديد يتم تحديد تاريخ اليوم) </p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <div className='datepicker pb-4'>
                                                <Datepicker onBlur={x.handleBlur} id="FoundingDate" name="FoundingDate" value={x.values.FoundingDate} onChange={(date) => x.setFieldValue("FoundingDate", date)}
                                                    theme={{
                                                        "root": {
                                                            "base": "relative "
                                                        },
                                                        "popup": {
                                                            "root": {
                                                                "base": "absolute -left-10 xs:left-0 top-10 z-50 block pt-2",
                                                                "inline": "relative top-0 z-auto",
                                                                "inner": "inline-block rounded-lg  p-4 shadow-lg bg-black"
                                                            },
                                                            "header": {
                                                                "base": "",
                                                                "title": "px-2 py-3 text-center font-semibold text-white",
                                                                "selectors": {
                                                                    "base": "mb-2 flex justify-between",
                                                                    "button": {
                                                                        "base": "rounded-lg  px-5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-700 text-white hover:bg-gray-600",
                                                                        "prev": "",
                                                                        "next": "",
                                                                        "view": ""
                                                                    }
                                                                }
                                                            },
                                                            "view": {
                                                                "base": "p-2"
                                                            },
                                                            "footer": {
                                                                "base": "mt-2 flex space-x-2",
                                                                "button": {
                                                                    "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
                                                                    "today": "bg-[#00F560] text-white hover:bg-green-300  dark:hover:bg-cyan-700",
                                                                    "clear": "border hidden border-gray-300  text-white hover:bg-red-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                                                }
                                                            }
                                                        },
                                                        "views": {
                                                            "days": {
                                                                "header": {
                                                                    "base": "mb-1 grid grid-cols-7",
                                                                    "title": "h-6 text-center text-sm font-medium leading-6 text-white dark:text-gray-400"
                                                                },
                                                                "items": {
                                                                    "base": "grid w-64 grid-cols-7",
                                                                    "item": {
                                                                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                                                        "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                                                                        "disabled": "text-gray-600"
                                                                    }
                                                                }
                                                            },
                                                            "months": {
                                                                "items": {
                                                                    "base": "grid w-64 grid-cols-4",
                                                                    "item": {
                                                                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                                                        "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                                                                        "disabled": "text-gray-600"
                                                                    }
                                                                }
                                                            },
                                                            "years": {
                                                                "items": {
                                                                    "base": "grid w-64 grid-cols-4",
                                                                    "item": {
                                                                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                                                        "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                                                                        "disabled": "text-gray-600"
                                                                    }
                                                                }
                                                            },
                                                            "decades": {
                                                                "items": {
                                                                    "base": "grid w-64 grid-cols-4",
                                                                    "item": {
                                                                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                                                        "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                                                                        "disabled": "text-gray-600"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }} minDate={new Date(1900, 0, 1)} maxDate={new Date()} />
                                            </div>
                                        </div>
                                        {x.errors.FoundingDate && x.touched.FoundingDate && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.FoundingDate}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='numOfEmployees' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> عدد الموظفين الحاليين </p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="numOfEmployees" onBlur={x.handleBlur} value={x.values.numOfEmployees} onChange={x.handleChange} className=" border truncate mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                                <option defaultValue>اختر </option>
                                                {
                                                    empNumArray.map((num) => { return <option value={num}>{num}</option> })
                                                }
                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.numOfEmployees && x.touched.numOfEmployees && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.numOfEmployees}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <label htmlFor='Partnerships' style={{ direction: 'rtl' }} className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        الشراكات (في حال عدم وجود شراكات كتابة لا يوجد){' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.Partnerships} onChange={x.handleChange} name='Partnerships' id='Partnerships' type='text' className='bg-transparent border  border-green-300  text-lg rounded-[35px] py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.Partnerships && x.touched.Partnerships && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.Partnerships}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='bmc' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        نموذج العمل التجاري (BMC) {' '}
                                    </label>
                                    <div onClick={(event) => { x.setFieldTouched("bmc", true) }} className="flex items-center justify-center w-full p-2 text-center">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center  rounded-[50px] w-full h-64 border-2 border-gray-300 border-dashed  cursor-pointer bg-[#02C04D1A] dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-green-800 dark:border-gray-600 dark:hover:border-gray-500 ">
                                            <div className="flex flex-col  rounded-full items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg> <p className="text-sm text-gray-500 dark:text-gray-400">قم برفع ملف بصيغة  من على جهازك يتضمن النموذج بشكل واضح وكامل.</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400"> (.pdf, .doc, .pptx)</p>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                onBlur={x.handleBlur}
                                                name="bmc"
                                                accept=".pdf,.doc,.docx,.pptx"
                                                type="file"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setBDFName(file ? file.name : "لم يتم اختيار ملف بعد");
                                                    if (file) {
                                                        x.setFieldValue("bmc", file);
                                                    } else {
                                                        x.setFieldValue("bmc", null);
                                                    }
                                                }}
                                                className="hidden"
                                            />
                                        </label>
                                    </div> <span className="ml-4 mt-4 sm:mt-0 text-white">{BDFName}</span>
                                </div>
                                {x.errors.bmc && x.touched.bmc && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.bmc}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='videoLink' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        رابط فيديو التعريف بالمشروع (تأكد من اتاحة الوصول للعامة){' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.videoLink} onChange={x.handleChange} name='videoLink' id='videoLink' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.videoLink && x.touched.videoLink && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.videoLink}
                                    </div>
                                )}
                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='currency' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> العمله</p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="currency" onBlur={x.handleBlur} value={x.values.currency} onChange={x.handleChange} className=" border  mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                                <option defaultValue>اختر </option>
                                                <option value="USD">USD</option>
                                                <option value="EGP">EGP</option>
                                                <option value="EUR">EUR</option>
                                                <option value="SAR">SAR</option>
                                                <option value="AED">AED</option>
                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.currency && x.touched.currency && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.currency}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='wantedMoney' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>  قيمه الاستثمار المطلوب  </p>
                                        </label>
                                        <input placeholder=' .' type="number" pattern="\d*" onBlur={x.handleBlur} value={x.values.wantedMoney} onChange={x.handleChange} name='wantedMoney' id='wantedMoney' className=' border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 bg-transparent   ' />
                                        {x.errors.wantedMoney && x.touched.wantedMoney && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.wantedMoney}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='customerNum' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>  عدد العملاء والمستخدمين النشطين </p>
                                        </label>
                                        <input placeholder=' .' type="number" pattern="\d*" onBlur={x.handleBlur} value={x.values.customerNum} onChange={x.handleChange} name='customerNum' id='customerNum' className=' border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 bg-transparent   ' />
                                        {x.errors.customerNum && x.touched.customerNum && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.customerNum}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='share' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>  النسبه من اسهم الشركه</p>
                                        </label>
                                        <input placeholder=' %' type="number" pattern="\d*" onBlur={x.handleBlur} value={x.values.share} onChange={x.handleChange} name='share' id='share' className=' border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 bg-transparent   ' />
                                        {x.errors.share && x.touched.share && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.share}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <label htmlFor='financingPurpose' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        الغرض من التمويل بالتفصيل {' '}
                                    </label>
                                    <textarea placeholder='' onBlur={x.handleBlur} value={x.values.financingPurpose} onChange={x.handleChange} name='financingPurpose' rows="5" id='financingPurpose' type='text' className='bg-transparent border  border-green-300  text-lg rounded-[35px] py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.financingPurpose && x.touched.financingPurpose && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.financingPurpose}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='Annualrevenue' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        الإيرادات السنوية{' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.Annualrevenue} onChange={x.handleChange} name='Annualrevenue' id='Annualrevenue' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.Annualrevenue && x.touched.Annualrevenue && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.Annualrevenue}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='Netprofits' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        صافي الأرباح أو الخسائر السنوية {' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.Netprofits} onChange={x.handleChange} name='Netprofits' id='Netprofits' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.Netprofits && x.touched.Netprofits && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.Netprofits}
                                    </div>
                                )}
                                <div className='flex justify-between  flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14 relativew-[90%] xs:w-[45%] ' >
                                        <label htmlFor='breakEven' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> نقطة التعادل (Break-even )</p>
                                            <p>(فى حاله عدم التحديد يتم تحديد تاريخ اليوم) </p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <div className='datepicker pb-4'>
                                                <Datepicker onBlur={x.handleBlur} id="breakEven" name="breakEven" value={x.values.breakEven} onChange={(date) => x.setFieldValue("breakEven", date)}
                                                    theme={{
                                                        "root": {
                                                            "base": "relative "
                                                        },
                                                        "popup": {
                                                            "root": {
                                                                "base": "absolute top-10 z-50 block pt-2",
                                                                "inline": "relative top-0 z-auto",
                                                                "inner": "inline-block rounded-lg  p-4 shadow-lg bg-black"
                                                            },
                                                            "header": {
                                                                "base": "",
                                                                "title": "px-2 py-3 text-center font-semibold text-white",
                                                                "selectors": {
                                                                    "base": "mb-2 flex justify-between",
                                                                    "button": {
                                                                        "base": "rounded-lg  px-5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-700 text-white hover:bg-gray-600",
                                                                        "prev": "",
                                                                        "next": "",
                                                                        "view": ""
                                                                    }
                                                                }
                                                            },
                                                            "view": {
                                                                "base": "p-2"
                                                            },
                                                            "footer": {
                                                                "base": "mt-2 flex space-x-2",
                                                                "button": {
                                                                    "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
                                                                    "today": "bg-[#00F560] text-white hover:bg-green-300  dark:hover:bg-cyan-700",
                                                                    "clear": "border hidden border-gray-300  text-white hover:bg-red-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                                                }
                                                            }
                                                        },
                                                        "views": {
                                                            "days": {
                                                                "header": {
                                                                    "base": "mb-1 grid grid-cols-7",
                                                                    "title": "h-6 text-center text-sm font-medium leading-6 text-white dark:text-gray-400"
                                                                },
                                                                "items": {
                                                                    "base": "grid w-64 grid-cols-7",
                                                                    "item": {
                                                                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                                                        "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                                                                        "disabled": "text-gray-600"
                                                                    }
                                                                }
                                                            },
                                                            "months": {
                                                                "items": {
                                                                    "base": "grid w-64 grid-cols-4",
                                                                    "item": {
                                                                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                                                        "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                                                                        "disabled": "text-gray-600"
                                                                    }
                                                                }
                                                            },
                                                            "years": {
                                                                "items": {
                                                                    "base": "grid w-64 grid-cols-4",
                                                                    "item": {
                                                                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                                                        "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                                                                        "disabled": "text-gray-600"
                                                                    }
                                                                }
                                                            },
                                                            "decades": {
                                                                "items": {
                                                                    "base": "grid w-64 grid-cols-4",
                                                                    "item": {
                                                                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                                                        "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                                                                        "disabled": "text-gray-600"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }} minDate={new Date(1900, 0, 1)} maxDate={new Date()} />
                                            </div>
                                        </div>
                                        {x.errors.breakEven && x.touched.breakEven && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.breakEven}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='ProfitabilityRatio' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>نسبة الربحية الإجمالية</p>
                                        </label>
                                        <input placeholder=' %' type="number" pattern="\d*" onBlur={x.handleBlur} value={x.values.ProfitabilityRatio} onChange={x.handleChange} name='ProfitabilityRatio' id='ProfitabilityRatio' className=' border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 bg-transparent   ' />
                                        {x.errors.ProfitabilityRatio && x.touched.ProfitabilityRatio && (
                                            <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.ProfitabilityRatio}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <label htmlFor='Incomestatement' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        قائمة الدخل والميزانية العمومية {' '}
                                    </label>
                                    <div onClick={(event) => { x.setFieldTouched("Incomestatement", true) }} className="flex items-center justify-center w-full p-2 text-center">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center  rounded-[50px] w-full h-64 border-2 border-gray-300 border-dashed  cursor-pointer bg-[#02C04D1A] dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-green-800 dark:border-gray-600 dark:hover:border-gray-500 ">
                                            <div className="flex flex-col  rounded-full items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg> <p className="text-sm text-gray-500 dark:text-gray-400">قم برفع ملف بصيغة  من على جهازك يتضمن النموذج بشكل واضح وكامل.</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400"> (.pdf, .doc, .pptx)</p>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                onBlur={x.handleBlur}
                                                name="Incomestatement"
                                                accept=".pdf,.doc,.docx,.pptx"
                                                type="file"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setBDFName2(file ? file.name : "لم يتم اختيار ملف بعد");
                                                    if (file) {
                                                        x.setFieldValue("Incomestatement", file);
                                                    } else x.setFieldValue("Incomestatement", null);
                                                }}
                                                className="hidden"
                                            />
                                        </label>
                                    </div> <span className="ml-4 mt-4 sm:mt-0 text-white">{BDFName2}</span>
                                </div>
                                {x.errors.Incomestatement && x.touched.Incomestatement && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.Incomestatement}
                                    </div>
                                )}
                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                </div>


                                <div className='mb-14  relative w-full  ' >
                                    <label htmlFor='servicesNeeded' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        <p>  الخدمات التي يحتاجها المشروع </p>
                                        <p className='text-gray-200'></p>{' '}
                                    </label>
                                    <div className="relative" style={{ direction: "rtl" }}>
                                        <div className='border select-none mb-4 text-start ps-10 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400  truncate text-white focus:ring-green-500' onClick={() => { setOpenModal(true); x.setFieldTouched("servicesNeeded", true); }}> {x.values.servicesNeeded[0] || " الخدمات"}</div>
                                        <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        <Modal
                                            dismissible
                                            show={openModal}
                                            onClose={() => setOpenModal(false)}
                                            className="bg-black bg-opacity-80  backdrop-blur-sm"
                                        >
                                            <Modal.Header className="bg-black border  border-b border-green-400">
                                                <p className="text-white">    الخدمات التي يحتاجها المشروع </p>
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
                                                                        name="servicesNeeded"
                                                                        value={option}
                                                                        checked={x.values.servicesNeeded.includes(option)}
                                                                        onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            let newSelection = [...x.values.servicesNeeded];
                                                                            if (checked) {
                                                                                newSelection.push(value);
                                                                            } else {
                                                                                newSelection = newSelection.filter(
                                                                                    (item) => item !== value
                                                                                );
                                                                            }
                                                                            x.setFieldValue("servicesNeeded", newSelection);
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
                                                    onClick={() => setOpenModal(false)}
                                                >
                                                    done
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    {x.errors.servicesNeeded && x.touched.servicesNeeded && (
                                        <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                            <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                خطأ :{' '}
                                            </span>
                                            {x.errors.servicesNeeded}
                                        </div>
                                    )}
                                </div>
                                {x.values.servicesNeeded.map((option) => (
                                    <>
                                        <div key={option} className='mb-14 relative w-full ' >
                                            <label htmlFor={option} className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                                {' '}
                                                <p>  {`وصف ${option}`}</p>
                                            </label>
                                            <input type="text" pattern="\d*" onBlur={x.handleBlur} value={x.values.servicesdescription[option] || ''} onChange={handleDescriptionChange} name={option} id={option} className=' border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 bg-transparent   ' />
                                        </div>
                                    </>
                                ))}
                                <div className='mb-10'>
                                    <label htmlFor='Exitstrategy' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        استراتيجية الخروج{' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.Exitstrategy} onChange={x.handleChange} name='Exitstrategy' id='Exitstrategy' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.Exitstrategy && x.touched.Exitstrategy && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.Exitstrategy}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='Expectedannualprofits' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        الإيرادات والأرباح المستقبلية المتوقعة لكل سنة{' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.Expectedannualprofits} onChange={x.handleChange} name='Expectedannualprofits' id='Expectedannualprofits' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.Expectedannualprofits && x.touched.Expectedannualprofits && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.Expectedannualprofits}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='risks' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        المخاطر والتحديات التي يواجهها المشروع{' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.risks} onChange={x.handleChange} name='risks' id='risks' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.risks && x.touched.risks && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.risks}
                                    </div>
                                )}
                            </>
                        )}
                        {currentStep === 4 && (
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
                                    disabled={show1() || show2() || show3() || currentStep === 4}
                                    onClick={handleNext}
                                    className={`text-white  rounded-full  text-xl ${show1() || show2() || show3() || currentStep === 4 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2cce6d] hover:bg-[#25ff7c]  focus:ring-green-300'} font-medium px-8 py-3 me-2 mb-2  focus:outline-none `}>
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