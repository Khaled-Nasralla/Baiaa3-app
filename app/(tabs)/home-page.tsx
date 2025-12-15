import { ThemedView } from "@/components/themed-view";
import { FloatingButton } from "@/components/ui/floating-btn";
import { Serach } from "@/components/ui/search";
import { SectionsBar } from "@/components/ui/sections-bar";
import { Template } from "@/components/ui/template";
import { images } from "@/constants/images";
import { useGetProducts } from "@/contexts/get-products-context/get-products-context-provider";
import { useFetchProducts } from "@/hooks/fetch-products";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import homeStyles from "../(styles)/home-page-styles";


/* =========================
   منتجات وهمية (أمثلة)
   ========================= */
const PRODUCTS = [
  { id: "1", title: "سيارة BMW 2019 بحالة ممتازة" },
  { id: "2", title: "دراجة نارية هوندا جديدة" },
  { id: "3", title: "iPhone 13 Pro Max مستعمل" },
  { id: "4", title: "لابتوب Dell i7 للألعاب" },
  { id: "5", title: "جاكيت شتوي رجالي" },
  { id: "6", title: "عدة ميكانيك كاملة" },
  { id: "7", title: "عطر فرنسي أصلي" },
  { id: "8", title: "وظيفة مبرمج React Native" },
  { id: "9", title: "مطعم شاورما قريب" },
  { id: "10", title: "غسالة LG أوتوماتيك" },
  { id: "11", title: "كنبة زاوية حديثة" },
];

