import re
import json

replacements = [
    # News
    (r"titleEn: 'Government Should Set Healthcare Service Fees: Toshima Karki',", "titleEn: 'Government Should Set Healthcare Service Fees: Toshima Karki',"),
    (r"titleNp: 'सरकारले स्वास्थ्य सेवा शुल्क तोक्न जरुरी: तोसिमा कार्की',", "titleNp: 'सरकारले स्वास्थ्य सेवा शुल्क तोक्न जरुरी: तोसिमा कार्की',"),

    (r"titleEn: 'Government Should Regulate Healthcare Costs: Karki',", "titleEn: 'Healthcare Fee Regulation Discussion',"),
    (r"titleNp: 'स्वास्थ्य सेवा शुल्क नियमन आवश्यक: तोसिमा कार्की',", "titleNp: 'स्वास्थ्य सेवा शुल्क नियमन सम्बन्धी छलफल',"),

    (r"titleEn: 'Toshima Karki Starts New Role as State Minister for Health',", "titleEn: 'Dr. Toshima Karki Begins Her Test as Health State Minister',"),
    (r"titleNp: 'अरुलाई प्रश्न सोध्न माहिर ‘डा.तोसिमा’ को अब सुरु भयो परीक्षा',", "titleNp: 'अरुलाई प्रश्न सोध्न माहिर ‘डा. तोसिमा’ को अब सुरु भयो परीक्षा',"),

    (r"titleEn: 'I Must Get the Health Ministry Based on Expertise: Dr. Toshima Karki',", "titleEn: 'Based on Expertise, I Should Lead the Health Ministry',"),
    (r"titleNp: 'विज्ञताका हिसाबले स्वास्थ्य मन्त्रालय मैले नै पाउनुपर्छ: डा. तोसिमा कार्की',", "titleNp: 'विज्ञताका हिसाबले स्वास्थ्य मन्त्रालय मैले नै पाउनुपर्छ: डा. तोसिमा कार्की',"),

    (r"titleEn: 'Attempts Were Made to Stall Health Insurance: Toshima Karki',", "titleEn: 'Attempts Were Made to Stall Health Insurance: Toshima Karki',"),
    (r"titleNp: 'स्वास्थ्य बीमा रोक्ने प्रयासहरू गरिए: तोसिमा कार्की',", "titleNp: 'स्वास्थ्य बीमा रोक्न विभिन्न प्रयास भए: तोसिमा कार्की',"),

    (r"titleEn: 'Health Examination of Meter-Interest Victims by MP Toshima Karki',", "titleEn: 'Health Examination Program for Meter-Interest Victims',"),
    (r"titleNp: 'मिटरब्याज पीडितहरूको स्वास्थ्य परीक्षण गर्दै सांसद तोसिमा कार्की',", "titleNp: 'मिटर ब्याज पीडितहरूको स्वास्थ्य परीक्षण कार्यक्रम',"),

    (r"titleEn: 'The Government Should Not Act Without Addressing Local Demands: MP Karki',", "titleEn: 'Government Should Address Local Demands Before Taking Action',"),
    (r"titleNp: 'स्थानीय माग सम्बोधन नगरी सरकारले काम गर्नु हुँदैन: सांसद कार्की',", "titleNp: 'स्थानीय माग सम्बोधन नगरी सरकारले अघि बढ्नु हुँदैन: डा. कार्की',"),

    (r"titleEn: 'School Education Bill Should Be Rewritten Rather Than Amended: MP Karki',", "titleEn: 'School Education Bill Should Be Rewritten Instead of Amended',"),
    (r"titleNp: 'विद्यालय शिक्षा विधेयक संशोधन होइन, पुनर्लेखन हुनुपर्छ: सांसद कार्की',", "titleNp: 'विद्यालय शिक्षा विधेयक संशोधन होइन पुनर्लेखन गर्नुपर्छ',"),

    (r"titleEn: 'Dr. Toshima Karki From RSP in Phase of Becoming Health State Minister',", "titleEn: 'Dr. Toshima Karki Moves Toward Becoming Health State Minister',"),
    (r"titleNp: 'रास्वपाबाट स्वास्थ्य राज्यमन्त्री बन्ने प्रक्रियामा डा. तोसिमा कार्की',", "titleNp: 'डा. तोसिमा कार्की स्वास्थ्य राज्यमन्त्री बन्ने प्रक्रियामा',"),

    (r"titleEn: 'MP Toshima Karki Demands Immediate National Trauma Policy',", "titleEn: 'MP Toshima Karki Demands Immediate National Trauma Policy',"),
    (r"titleNp: 'सांसद तोसिमा कार्कीद्वारा तत्काल राष्ट्रिय ट्रमा नीतिको माग',", "titleNp: 'सांसद तोसिमा कार्कीले तत्काल राष्ट्रिय ट्रमा नीति माग गरिन्',"),

    (r"titleEn: 'RSP MP Karki Declares Oli Government No Longer Legitimate',", "titleEn: 'RSP MP Karki Questions Government Legitimacy',"),
    (r"titleNp: 'ओली सरकारको वैधानिकता समाप्त भयो: सांसद तोसिमा कार्की',", "titleNp: 'रास्वपा सांसद कार्कीले सरकारको वैधानिकतामाथि प्रश्न उठाइन्',"),

    (r"titleEn: 'Toshima Karki Wins Lalitpur-3 With Overwhelming Majority',", "titleEn: 'Toshima Karki Wins Lalitpur-3 With Over 34,000 Vote Margin',"),
    (r"titleNp: 'ललितपुर-३ मा ३४,००० भन्दा बढी मतान्तरले तोसिमा कार्की विजयी',", "titleNp: 'तोसिमा कार्की ललितपुर–३ मा ३४ हजारभन्दा बढी मतान्तरले विजयी',"),

    (r"titleEn: 'Government Should Bring Nepal Hospital Operation Act Immediately: Dr. Karki',", "titleEn: 'Government Should Immediately Bring Nepal Hospital Operation Act',"),
    (r"titleNp: \"सरकारले तत्काल 'नेपाल अस्पताल सञ्चालन ऐन' ल्याउनुपर्छ : डा. कार्की\",", "titleNp: \"सरकारले तत्काल 'नेपाल अस्पताल सञ्चालन ऐन' ल्याउनुपर्छ: डा. कार्की\","),

    (r"titleEn: 'MP Retirement Age Limit Should Be Set: Dr. Karki',", "titleEn: 'MP Retirement Age Limit Should Be Set',"),
    (r"titleNp: 'सांसद अवकाशको उमेर हद तोक्नुपर्छ : डा. कार्की',", "titleNp: 'सांसद अवकाशको उमेर हद तोक्नुपर्छ: डा. कार्की',"),

    (r"titleEn: 'Toshima Karki Questions Health Secretary Appointment Decision',", "titleEn: 'Toshima Karki Questions Health Secretary Appointment Decision',"),
    (r"titleNp: 'सांसद तोसिमाको प्रश्न : पुरुष मन्त्रीले महिला सचिवसँग काम गर्नै नसक्ने हो \?',", "titleNp: 'सांसद तोसिमाको प्रश्न: पुरुष मन्त्रीले महिला सचिवसँग काम गर्नै नसक्ने हो?',"),

    (r"titleEn: 'Lawmaker Dr. Toshima Karki Wins Case Against Election Commission',", "titleEn: 'Lawmaker Dr. Toshima Karki Wins Case Against Election Commission',"),
    (r"titleNp: 'निर्वाचन आयोग विरुद्धको मुद्दामा डा. तोसिमा कार्की विजयी',", "titleNp: 'निर्वाचन आयोगविरुद्धको मुद्दामा सांसद डा. तोसिमा कार्की विजयी',"),

    (r"titleEn: 'Dr. Toshima Karki: Second Parliamentary Journey',", "titleEn: 'Dr. Toshima Karki’s Second Journey to Parliament',"),
    (r"titleNp: 'डा. तोसिमा कार्की : दोस्रोपटक संसद्को यात्रामा',", "titleNp: 'डा. तोसिमा कार्की: दोस्रोपटक संसद्को यात्रामा',"),

    # Parliament Speeches
    (r"titleEn: 'Budget Discussion on Health and Population Ministry',", "titleEn: 'Budget Discussion on Health and Population Ministry',"),
    (r"titleNp: 'राजश्व र व्ययको वार्षिक अनुमानमाथि छलफल',", "titleNp: 'स्वास्थ्य तथा जनसंख्या मन्त्रालयको बजेट छलफल',"),

    (r"titleEn: 'Urgent Public Importance Proposal Discussion',", "titleEn: 'Urgent Public Importance Proposal Discussion',"),
    (r"titleNp: 'जरुरी सार्वजनिक महत्वको प्रस्ताव',", "titleNp: 'जरुरी सार्वजनिक महत्वको प्रस्तावमाथि छलफल',"),

    (r"titleEn: 'Special Time Speech by Dr. Toshima Karki',", "titleEn: 'Special Time Speech by Dr. Toshima Karki',"),
    (r"titleNp: 'प्रतिनिधि सभा बैठक - विशेष समय \(२०७९ फागुन १०\)',", "titleNp: 'डा. तोसिमा कार्कीको विशेष समय सम्बोधन',"),

    (r"titleEn: 'Special Time Address by Dr. Toshima Karki',", "titleEn: 'Special Time Address – June 2024',"),
    (r"titleNp: 'प्रतिनिधि सभा बैठक - विशेष समय \(२०८१ असार १३\)',", "titleNp: 'विशेष समय सम्बोधन – २०८१ असार',"),

    (r"titleEn: 'Emergency Time Speech',", "titleEn: 'Emergency Time Speech',"),
    (r"titleNp: 'प्रतिनिधि सभा बैठक - आकस्मिक समय \(२०८१ फागुन २३\)',", "titleNp: 'आकस्मिक समय सम्बोधन',"),

    (r"titleEn: 'Discussion on Federal Civil Service Bill 2080',", "titleEn: 'Discussion on Federal Civil Service Bill 2080',"),
    (r"titleNp: 'संघीय निजामती सेवा विधेयक माथि छलफल',", "titleNp: 'संघीय निजामती सेवा विधेयक २०८० माथि छलफल',"),

    (r"titleEn: 'Discussion on Principles and Priorities of Appropriation Bill',", "titleEn: 'Discussion on Principles and Priorities of Appropriation Bill',"),
    (r"titleNp: 'विनियोजन विधेयकका सिद्धान्त र प्राथमिकतामाथि छलफल',", "titleNp: 'विनियोजन विधेयकका सिद्धान्त र प्राथमिकतामाथि छलफल',"),

    # Media / Video Coverage
    (r"titleEn: 'Nepali People Want to See Me as Health Minister: Dr. Toshima Karki',", "titleEn: 'Healthcare Vision Interview',"),
    (r"titleNp: 'मलाई नेपाली जनताले स्वास्थ्य मन्त्रीको रूपमा देख्न चाहेका छन्',", "titleNp: 'मलाई नेपाली जनताले स्वास्थ्य मन्त्रीको रूपमा देख्न चाहेका छन्',"),

    (r"titleEn: 'I Have Created a Blueprint for Health Sector Reform: Dr. Toshima Karki',", "titleEn: 'Health Sector Reform Blueprint Interview',"),
    (r"titleNp: 'स्वास्थ्य क्षेत्र सुधारको खाका बनाएको छु',", "titleNp: 'स्वास्थ्य क्षेत्र सुधारको खाका बनाएको छु',"),

    (r"titleEn: 'I Deserve the Health Ministry Based on Expertise: Dr. Toshima Karki',", "titleEn: 'Health Ministry Leadership Interview',"),
    (r"titleNp: 'विज्ञताका हिसाबले स्वास्थ्य मन्त्रालय मैले नै पाउनुपर्छ',", "titleNp: 'विज्ञताका हिसाबले स्वास्थ्य मन्त्रालय मैले नै पाउनुपर्छ',"),

    (r"titleEn: 'Toshima Karki Media Interviews & TV Coverage',", "titleEn: 'Toshima Karki Media Interviews Collection',"),
    (r"titleNp: 'तोसिमा कार्की मिडिया अन्तर्वार्ता र टीभी कभरेज',", "titleNp: 'तोसिमा कार्की मिडिया अन्तर्वार्ता संग्रह',"),

    (r"titleEn: 'Toshima Karki Health Sector Discussions & Debates',", "titleEn: 'Toshima Karki Health Sector Discussions',"),
    (r"titleNp: 'तोसिमा कार्की स्वास्थ्य क्षेत्र बहस र छलफल',", "titleNp: 'तोसिमा कार्की स्वास्थ्य क्षेत्र छलफल',"),

    (r"titleEn: 'Toshima Karki Parliament Speeches Video Collection',", "titleEn: 'Toshima Karki Parliament Speech Videos',"),
    (r"titleNp: 'तोसिमा कार्की संसद सम्बोधन भिडियो संग्रह',", "titleNp: 'तोसिमा कार्की संसद् भाषण भिडियोहरू',"),

    (r"titleEn: 'Hospital Visits and Healthcare Facility Assessment',", "titleEn: 'Hospital and Healthcare Visits',"),
    (r"titleNp: 'अस्पताल अनुगमन तथा स्वास्थ्य सेवा अनुसन्धान',", "titleNp: 'अस्पताल तथा स्वास्थ्य सेवा भ्रमणहरू',")
]

with open('seeder.js', 'r', encoding='utf-8') as f:
    content = f.read()

for old, new in replacements:
    content = re.sub(old, new, content)

with open('seeder.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done replacements.")
