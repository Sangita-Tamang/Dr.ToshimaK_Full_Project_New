const ParliamentActivity = require('../models/ParliamentActivity');
const connectDB = require('../config/db');

const firstTenureActivities = [
  {
    title: {
      en: 'Parliamentary Discussion on Healthcare Issues',
      ne: 'स्वास्थ्य मुद्दाहरूमा संसदीय छलफल'
    },
    description: {
      en: 'Participated in comprehensive parliamentary discussion addressing critical healthcare challenges facing Nepal, focusing on improving access to quality healthcare services and strengthening public health infrastructure across the nation.',
      ne: 'नेपालले सामना गरिरहेका महत्वपूर्ण स्वास्थ्य चुनौतीहरूलाई सम्बोधन गर्दै, गुणस्तरीय स्वास्थ्य सेवामा पहुँच सुधार्न र राष्ट्रभरि सार्वजनिक स्वास्थ्य पूर्वाधार सुदृढ गर्नमा केन्द्रित व्यापक संसदीय छलफलमा सहभागिता।'
    },
    category: {
      en: 'Health Policy',
      ne: 'स्वास्थ्य नीति'
    },
    tenure: 'first',
    date: new Date('2024-03-15'),
    year: 2024,
    image: '/assets/images/image1.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/18557',
    sourceType: 'video',
    featured: true,
    published: true
  },
  {
    title: {
      en: 'Public Health System Discussion',
      ne: 'सार्वजनिक स्वास्थ्य प्रणाली छलफल'
    },
    description: {
      en: 'Raised critical concerns about the state of public health systems in Nepal, emphasizing the need for improved healthcare infrastructure, adequate medical resources, and better healthcare delivery mechanisms to serve all citizens effectively.',
      ne: 'नेपालमा सार्वजनिक स्वास्थ्य प्रणालीको अवस्थाको बारेमा महत्वपूर्ण चिन्ताहरू उठाउँदै, सुधारिएको स्वास्थ्य पूर्वाधार, पर्याप्त चिकित्सा स्रोतहरू र सबै नागरिकहरूलाई प्रभावकारी रूपमा सेवा दिन राम्रो स्वास्थ्य सेवा प्रदान संयन्त्रको आवश्यकतामा जोड।'
    },
    category: {
      en: 'Healthcare',
      ne: 'स्वास्थ्य सेवा'
    },
    tenure: 'first',
    date: new Date('2024-02-20'),
    year: 2024,
    image: '/assets/images/image2.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/19224',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Raising Public Issues in Parliament',
      ne: 'संसदमा सार्वजनिक मुद्दाहरू उठाउँदै'
    },
    description: {
      en: 'Actively represented the voices and concerns of citizens from Lalitpur Constituency No. 3, bringing forward pressing community issues including infrastructure development, public services, and local governance matters that directly impact daily lives.',
      ne: 'ललितपुर निर्वाचन क्षेत्र नं. ३ का नागरिकहरूको आवाज र चिन्ताहरूको सक्रिय रूपमा प्रतिनिधित्व गर्दै, पूर्वाधार विकास, सार्वजनिक सेवाहरू र स्थानीय शासन मामिलाहरू सहित दैनिक जीवनमा प्रत्यक्ष प्रभाव पार्ने दबाबपूर्ण समुदाय मुद्दाहरू अगाडि ल्याउँदै।'
    },
    category: {
      en: 'Public Issues',
      ne: 'सार्वजनिक मुद्दाहरू'
    },
    tenure: 'first',
    date: new Date('2024-01-10'),
    year: 2024,
    image: '/assets/images/image3.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/19765',
    sourceType: 'video',
    featured: true,
    published: true
  },
  {
    title: {
      en: 'Health Sector Reform Discussion',
      ne: 'स्वास्थ्य क्षेत्र सुधार छलफल'
    },
    description: {
      en: 'Advocated for comprehensive health sector reforms including modernization of healthcare facilities, implementation of evidence-based health policies, increased budget allocation for health programs, and strengthening of primary healthcare services throughout Nepal.',
      ne: 'स्वास्थ्य सुविधाहरूको आधुनिकीकरण, प्रमाणमा आधारित स्वास्थ्य नीतिहरूको कार्यान्वयन, स्वास्थ्य कार्यक्रमहरूको लागि बजेट विनियोजन वृद्धि र नेपालभरि प्राथमिक स्वास्थ्य सेवाहरूको सुदृढीकरण सहित व्यापक स्वास्थ्य क्षेत्र सुधारको लागि वकालत।'
    },
    category: {
      en: 'Health Reform',
      ne: 'स्वास्थ्य सुधार'
    },
    tenure: 'first',
    date: new Date('2023-11-25'),
    year: 2023,
    image: '/assets/images/image4.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/21055',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Parliamentary Speech and Policy Discussion',
      ne: 'संसदीय भाषण र नीति छलफल'
    },
    description: {
      en: 'Delivered impactful parliamentary speech focusing on evidence-based policymaking, good governance practices, transparency in government operations, and the importance of citizen participation in democratic processes for national development.',
      ne: 'प्रमाणमा आधारित नीति निर्माण, सुशासन अभ्यासहरू, सरकारी सञ्चालनमा पारदर्शिता र राष्ट्रिय विकासको लागि लोकतान्त्रिक प्रक्रियामा नागरिक सहभागिताको महत्वमा केन्द्रित प्रभावकारी संसदीय भाषण प्रदान।'
    },
    category: {
      en: 'Parliamentary Debate',
      ne: 'संसदीय बहस'
    },
    tenure: 'first',
    date: new Date('2023-09-18'),
    year: 2023,
    image: '/assets/images/image5.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/14331',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Public Welfare Discussion',
      ne: 'सार्वजनिक कल्याण छलफल'
    },
    description: {
      en: 'Engaged in parliamentary discussion on critical public welfare issues including social security programs, poverty alleviation initiatives, education accessibility, employment generation, and improving quality of life for all Nepali citizens, especially vulnerable communities.',
      ne: 'सामाजिक सुरक्षा कार्यक्रमहरू, गरिबी न्यूनीकरण पहलहरू, शिक्षा पहुँच, रोजगारी सृजना र सबै नेपाली नागरिकहरू विशेष गरी कमजोर समुदायहरूको जीवनको गुणस्तर सुधार सहित महत्वपूर्ण सार्वजनिक कल्याण मुद्दाहरूमा संसदीय छलफलमा संलग्न।'
    },
    category: {
      en: 'Citizen Welfare',
      ne: 'नागरिक कल्याण'
    },
    tenure: 'first',
    date: new Date('2023-07-05'),
    year: 2023,
    image: '/assets/images/image6.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/18188',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Healthcare Related Parliamentary Questions',
      ne: 'स्वास्थ्य सम्बन्धी संसदीय प्रश्नहरू'
    },
    description: {
      en: 'Raised crucial parliamentary questions addressing healthcare governance, medical supply management, hospital administration, healthcare workforce challenges, and the implementation status of national health programs to ensure accountability and effective service delivery.',
      ne: 'स्वास्थ्य शासन, चिकित्सा आपूर्ति व्यवस्थापन, अस्पताल प्रशासन, स्वास्थ्य कार्यबल चुनौतीहरू र जवाफदेहिता र प्रभावकारी सेवा प्रदान सुनिश्चित गर्न राष्ट्रिय स्वास्थ्य कार्यक्रमहरूको कार्यान्वयन स्थितिलाई सम्बोधन गर्दै महत्वपूर्ण संसदीय प्रश्नहरू उठाए।'
    },
    category: {
      en: 'Health Governance',
      ne: 'स्वास्थ्य शासन'
    },
    tenure: 'first',
    date: new Date('2023-05-12'),
    year: 2023,
    image: '/assets/images/image7.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/21282',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Education and Development Policy Discussion',
      ne: 'शिक्षा र विकास नीति छलफल'
    },
    description: {
      en: 'Participated in policy discussion on improving education quality, expanding access to education for all, implementing modern teaching methods, and ensuring education infrastructure development to build a knowledge-based society and skilled workforce.',
      ne: 'शिक्षाको गुणस्तर सुधार गर्न, सबैका लागि शिक्षामा पहुँच विस्तार गर्न, आधुनिक शिक्षण विधिहरू लागू गर्न र ज्ञानमा आधारित समाज र दक्ष कार्यबल निर्माण गर्न शिक्षा पूर्वाधार विकास सुनिश्चित गर्ने नीति छलफलमा सहभागिता।'
    },
    category: {
      en: 'Education Policy',
      ne: 'शिक्षा नीति'
    },
    tenure: 'first',
    date: new Date('2023-04-20'),
    year: 2023,
    image: '/assets/images/image8.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/20145',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Infrastructure Development Discussion',
      ne: 'पूर्वाधार विकास छलफल'
    },
    description: {
      en: 'Raised critical issues about infrastructure development in Lalitpur constituency including road construction, water supply, electricity access, public facilities, and urban planning to improve living standards and support economic growth.',
      ne: 'ललितपुर निर्वाचन क्षेत्रमा सडक निर्माण, खानेपानी आपूर्ति, बिजुली पहुँच, सार्वजनिक सुविधाहरू र शहरी योजना सहित पूर्वाधार विकासको बारेमा महत्वपूर्ण मुद्दाहरू उठाउँदै जीवन स्तर सुधार र आर्थिक वृद्धिलाई समर्थन गर्न।'
    },
    category: {
      en: 'Infrastructure',
      ne: 'पूर्वाधार'
    },
    tenure: 'first',
    date: new Date('2023-03-10'),
    year: 2023,
    image: '/assets/images/image9.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/19876',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Women and Child Welfare Discussion',
      ne: 'महिला र बाल कल्याण छलफल'
    },
    description: {
      en: 'Advocated for women and child welfare programs including maternal health services, child nutrition programs, education for girls, prevention of child labor, and empowerment initiatives to ensure equal opportunities and protection of vulnerable groups.',
      ne: 'मातृ स्वास्थ्य सेवाहरू, बाल पोषण कार्यक्रमहरू, बालिकाहरूको लागि शिक्षा, बाल श्रम रोकथाम र समान अवसर र कमजोर समूहहरूको सुरक्षा सुनिश्चित गर्न सशक्तीकरण पहलहरू सहित महिला र बाल कल्याण कार्यक्रमहरूको लागि वकालत।'
    },
    category: {
      en: 'Social Welfare',
      ne: 'सामाजिक कल्याण'
    },
    tenure: 'first',
    date: new Date('2023-02-15'),
    year: 2023,
    image: '/assets/images/image10.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/18934',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Committee Work on Health Affairs',
      ne: 'स्वास्थ्य मामिलामा समिति कार्य'
    },
    description: {
      en: 'Active participation in parliamentary committee work focusing on health affairs, reviewing health policies, examining budget allocations, monitoring program implementation, and ensuring accountability in healthcare sector for better public health outcomes.',
      ne: 'स्वास्थ्य मामिलामा केन्द्रित संसदीय समिति कार्यमा सक्रिय सहभागिता, स्वास्थ्य नीतिहरूको समीक्षा, बजेट विनियोजन परीक्षण, कार्यक्रम कार्यान्वयन अनुगमन र राम्रो सार्वजनिक स्वास्थ्य परिणामहरूको लागि स्वास्थ्य क्षेत्रमा जवाफदेहिता सुनिश्चित गर्ने।'
    },
    category: {
      en: 'Committee Work',
      ne: 'समिति कार्य'
    },
    tenure: 'first',
    date: new Date('2023-01-18'),
    year: 2023,
    image: '/assets/images/image11.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/17654',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Good Governance and Transparency Discussion',
      ne: 'सुशासन र पारदर्शिता छलफल'
    },
    description: {
      en: 'Raised important questions about good governance, transparency in government operations, accountability mechanisms, anti-corruption measures, and citizen participation in decision-making processes to strengthen democratic institutions and public trust.',
      ne: 'सुशासन, सरकारी सञ्चालनमा पारदर्शिता, जवाफदेहिता संयन्त्र, भ्रष्टाचार विरोधी उपायहरू र लोकतान्त्रिक संस्थाहरू र सार्वजनिक विश्वास सुदृढ गर्न निर्णय प्रक्रियामा नागरिक सहभागिताको बारेमा महत्वपूर्ण प्रश्नहरू उठाए।'
    },
    category: {
      en: 'Good Governance',
      ne: 'सुशासन'
    },
    tenure: 'first',
    date: new Date('2022-12-05'),
    year: 2022,
    image: '/assets/images/image12.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/16782',
    sourceType: 'video',
    featured: false,
    published: true
  }
];