/* =========================
   100 كلمة مفتاحية لكل فئة
   ========================= */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  carMoto: [
    "سيارة", "سيارات", "دراجة", "دراجات", "موتور", "محرك", "BMW", "مرسيدس", "تويوتا", "هوندا",
    "نيسان", "فورد", "كيا", "هيونداي", "مازدا", "أودي", "فولكس", "جيب", "سيدان", "SUV",
    "كهرباء", "بنزين", "ديزل", "أوتوماتيك", "عادي", "جير", "فرامل", "إطارات", "عجلات",
    "بطارية", "زيت", "مكيف", "شاصي", "مقود", "عداد", "كراج", "ترخيص", "لوحة",
    "شاحنة", "بيكاب", "فان", "سكوتر", "خوذة", "دباب", "سير", "سلسلة",
    "قطع", "قطع غيار", "فلتر", "مضخة", "راديتر", "سرعة", "سباق",
    "سيكل", "مركبة", "نقل", "جرار", "قلاب", "رافعة", "تجاري", "خصوصي",
    "هيكل", "بودي", "طلاء", "سمكرة", "تصليح", "حادث", "مستعملة", "جديدة",
    "كهربائي", "ميكانيك", "فحص", "تأمين", "شحن", "استيراد"
  ],

  pcAndPhone: [
    "هاتف", "موبايل", "جوال", "سمارت", "iPhone", "سامسونج", "شاومي", "هواوي", "أوبو",
    "نوكيا", "ريلمي", "سوني", "LG", "أندرويد", "iOS", "كمبيوتر", "حاسوب",
    "لابتوب", "PC", "Mac", "Windows", "Linux", "رام", "ذاكرة", "تخزين",
    "SSD", "HDD", "معالج", "CPU", "GPU", "Intel", "AMD", "Ryzen", "Core",
    "كرت شاشة", "شاشة", "لمس", "بطارية", "شاحن", "كابل", "USB", "Type-C",
    "سماعة", "سماعات", "بلوتوث", "واي فاي", "راوتر", "مودم", "كيبورد",
    "ماوس", "طابعة", "سكانر", "كاميرا", "ويب كام", "مايك", "هارد",
    "سوفت وير", "تطبيق", "ألعاب", "جيمينغ", "شبكة", "سيرفر", "تابلت",
    "iPad", "Surface", "Chromebook", "فلاش", "SD", "تقنية", "الكترونيات"
  ],

  tools: [
    "عدة", "معدات", "أدوات", "مطرقة", "مفك", "مسمار", "برغي", "مفتاح",
    "نجارة", "حدادة", "كهرباء", "سباكة", "قص", "حفر", "منشار", "دريل",
    "مثقاب", "متر", "ميزان", "مقص", "كماشة", "بنسة", "مبرد", "صاروخ",
    "جلخ", "معدات ورشة", "عدد يدوية", "عدد كهربائية", "عدة سيارات",
    "عدة ميكانيك", "عدة بناء", "خرسانة", "حديد", "خشب", "ألمنيوم",
    "قص ليزر", "لحام", "قصدير", "كاوية", "مولد", "كمبروسر", "ضاغط",
    "هواء", "مفاتيح", "عدة إصلاح", "عدة منزل", "عدة صناعية", "معدة",
    "معدات ثقيلة", "عدة فني", "عدة كهربائي", "عدة سباك", "عدة نجار"
  ],

  clothes: [
    "ملابس", "ألبسة", "جاكيت", "بنطال", "قميص", "تيشيرت", "كنزة", "سترة",
    "معطف", "فستان", "تنورة", "عباية", "حجاب", "قبعة", "طاقية", "جوارب",
    "حذاء", "أحذية", "صندل", "شبشب", "رياضي", "رسمي", "جلدي", "قطني",
    "صيفي", "شتوي", "خريفي", "ربيعي", "رجالي", "نسائي", "أطفال",
    "مقاسات", "XL", "L", "M", "S", "موضة", "ستايل", "كلاسيك",
    "سبور", "كاجوال", "ماركة", "تقليد", "أصلي", "جديد", "مستعمل",
    "تخفيض", "عرض", "تنزيلات", "أزياء", "لبس", "خزانة", "أقمشة"
  ],

  makeUp: [
    "مكياج", "تجميل", "عطر", "عطور", "كريم", "مرطب", "فاونديشن",
    "بودرة", "ماسكارا", "أحمر شفاه", "روج", "آيلاينر", "كحل",
    "ظلال", "بلاشر", "كونسيلر", "هايلايتر", "برايمر", "سيروم",
    "عناية", "بشرة", "شعر", "صبغة", "شامبو", "بلسم", "زيت",
    "لوشن", "معطر", "نسائي", "رجالي", "ماركات", "أصلي",
    "تقليد", "فرنسي", "إيطالي", "طبي", "عضوي", "طبيعي",
    "تجميل وجه", "تجميل شعر", "صالون", "سبا", "عناية شخصية",
    "مستحضرات", "مكياج احترافي", "مكياج عروس", "تنظيف بشرة"
  ],

  resturants: [
    "مطعم", "مطاعم", "أكل", "مأكولات", "وجبات", "شاورما", "بيتزا",
    "برغر", "مشاوي", "فلافل", "كباب", "دجاج", "سمك", "بحري",
    "شرقي", "غربي", "سوري", "لبناني", "تركي", "إيطالي", "صيني",
    "هندي", "مندي", "بروستد", "سريع", "شعبي", "فاخر", "توصيل",
    "سفري", "داين إن", "قائمة", "منيو", "وجبة", "فطور", "غداء",
    "عشاء", "حلويات", "مشروبات", "قهوة", "عصير", "كافيه",
    "مخبز", "مطعم عائلي", "حجز", "خصم", "عرض", "تقييم"
  ],

  jobs: [
    "وظيفة", "وظائف", "شغل", "عمل", "دوام", "جزئي", "كامل",
    "مطلوب", "فرصة", "توظيف", "شركة", "مكتب", "عن بعد",
    "مبرمج", "مصمم", "محاسب", "مدخل بيانات", "سكرتارية",
    "مهندس", "فني", "سائق", "مندوب", "مبيعات", "تسويق",
    "إدارة", "موارد بشرية", "IT", "دعم فني", "خدمة عملاء",
    "مدرس", "معلم", "مدرب", "طبيب", "ممرض", "صيدلي",
    "راتب", "أجر", "خبرة", "بدون خبرة", "سيرة ذاتية",
    "CV", "مقابلة", "تدريب", "متدرب", "عقد", "دوام مرن"
  ],

  electric: [
    "كهرباء", "أجهزة", "الكترونيات", "غسالة", "براد", "ثلاجة",
    "فريزر", "مكيف", "سخان", "فرن", "ميكروويف", "خلاط",
    "غلاية", "مروحة", "تلفزيون", "شاشة", "LED", "Smart TV",
    "LG", "Samsung", "Sony", "Panasonic", "Toshiba", "Bosch",
    "أوتوماتيك", "نصف أوتوماتيك", "تصليح", "صيانة",
    "قطع", "قطع غيار", "كهربائي", "منزلية", "صناعية",
    "طاقة", "فولت", "أمبير", "أسلاك", "مفاتيح", "قواطع",
    "لوحة كهرباء", "UPS", "بطارية", "إنفرتر", "مولد"
  ],

  fornture: [
    "أثاث", "فرش", "كنبة", "صوفا", "زاوية", "طاولة", "طاولات",
    "كرسي", "كراسي", "سرير", "خزانة", "دولاب", "مكتبة",
    "تسريحة", "مطبخ", "غرفة نوم", "غرفة جلوس", "سفرة",
    "خشب", "معدن", "زجاج", "حديث", "كلاسيك", "مودرن",
    "تفصيل", "جاهز", "منزلي", "مكتب", "مفروشات",
    "مرتبة", "فرشة", "ستارة", "سجاد", "موكيت",
    "إكسسوارات", "ديكور", "رفوف", "وحدة تلفاز",
    "تصميم", "أثاث مستعمل", "أثاث جديد", "تجديد"
  ],
};