const secondTenureActivities = [
  {
    title: {
      en: 'National Trauma Policy Advocacy',
      ne: 'राष्ट्रिय आघात नीति वकालत'
    },
    description: {
      en: 'Leading advocacy efforts for the development and implementation of a comprehensive National Trauma Policy to strengthen emergency healthcare services, improve trauma care infrastructure, and save lives through better emergency response systems across Nepal.',
      ne: 'आपतकालीन स्वास्थ्य सेवाहरू सुदृढ गर्न, आघात हेरचाह पूर्वाधार सुधार गर्न र नेपालभरि राम्रो आपतकालीन प्रतिक्रिया प्रणाली मार्फत जीवन बचाउन व्यापक राष्ट्रिय आघात नीतिको विकास र कार्यान्वयनको लागि अग्रणी वकालत प्रयासहरू।'
    },
    category: {
      en: 'Healthcare Reform',
      ne: 'स्वास्थ्य सुधार'
    },
    tenure: 'second',
    date: new Date('2026-03-15'),
    year: 2026,
    image: '/assets/images/image13.png',
    sourceUrl: 'https://english.ratopati.com/story/63620',
    sourceType: 'news',
    featured: true,
    published: true
  },
  {
    title: {
      en: 'Continuing Representation of Lalitpur Constituency No. 3',
      ne: 'ललितपुर निर्वाचन क्षेत्र नं. ३ को निरन्तर प्रतिनिधित्व'
    },
    description: {
      en: 'Re-elected as Member of Parliament representing Lalitpur Constituency No. 3 with strong public mandate of 43,906 votes, demonstrating continued trust from citizens and commitment to serve the constituency with dedication, transparency, and people-centered governance.',
      ne: '43,906 मतको बलियो जनादेशका साथ ललितपुर निर्वाचन क्षेत्र नं. ३ को प्रतिनिधित्व गर्ने सांसदको रूपमा पुन: निर्वाचित, नागरिकहरूबाट निरन्तर विश्वास र समर्पण, पारदर्शिता र जन केन्द्रित शासनका साथ निर्वाचन क्षेत्रको सेवा गर्ने प्रतिबद्धता प्रदर्शन।'
    },
    category: {
      en: 'Parliamentary Representation',
      ne: 'संसदीय प्रतिनिधित्व'
    },
    tenure: 'second',
    date: new Date('2025-11-20'),
    year: 2025,
    image: '/assets/images/image14.png',
    sourceUrl: 'https://english.nepalnews.com/s/politics/toshima-karki-wins-lalitpur-3-with-43906-votes/',
    sourceType: 'news',
    featured: true,
    published: true
  },
  {
    title: {
      en: 'Healthcare Budget Discussion for Second Tenure',
      ne: 'दोस्रो कार्यकालको लागि स्वास्थ्य बजेट छलफल'
    },
    description: {
      en: 'Advocated for increased healthcare budget allocation in the second tenure, focusing on expanding healthcare access, improving medical facilities, strengthening disease prevention programs, and ensuring sustainable health infrastructure development.',
      ne: 'दोस्रो कार्यकालमा स्वास्थ्य बजेट विनियोजन बढाउनको लागि वकालत, स्वास्थ्य पहुँच विस्तार, चिकित्सा सुविधाहरू सुधार, रोग रोकथाम कार्यक्रमहरू सुदृढ गर्न र दिगो स्वास्थ्य पूर्वाधार विकास सुनिश्चित गर्नमा केन्द्रित।'
    },
    category: {
      en: 'Health Policy',
      ne: 'स्वास्थ्य नीति'
    },
    tenure: 'second',
    date: new Date('2026-01-10'),
    year: 2026,
    image: '/assets/images/image15.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/22100',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Mental Health Awareness Initiative',
      ne: 'मानसिक स्वास्थ्य जागरूकता पहल'
    },
    description: {
      en: 'Launched parliamentary initiative to raise awareness about mental health issues, promote mental health services, reduce stigma, and establish better support systems for mental health patients across Nepal.',
      ne: 'मानसिक स्वास्थ्य मुद्दाहरूको बारेमा जागरूकता बढाउन, मानसिक स्वास्थ्य सेवाहरू प्रवर्द्धन गर्न, कलंक कम गर्न र नेपालभरि मानसिक स्वास्थ्य बिरामीहरूको लागि राम्रो समर्थन प्रणाली स्थापना गर्न संसदीय पहल सुरु गरियो।'
    },
    category: {
      en: 'Healthcare',
      ne: 'स्वास्थ्य सेवा'
    },
    tenure: 'second',
    date: new Date('2025-12-15'),
    year: 2025,
    image: '/assets/images/image16.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/21890',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Digital Health Infrastructure Discussion',
      ne: 'डिजिटल स्वास्थ्य पूर्वाधार छलफल'
    },
    description: {
      en: 'Raised issues about implementing digital health infrastructure including electronic health records, telemedicine services, health information systems, and digital healthcare delivery to modernize Nepal healthcare system.',
      ne: 'नेपाल स्वास्थ्य प्रणालीलाई आधुनिकीकरण गर्न इलेक्ट्रोनिक स्वास्थ्य रेकर्डहरू, टेलिमेडिसिन सेवाहरू, स्वास्थ्य सूचना प्रणालीहरू र डिजिटल स्वास्थ्य सेवा प्रदान सहित डिजिटल स्वास्थ्य पूर्वाधार कार्यान्वयन गर्ने बारेमा मुद्दाहरू उठाए।'
    },
    category: {
      en: 'Health Innovation',
      ne: 'स्वास्थ्य नवाचार'
    },
    tenure: 'second',
    date: new Date('2026-02-05'),
    year: 2026,
    image: '/assets/images/image17.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/22350',
    sourceType: 'video',
    featured: false,
    published: true
  },
  {
    title: {
      en: 'Youth Employment and Development Program',
      ne: 'युवा रोजगारी र विकास कार्यक्रम'
    },
    description: {
      en: 'Advocated for youth employment programs, skill development initiatives, entrepreneurship support, and creating opportunities for young people to contribute to national development and economic growth.',
      ne: 'युवा रोजगारी कार्यक्रमहरू, सीप विकास पहलहरू, उद्यमशीलता समर्थन र युवाहरूलाई राष्ट्रिय विकास र आर्थिक वृद्धिमा योगदान गर्ने अवसरहरू सिर्जना गर्नको लागि वकालत।'
    },
    category: {
      en: 'Youth Development',
      ne: 'युवा विकास'
    },
    tenure: 'second',
    date: new Date('2026-04-20'),
    year: 2026,
    image: '/assets/images/image18.png',
    sourceUrl: 'https://hr.parliament.gov.np/en/video/22580',
    sourceType: 'video',
    featured: false,
    published: true
  }
];

const seedParliamentActivities = async () => {
  try {
    await connectDB();

    // Clear existing activities
    await ParliamentActivity.deleteMany({});
    console.log('Cleared existing parliament activities');

    // Insert first tenure activities
    const firstTenure = await ParliamentActivity.insertMany(firstTenureActivities);
    console.log(`✓ Inserted ${firstTenure.length} First Tenure activities`);

    // Insert second tenure activities
    const secondTenure = await ParliamentActivity.insertMany(secondTenureActivities);
    console.log(`✓ Inserted ${secondTenure.length} Second Tenure activities`);

    console.log('\n✅ Parliament Activities seeded successfully!');
    console.log(`Total: ${firstTenure.length + secondTenure.length} activities`);
    console.log(`First Tenure: ${firstTenure.length}`);
    console.log(`Second Tenure: ${secondTenure.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding parliament activities:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedParliamentActivities();
}

module.exports = seedParliamentActivities;