/* =========================
   الفئات (كما هي)
   ========================= */
const CATEGORIES = [
  { key: "allProduts", image: images.allProduts },
  { key: "carMoto", image: images.carMoto },
  { key: "pcAndPhone", image: images.pcAndPhone },
  { key: "tools", image: images.tools },
  { key: "clothes", image: images.clothes },
  { key: "makeUp", image: images.makeUp },
  { key: "resturants", image: images.resturants },
  { key: "jobs", image: images.jobs },
  { key: "electric", image: images.electric },
  { key: "fornture", image: images.fornture },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("allProduts");
  const [prodcutId ,setProdcutId] = useState("");

  const {getProductDetails} = useGetProducts();
  const {products} = useFetchProducts();

  const onPress = async (prodcutId:any) => {
    await getProductDetails(prodcutId);
    router.push("/product-details");
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "allProduts") return PRODUCTS;

    const keywords = CATEGORY_KEYWORDS[selectedCategory] || [];

    return PRODUCTS.filter((product) =>
      keywords.some((word) =>
        product.title.toLowerCase().includes(word.toLowerCase())
      )
    );
  }, [selectedCategory]);

  return (
    <SafeAreaView style={homeStyles.container}>
      <Serach />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={homeStyles.sectionBar}>
        {CATEGORIES.map((item) =>  (
          <SectionsBar
            key={item.key}
            image={item.image}
            onPress={() => setSelectedCategory(item.key)}
          />
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={true}>
        <ThemedView style={homeStyles.grid}>
          {products?.map((item) =>
            item.imageList.length > 0 ? (
              <Template
                key={item.productId}
                onPress={()=>onPress(item.productId)}
                price={item.price}
                prodcutName={item.productName}
                provinceName={item.province.provinceName}
                imageUrl={item.imageList[0].imageUrl}
              />
            ) : null
          )}

        </ThemedView>
      </ScrollView>
      <FloatingButton />
    </SafeAreaView>
  );
}
