const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

// Load models
const User = require('./models/User');
const Home = require('./models/Home');
const About = require('./models/About');
const Ministry = require('./models/Ministry');
const Parliament = require('./models/Parliament');
const News = require('./models/News');
const Blog = require('./models/Blog');
const Media = require('./models/Media');
const Gallery = require('./models/Gallery');
const Settings = require('./models/Settings');

// Connect to DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dr_toshima_karki');

// Seed data
const importData = async () => {
  try {
    // Clear current database
    await User.deleteMany();
    await Home.deleteMany();
    await About.deleteMany();
    await Ministry.deleteMany();
    await Parliament.deleteMany();
    await News.deleteMany();
    await Blog.deleteMany();
    await Media.deleteMany();
    await Gallery.deleteMany();
    await Settings.deleteMany();

    console.log('Database cleared...');

    // Create default Admin
    await User.create({
      name: 'Office of Dr. Toshima Karki',
      email: 'admin@toshimakarki.gov.np',
      password: 'password123',
      role: 'admin'
    });
    console.log('Admin user created...');

    // Create default settings
    await Settings.create({});
    console.log('Settings created...');

    // Create Home settings
    await Home.create({
      stats: {
        livesImpacted: '1M+',
        patientsSupported: '500K+',
        healthPolicies: '20+',
        yearsOfService: '15+',
        reachImpact: 'Nationwide'
      }
    });
    console.log('Home settings created...');

    // Create About settings
    await About.create({
      atAGlance: [
        {
          titleEn: 'Medical Professional',
          titleNp: 'चिकित्सा पेशेवर',
          descriptionEn: 'MD and dedicated to improve healthcare for all.',
          descriptionNp: 'सबैका लागि स्वास्थ्य सेवा सुधार गर्न समर्पित चिकित्सक।',
          icon: 'stethoscope'
        },
        {
          titleEn: 'Community Advocate',
          titleNp: 'सामुदायिक अधिवक्ता',
          descriptionEn: 'Worked in rural areas, leading health awareness programs.',
          descriptionNp: 'ग्रामीण क्षेत्रमा काम गर्दै, स्वास्थ्य सचेतना कार्यक्रमको नेतृत्व।',
          icon: 'users'
        },
        {
          titleEn: 'Member of Parliament',
          titleNp: 'संसद् सदस्य',
          descriptionEn: 'Elected to represent people\'s voice and drive meaningful change.',
          descriptionNp: 'जनताको आवाजको प्रतिनिधित्व गर्न र अर्थपूर्ण परिवर्तन ल्याउन निर्वाचित।',
          icon: 'landmark'
        }
      ],
      whatDrivesMe: [
        { titleEn: 'People First', titleNp: 'जनता पहिलो', descriptionEn: 'Every decision I make is guided by the needs and hopes of the people.', descriptionNp: 'मैले गर्ने प्रत्येक निर्णय जनताको आवश्यकता र आशाबाट निर्देशित हुन्छ।' },
        { titleEn: 'Healthcare for All', titleNp: 'सबैका लागि स्वास्थ्य सेवा', descriptionEn: 'Working towards accessible, affordable and quality healthcare for every Nepali.', descriptionNp: 'हरेक नेपालीका लागि पहुँचयोग्य, किफायती र गुणस्तरीय स्वास्थ्य सेवाका लागि काम गर्दै।' }
      ],
      impactStats: {
        programs: '500+',
        communities: '250+',
        initiatives: '50+',
        yearsOfService: '10+'
      }
    });
    console.log('About settings created...');

    // Create Ministry settings
    await Ministry.create({
      contributions: [
        {
          titleEn: 'Health Insurance Reform',
          titleNp: 'स्वास्थ्य बीमा सुधार',
          descriptionEn: 'Expanding national health insurance coverage to ensure financial protection and universal healthcare access for all citizens.',
          descriptionNp: 'सबै नागरिकका लागि वित्तीय सुरक्षा र विश्वव्यापी स्वास्थ्य सेवा पहुँच सुनिश्चित गर्न राष्ट्रिय स्वास्थ्य बीमाको दायरा विस्तार।',
          image: 'dr-tk/image2'
        },
        {
          titleEn: 'Healthcare Affordability & Access',
          titleNp: 'स्वास्थ्य सेवाको पहुँच र किफायतता',
          descriptionEn: 'Making healthcare affordable by reducing treatment costs and improving access to essential medical services.',
          descriptionNp: 'उपचार खर्च घटाएर र आवश्यक चिकित्सा सेवाहरूमा पहुँच सुधार गरेर स्वास्थ्य सेवालाई किफायती बनाउने।',
          image: 'dr-tk/image1'
        }
      ]
    });
    console.log('Ministry settings created...');

    // Create Parliament settings with the Speech list
    await Parliament.create({
      roles: [
        { titleEn: 'Health Policy Advocacy', titleNp: 'स्वास्थ्य नीति वकालत', descriptionEn: 'Actively contributed to discussions on national health insurance reform.', descriptionNp: 'राष्ट्रिय स्वास्थ्य बीमा सुधार सम्बन्धी छलफलमा सक्रिय योगदान।' },
        { titleEn: 'Legislative Participation', titleNp: 'विधायकी सहभागिता', descriptionEn: 'Engaged in drafting and supporting laws related to public health and social welfare.', descriptionNp: 'जनस्वास्थ्य र सामाजिक कल्याण सम्बन्धी कानूनको तर्जुमा र समर्थनमा संलग्न।' }
      ],
      speeches: [
        {
          titleEn: 'Budget Discussion on Health and Population Ministry',
          titleNp: 'स्वास्थ्य तथा जनसंख्या मन्त्रालयको बजेट छलफल',
          date: new Date('2024-06-04'),
          descriptionEn: 'Dr. Toshima Karki participated in parliamentary discussion related to annual budget allocation, government programs, and health sector priorities.',
          descriptionNp: 'स्वास्थ्य बजेट विनियोजन र जनस्वास्थ्यका कार्यक्रमहरू सम्बन्धी छलफलमा सहभागिता।',
          videoUrl: 'https://hr.parliament.gov.np/en/video/18557',
          imageUrl: 'dr-tk/image11'
        },
        {
          titleEn: 'Urgent Public Importance Proposal Discussion',
          titleNp: 'जरुरी सार्वजनिक महत्वको प्रस्तावमाथि छलफल',
          date: new Date('2024-05-15'),
          descriptionEn: 'Speech related to urgent national issues raised in the House of Representatives.',
          descriptionNp: 'जनताका तत्कालका समस्याहरूबारे प्रतिनिधि सभामा दर्ता गरिएको जरुरी प्रस्तावमाथि भनाइ।',
          videoUrl: 'https://hr.parliament.gov.np/en/video/19765',
          imageUrl: 'dr-tk/image12'
        },
        {
          titleEn: 'Special Time Speech by Dr. Toshima Karki',
          titleNp: 'डा. तोसिमा कार्कीको विशेष समय सम्बोधन',
          date: new Date('2023-02-22'),
          descriptionEn: 'Parliamentary statement delivered by Dr. Toshima Karki during Special Time session.',
          descriptionNp: 'संसदको विशेष समयमा जनसरोकारका विभिन्न विषयहरूमा राखिएको तथ्यपरक विचार।',
          videoUrl: 'https://hr.parliament.gov.np/en/video/13949',
          imageUrl: 'dr-tk/image13'
        },
        {
          titleEn: 'Special Time Address – June 2024',
          titleNp: 'विशेष समय सम्बोधन – २०८१ असार',
          date: new Date('2024-06-27'),
          descriptionEn: 'Speech addressing national issues and public concerns.',
          descriptionNp: 'संसदको विशेष समयमा समसामयिक राष्ट्रिय मुद्दाहरूमा सरकारको ध्यानाकर्षण।',
          videoUrl: 'https://hr.parliament.gov.np/en/video/19224',
          imageUrl: 'dr-tk/image14'
        },
        {
          titleEn: 'Emergency Time Speech',
          titleNp: 'आकस्मिक समय सम्बोधन',
          date: new Date('2025-02-07'),
          descriptionEn: 'Dr. Toshima Karki participated in emergency parliamentary discussion.',
          descriptionNp: 'तत्काल आइपरेका संकट र जनसरोकारका विषयमा आकस्मिक समयमा राखेको भनाइ।',
          videoUrl: 'https://hr.parliament.gov.np/en/video/21426',
          imageUrl: 'dr-tk/image15'
        },
        {
          titleEn: 'Discussion on Federal Civil Service Bill 2080',
          titleNp: 'संघीय निजामती सेवा विधेयक २०८० माथि छलफल',
          date: new Date('2024-04-10'),
          descriptionEn: 'Parliamentary discussion regarding civil service reform and administrative efficiency.',
          descriptionNp: 'निजामती सेवालाई व्यावसायिक र जनमुखी बनाउन ऐन संशोधन सम्बन्धी छलफल।',
          videoUrl: 'https://hr.parliament.gov.np/en/video/18188',
          imageUrl: 'dr-tk/image16'
        },
        {
          titleEn: 'Discussion on Principles and Priorities of Appropriation Bill',
          titleNp: 'विनियोजन विधेयकका सिद्धान्त र प्राथमिकतामाथि छलफल',
          date: new Date('2025-03-01'),
          descriptionEn: 'Discussion related to government budget priorities and national development policies.',
          descriptionNp: 'सरकारी बजेटका प्राथमिकताहरू र विकास नीतिको मार्गचित्र बारे समीक्षा र सुझाव।',
          videoUrl: 'https://hr.parliament.gov.np/en/video/22715',
          imageUrl: 'dr-tk/image17'
        }
      ]
    });
    console.log('Parliament settings created...');

    // Seed News Articles
    await News.create([
      {
        titleEn: 'Government Should Set Healthcare Service Fees: Toshima Karki',
        titleNp: 'सरकारले स्वास्थ्य सेवा शुल्क तोक्न जरुरी: तोसिमा कार्की',
        category: 'Healthcare Policy',
        publisherEn: 'OnlineKhabar',
        publisherNp: 'अनलाइनखबर',
        contentEn: 'Dr. Toshima Karki raised concerns about expensive healthcare services and suggested that the government should regulate healthcare service charges in both government and private hospitals.',
        contentNp: 'सरकारले सरकारी तथा निजी दुवै अस्पतालमा स्वास्थ्य सेवा शुल्क नियमन गर्नुपर्नेमा डा. तोसिमा कार्कीको जोड।',
        link: 'https://www.onlinekhabar.com/2024/06/1490373/government-should-set-healthcare-fees-tosima-karki',
        image: 'dr-tk/image1',
        publishedDate: new Date('2024-06-15')
      },
      {
        titleEn: 'Healthcare Fee Regulation Discussion',
        titleNp: 'स्वास्थ्य सेवा शुल्क नियमन सम्बन्धी छलफल',
        category: 'Healthcare Policy',
        publisherEn: 'Nagarik News',
        publisherNp: 'नागरिक न्यूज',
        contentEn: "News coverage about Dr. Toshima Karki's views on regulating healthcare costs and ensuring affordable healthcare access for citizens.",
        contentNp: 'नागरिकहरूका लागि किफायती स्वास्थ्य सेवा पहुँच सुनिश्चित गर्न र स्वास्थ्य सेवा शुल्क नियमन गर्नुपर्ने डा. तोसिमा कार्कीको धारणा।',
        link: 'https://nagariknews.nagariknetwork.com/politics/1437739-1717496669.html',
        image: 'dr-tk/image2',
        publishedDate: new Date('2024-06-03')
      },
      {
        titleEn: 'Dr. Toshima Karki Begins Her Test as Health State Minister',
        titleNp: 'अरुलाई प्रश्न सोध्न माहिर ‘डा. तोसिमा’ को अब सुरु भयो परीक्षा',
        category: 'Ministry Activities',
        publisherEn: 'Nagarik News',
        publisherNp: 'नागरिक न्यूज',
        contentEn: 'Coverage after Dr. Toshima Karki received responsibility as State Minister for Health and Population, focusing on expectations and challenges.',
        contentNp: 'स्वास्थ्य राज्यमन्त्रीका रूपमा डा. तोसिमा कार्कीले जिम्मेवारी सम्हालेपछि थपिएका चुनौती र अपेक्षाहरूको विश्लेषण।',
        link: 'https://nagariknews.nagariknetwork.com/amp/health/1056251-1673949836.html',
        image: 'dr-tk/image3',
        publishedDate: new Date('2023-01-18')
      },
      {
        titleEn: 'Based on Expertise, I Should Lead the Health Ministry',
        titleNp: 'विज्ञताका हिसाबले स्वास्थ्य मन्त्रालय मैले नै पाउनुपर्छ: डा. तोसिमा कार्की',
        category: 'Ministry Activities',
        publisherEn: 'Nepal Samaya',
        publisherNp: 'नेपाल समय',
        contentEn: 'Interview discussing her healthcare expertise, ministry responsibility, and health sector priorities.',
        contentNp: 'डा. तोसिमा कार्कीको स्वास्थ्य क्षेत्रको विज्ञता, मन्त्रालयको जिम्मेवारी र प्राथमिकताबारे अन्तर्वार्ता।',
        link: 'https://nepalsamaya.com/detail/95913',
        image: 'dr-tk/image4',
        publishedDate: new Date('2022-12-25')
      },
      {
        titleEn: 'Attempts Were Made to Stall Health Insurance: Toshima Karki',
        titleNp: 'स्वास्थ्य बीमा रोक्न विभिन्न प्रयास भए: तोसिमा कार्की',
        category: 'Healthcare Policy',
        publisherEn: 'Headline Nepal',
        publisherNp: 'हेडलाइन नेपाल',
        contentEn: "Dr. Toshima Karki discussed concerns regarding Nepal's health insurance system and challenges affecting implementation.",
        contentNp: 'नेपालको स्वास्थ्य बीमा प्रणालीका चुनौती र यसको प्रभावकारी कार्यान्वयनमा आएका अवरोधहरूबारे छलफल।',
        link: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki',
        image: 'dr-tk/image5',
        publishedDate: new Date('2024-03-10')
      },
      {
        titleEn: 'Health Examination Program for Meter-Interest Victims',
        titleNp: 'मिटर ब्याज पीडितहरूको स्वास्थ्य परीक्षण कार्यक्रम',
        category: 'Political Updates',
        publisherEn: 'Headline Nepal',
        publisherNp: 'हेडलाइन नेपाल',
        contentEn: 'News coverage about Dr. Toshima Karki participating in a health examination program for affected citizens.',
        contentNp: 'मिटरब्याज पीडित नागरिकहरूको स्वास्थ्य परीक्षण कार्यक्रममा डा. तोसिमा कार्कीको सक्रिय सहभागिता।',
        link: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki',
        image: 'dr-tk/image6',
        publishedDate: new Date('2024-02-15')
      },
      {
        titleEn: 'Government Should Address Local Demands Before Taking Action',
        titleNp: 'स्थानीय माग सम्बोधन नगरी सरकारले अघि बढ्नु हुँदैन: डा. कार्की',
        category: 'Parliamentary Issues',
        publisherEn: 'Headline Nepal',
        publisherNp: 'हेडलाइन नेपाल',
        contentEn: "Coverage of Toshima Karki raising public concerns and demanding government response to citizens' issues.",
        contentNp: 'संसदमा नागरिकका मुद्दाहरू उठाउँदै र स्थानीय मागहरू सम्बोधन गर्न माग गर्दै सांसद तोसिमा कार्की।',
        link: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki',
        image: 'dr-tk/image7',
        publishedDate: new Date('2024-01-20')
      },
      {
        titleEn: 'School Education Bill Should Be Rewritten Instead of Amended',
        titleNp: 'विद्यालय शिक्षा विधेयक संशोधन होइन पुनर्लेखन गर्नुपर्छ',
        category: 'Parliamentary Issues',
        publisherEn: 'Headline Nepal',
        publisherNp: 'हेडलाइन नेपाल',
        contentEn: 'Dr. Toshima Karki expressed her position regarding education policy reform during parliamentary discussions.',
        contentNp: 'विद्यालय शिक्षा विधेयकमाथि व्यापक सुधार र पुनर्लेखन आवश्यक रहेको सांसद तोसिमा कार्कीको अडान।',
        link: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki',
        image: 'dr-tk/image8',
        publishedDate: new Date('2023-11-12')
      },
      {
        titleEn: 'Dr. Toshima Karki Moves Toward Becoming Health State Minister',
        titleNp: 'डा. तोसिमा कार्की स्वास्थ्य राज्यमन्त्री बन्ने प्रक्रियामा',
        category: 'Political Updates',
        publisherEn: 'Headline Nepal',
        publisherNp: 'हेडलाइन नेपाल',
        contentEn: "News coverage about Dr. Toshima Karki's appointment process and expectations regarding the Ministry of Health and Population.",
        contentNp: 'स्वास्थ्य मन्त्रालयमा नयाँ नेतृत्व र डा. तोसिमा कार्कीको मन्त्री बन्ने तयारी सम्बन्धी समाचार।',
        link: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki',
        image: 'dr-tk/image9',
        publishedDate: new Date('2023-01-10')
      },
      {
        titleEn: 'MP Toshima Karki Demands Immediate National Trauma Policy',
        titleNp: 'सांसद तोसिमा कार्कीले तत्काल राष्ट्रिय ट्रमा नीति माग गरिन्',
        category: 'Healthcare Policy',
        publisherEn: 'Ratopati',
        publisherNp: 'रातोपाटी',
        contentEn: 'Dr. Toshima Karki demanded immediate formulation and implementation of a National Trauma Policy to reduce deaths caused by road accidents.',
        contentNp: 'सडक दुर्घटनाबाट हुने मृत्यु न्यूनीकरण गर्न तत्काल राष्ट्रिय ट्रमा नीति तर्जुमा गरी कार्यान्वयन गर्न माग।',
        link: 'https://english.ratopati.com/story/63620/mp-karki-demands-immediate-formulation-of-national-trauma-policy',
        image: 'dr-tk/image10',
        publishedDate: new Date('2024-05-25')
      },
      {
        titleEn: 'RSP MP Karki Questions Government Legitimacy',
        titleNp: 'रास्वपा सांसद कार्कीले सरकारको वैधानिकतामाथि प्रश्न उठाइन्',
        category: 'Political Updates',
        publisherEn: 'Nepal News',
        publisherNp: 'नेपाल न्यूज',
        contentEn: "Dr. Toshima Karki's parliamentary statement regarding government performance and political accountability.",
        contentNp: 'संसदमा सरकारको कामकारबाही र राजनीतिक उत्तरदायित्वबारे सांसद तोसिमा कार्कीको सम्बोधन।',
        link: 'https://english.nepalnews.com/s/politics/rsp-mp-karki-declares-oli-govt-no-longer-legitimate/',
        image: 'dr-tk/image11',
        publishedDate: new Date('2024-07-02')
      },
      {
        titleEn: 'Toshima Karki Wins Lalitpur-3 With Over 34,000 Vote Margin',
        titleNp: 'तोसिमा कार्की ललितपुर–३ मा ३४ हजारभन्दा बढी मतान्तरले विजयी',
        category: 'Election News',
        publisherEn: 'The Kathmandu Post',
        publisherNp: 'काठमाडौँ पोष्ट',
        contentEn: 'Dr. Toshima Karki won the Lalitpur Constituency No. 3 election with 43,906 votes and a huge majority.',
        contentNp: 'राष्ट्रिय स्वतन्त्र पार्टीकी डा. तोसिमा कार्की अत्यधिक बहुमतका साथ ललितपुर क्षेत्र नं. ३ बाट प्रतिनिधि सभा सदस्यमा निर्वाचित।',
        link: 'https://kathmandupost.com/national/2026/03/07/tosima-karki-wins-lalitpur-3-with-over-34-000-vote-margin',
        image: 'dr-tk/image12',
        publishedDate: new Date('2022-11-24')
      },
      {
        titleEn: 'Government Should Immediately Bring Nepal Hospital Operation Act',
        titleNp: "सरकारले तत्काल 'नेपाल अस्पताल सञ्चालन ऐन' ल्याउनुपर्छ: डा. कार्की",
        category: 'Healthcare Policy',
        publisherEn: 'Kantipur',
        publisherNp: 'कान्तिपुर',
        contentEn: 'Dr. Toshima Karki raised the need for a separate hospital operation law to regulate healthcare institutions and improve healthcare standards.',
        contentNp: 'स्वास्थ्य संस्थाहरूको नियमन र गुणस्तर सुधारका लागि छुट्टै अस्पताल सञ्चालन ऐन आवश्यक रहेको सांसद डा. तोसिमा कार्कीको जोड।',
        link: 'https://ekantipur.com/news/2024/06/11/it-is-necessary-for-the-government-to-immediately-bring-nepal-hospital-operation-act-dr-karki-30-37.html',
        image: 'dr-tk/image13',
        publishedDate: new Date('2024-06-11')
      },
      {
        titleEn: 'MP Retirement Age Limit Should Be Set',
        titleNp: 'सांसद अवकाशको उमेर हद तोक्नुपर्छ: डा. कार्की',
        category: 'Parliamentary Issues',
        publisherEn: 'Kantipur',
        publisherNp: 'कान्तिपुर',
        contentEn: 'Dr. Toshima Karki suggested setting an age limit for lawmakers to improve representation and effectiveness in parliament.',
        contentNp: 'संसदको प्रभावकारिता र युवा प्रतिनिधित्व बढाउन सांसदहरूको लागि उमेर हद तोकिनुपर्ने डा. तोसिमा कार्कीको प्रस्ताव।',
        link: 'https://ekantipur.com/news/2025/01/17/mp-retirement-age-should-be-set-dr-karki-27-04.html',
        image: 'dr-tk/image14',
        publishedDate: new Date('2025-01-17')
      },
      {
        titleEn: 'Toshima Karki Questions Health Secretary Appointment Decision',
        titleNp: 'सांसद तोसिमाको प्रश्न: पुरुष मन्त्रीले महिला सचिवसँग काम गर्नै नसक्ने हो?',
        category: 'Parliamentary Issues',
        publisherEn: 'Kantipur',
        publisherNp: 'कान्तिपुर',
        contentEn: 'Dr. Toshima Karki questioned the process of appointing the Health Ministry secretary and raised concerns about transparency.',
        contentNp: 'स्वास्थ्य मन्त्रालयको सचिव सरुवा निर्णयमा पारदर्शीता र समानताको कुरा उठाउँदै सांसद तोसिमा कार्कीको प्रश्न।',
        link: 'https://ekantipur.com/news/2025/03/07/mp-toshimas-question-cant-a-male-minister-work-with-a-female-secretary-33-59.html',
        image: 'dr-tk/image15',
        publishedDate: new Date('2025-03-07')
      },
      {
        titleEn: 'Lawmaker Dr. Toshima Karki Wins Case Against Election Commission',
        titleNp: 'निर्वाचन आयोगविरुद्धको मुद्दामा सांसद डा. तोसिमा कार्की विजयी',
        category: 'Election News',
        publisherEn: 'Setopati',
        publisherNp: 'सेतोपाटी',
        contentEn: 'The Supreme Court overturned the Election Commission decision regarding her candidacy cancellation.',
        contentNp: 'सर्वोच्च अदालतद्वारा डा. तोसिमा कार्कीको उम्मेदवारी खारेज गर्ने निर्वाचन आयोगको निर्णय बदर।',
        link: 'https://en.setopati.com/political/164350',
        image: 'dr-tk/image16',
        publishedDate: new Date('2022-11-15')
      },
      {
        titleEn: 'Dr. Toshima Karki’s Second Journey to Parliament',
        titleNp: 'डा. तोसिमा कार्की: दोस्रोपटक संसद्को यात्रामा',
        category: 'Political Updates',
        publisherEn: 'Kantipur',
        publisherNp: 'कान्तिपुर',
        contentEn: 'Profile covering her medical background, political journey, and return to parliament.',
        contentNp: 'चिकित्सा पृष्ठभूमि, राजनीतिक यात्रा र पुनः संसदमा प्रवेश सम्बन्धी एक विशेष रिपोर्ट।',
        link: 'https://ekantipur.com/news/2026/03/06/toshima-karki-on-his-second-trip-to-parliament-32-22.html',
        image: 'dr-tk/image17',
        publishedDate: new Date('2026-03-06')
      }
    ]);
    console.log('News seeded...');

    // Seed Media/Video Coverage
    await Media.create([
      {
        titleEn: 'Healthcare Vision Interview',
        titleNp: 'मलाई नेपाली जनताले स्वास्थ्य मन्त्रीको रूपमा देख्न चाहेका छन्',
        type: 'Interviews',
        sourceEn: 'Health Aawaj',
        sourceNp: 'स्वास्थ्य आवाज',
        link: 'https://www.healthaawaj.com/interview/51839/',
        thumbnail: 'dr-tk/image12',
        publishedDate: new Date('2023-01-05')
      },
      {
        titleEn: 'Health Sector Reform Blueprint Interview',
        titleNp: 'स्वास्थ्य क्षेत्र सुधारको खाका बनाएको छु',
        type: 'Interviews',
        sourceEn: 'Nagarik News',
        sourceNp: 'नागरिक न्यूज',
        link: 'https://nagariknews.nagariknetwork.com/interview/1038531-1672301280.html',
        thumbnail: 'dr-tk/image1',
        publishedDate: new Date('2022-12-29')
      },
      {
        titleEn: 'Health Ministry Leadership Interview',
        titleNp: 'विज्ञताका हिसाबले स्वास्थ्य मन्त्रालय मैले नै पाउनुपर्छ',
        type: 'Interviews',
        sourceEn: 'Nepal Samaya',
        sourceNp: 'नेपाल समय',
        link: 'https://nepalsamaya.com/detail/95913',
        thumbnail: 'dr-tk/image4',
        publishedDate: new Date('2022-12-25')
      },
      {
        titleEn: 'Toshima Karki Media Interviews Collection',
        titleNp: 'तोसिमा कार्की मिडिया अन्तर्वार्ता संग्रह',
        type: 'TV Programs',
        sourceEn: 'YouTube',
        sourceNp: 'यूट्यूब',
        link: 'https://www.youtube.com/results?search_query=Toshima+Karki+interview',
        thumbnail: 'dr-tk/image11',
        publishedDate: new Date('2024-05-01')
      },
      {
        titleEn: 'Toshima Karki Health Sector Discussions',
        titleNp: 'तोसिमा कार्की स्वास्थ्य क्षेत्र छलफल',
        type: 'YouTube Videos',
        sourceEn: 'YouTube',
        sourceNp: 'यूट्यूब',
        link: 'https://www.youtube.com/results?search_query=Toshima+Karki+health+policy',
        thumbnail: 'dr-tk/image6',
        publishedDate: new Date('2024-03-20')
      },
      {
        titleEn: 'Toshima Karki Parliament Speech Videos',
        titleNp: 'तोसिमा कार्की संसद् भाषण भिडियोहरू',
        type: 'Speeches',
        sourceEn: 'YouTube',
        sourceNp: 'यूट्यूब',
        link: 'https://www.youtube.com/results?search_query=Toshima+Karki+parliament+speech',
        thumbnail: 'dr-tk/image8',
        publishedDate: new Date('2024-06-30')
      },
      {
        titleEn: 'Hospital and Healthcare Visits',
        titleNp: 'अस्पताल तथा स्वास्थ्य सेवा भ्रमणहरू',
        type: 'Public Appearances',
        sourceEn: 'YouTube',
        sourceNp: 'यूट्यूब',
        link: 'https://www.youtube.com/results?search_query=Toshima+Karki+hospital+visit',
        thumbnail: 'dr-tk/image2',
        publishedDate: new Date('2023-08-15')
      }
    ]);
    console.log('Media seeded...');

    // Seed Blogs
    await Blog.create([
      {
        titleEn: 'The Path to Healthcare Reform in Nepal',
        titleNp: 'नेपालमा स्वास्थ्य क्षेत्र सुधारको बाटो',
        category: 'Healthcare Reform',
        authorEn: 'Dr. Toshima Karki',
        authorNp: 'डा. तोषिमा कार्की',
        summaryEn: 'Regulating costs, boosting insurance, and standardizing operations are key to accessible health.',
        summaryNp: 'स्वास्थ्य सेवालाई पहुँचयोग्य बनाउन शुल्क नियमन र बीमाको सुदृढीकरण पहिलो सर्त हो।',
        contentEn: 'Quality healthcare shouldn\'t be a privilege for the wealthy. Through targeted reforms like the Hospital Operation Act and regulating hospital fees, we can build a system where every citizen gets standard treatment without financial ruin. We need strong, cooperative actions between government and private entities to reach everyone.',
        contentNp: 'गुणस्तरीय स्वास्थ्य सेवा धनी वर्गको मात्र अधिकार हुनु हुँदैन। अस्पताल सञ्चालन ऐन र सेवा शुल्कको नियमन मार्फत हामीले यस्तो प्रणाली विकास गर्न सक्छौं जहाँ हरेक नागरिकले आर्थिक संकट बिना उपचार पाउन सकून्।',
        image: 'dr-tk/image1',
        readTime: '6 min read',
        publishedDate: new Date('2024-06-20')
      },
      {
        titleEn: 'From Clinical Medicine to Policymaking: My Journey',
        titleNp: 'क्लिनिकल मेडिसिनदेखि नीति निर्माणसम्म: मेरो यात्रा',
        category: 'Personal Journey',
        authorEn: 'Dr. Toshima Karki',
        authorNp: 'डा. तोषिमा कार्की',
        summaryEn: 'Why I decided to move from treating individual patients to curing the healthcare system itself.',
        summaryNp: 'बिरामी जाँच्ने स्टेथोसप छोडेर प्रणालीकै उपचार गर्न राजनीतिमा आउनुको मेरो अन्तर्य।',
        contentEn: 'As a doctor, I saved lives one patient at a time. But in rural health camps, I saw that the ultimate cure for our healthcare crisis lies not in the clinic, but in the halls of parliament through strong, pro-people health policies. Changing health policies is the best way to serve our country.',
        contentNp: 'एक चिकित्सकका रूपमा मैले एक पटकमा एकजना बिरामीको ज्यान जोगाउन सक्थें। तर ग्रामीण स्वास्थ्य शिविरहरूमा मैले बुझें कि हाम्रो स्वास्थ्य संकटको अन्तिम समाधान क्लिनिकमा होइन, नीति निर्माण तहमा छ।',
        image: 'dr-tk/image4',
        readTime: '8 min read',
        publishedDate: new Date('2024-01-15')
      },
      {
        titleEn: 'Prioritizing Preventative Health & Awareness',
        titleNp: 'प्रवर्धनात्मक स्वास्थ्य र सचेतनालाई प्राथमिकता',
        category: 'Public Awareness',
        authorEn: 'Dr. Toshima Karki',
        authorNp: 'डा. तोषिमा कार्की',
        summaryEn: 'Preventing diseases through regular screening and healthy lifestyle changes.',
        summaryNp: 'नियमित स्वास्थ्य जाँच र स्वस्थ जीवनशैली अपनाई रोग लाग्नै नदिने उपायहरू बारे सचेतना।',
        contentEn: 'A country is only as strong as the health of its citizens. By investing in rural health clinics, preventative care, maternal health, and immediate trauma response, we can save thousands of lives before they even reach emergency rooms.',
        contentNp: 'नागरिक स्वस्थ नभई देश बलियो हुन सक्दैन। ग्रामीण क्लिनिक, मातृ स्वास्थ्य र ट्रमा केयरमा लगानी गरेर हामीले अस्पताल पुग्नु अगावै धेरैको ज्यान जोगाउन सक्छौं।',
        image: 'dr-tk/image6',
        readTime: '5 min read',
        publishedDate: new Date('2024-04-10')
      }
    ]);
    console.log('Blogs seeded...');

    // Seed Gallery (with all 15 images)
    await Gallery.create([
      {
        titleEn: 'Hospital Inspection and Monitoring Visit',
        titleNp: 'अस्पताल निरीक्षण तथा अनुगमन',
        category: 'Health Programs',
        mediaUrl: 'dr-tk/image1',
        date: new Date('2024-05-20')
      },
      {
        titleEn: 'State Ministry of Health Office Work',
        titleNp: 'स्वास्थ्य मन्त्रालयको कार्यकक्षमा',
        category: 'Leadership Moments',
        mediaUrl: 'dr-tk/image2',
        date: new Date('2023-02-10')
      },
      {
        titleEn: 'Interaction with Lalitpur Community Members',
        titleNp: 'ललितपुरका नागरिकहरूसँग अन्तरक्रिया',
        category: 'Public Meetings',
        mediaUrl: 'dr-tk/image3',
        date: new Date('2024-04-25')
      },
      {
        titleEn: 'Official Portrait of Dr. Toshima Karki',
        titleNp: 'डा. तोसिमा कार्कीको आधिकारिक तस्विर',
        category: 'Leadership Moments',
        mediaUrl: 'dr-tk/image4',
        date: new Date('2022-12-10')
      },
      {
        titleEn: 'Working on Health Policies at Desk',
        titleNp: 'स्वास्थ्य नीति लेखन तथा अध्ययनमा',
        category: 'Leadership Moments',
        mediaUrl: 'dr-tk/image5',
        date: new Date('2024-03-10')
      },
      {
        titleEn: 'Healthcare Camp for Underprivileged Citizens',
        titleNp: 'विपन्न नागरिकका लागि निःशुल्क स्वास्थ्य शिविर',
        category: 'Health Programs',
        mediaUrl: 'dr-tk/image6',
        date: new Date('2024-02-28')
      },
      {
        titleEn: 'Addressing a Public Health Awareness Program',
        titleNp: 'स्वास्थ्य सचेतना कार्यक्रममा सम्बोधन',
        category: 'Health Programs',
        mediaUrl: 'dr-tk/image7',
        date: new Date('2024-02-14')
      },
      {
        titleEn: 'Press Conference on Healthcare Reforms',
        titleNp: 'स्वास्थ्य सुधार सम्बन्धी पत्रकार सम्मेलन',
        category: 'Media Events',
        mediaUrl: 'dr-tk/image8',
        date: new Date('2024-01-30')
      },
      {
        titleEn: 'International Delegation on Public Health',
        titleNp: 'अन्तर्राष्ट्रिय स्वास्थ्य प्रतिनिधिमण्डलसँग बैठक',
        category: 'Media Events',
        mediaUrl: 'dr-tk/image9',
        date: new Date('2023-12-15')
      },
      {
        titleEn: 'Dr. Toshima Karki Official Portrait Red Blazer',
        titleNp: 'डा. तोसिमा कार्की - रातो कोटमा',
        category: 'Leadership Moments',
        mediaUrl: 'dr-tk/image10',
        date: new Date('2022-11-20')
      },
      {
        titleEn: 'Speaking in the Federal Parliament of Nepal',
        titleNp: 'प्रतिनिधि सभा बैठकमा मन्तव्य राख्दै',
        category: 'Parliament Sessions',
        mediaUrl: 'dr-tk/image11',
        date: new Date('2024-06-04')
      },
      {
        titleEn: 'National TV Interview on Medical Policy',
        titleNp: 'राष्ट्रिय टेलिभिजनमा नीतिगत बहस',
        category: 'Media Events',
        mediaUrl: 'dr-tk/image12',
        date: new Date('2024-05-15')
      },
      {
        titleEn: 'Maternal Healthcare Awareness Campaign',
        titleNp: 'मातृ स्वास्थ्य सचेतना अभियान',
        category: 'Health Programs',
        mediaUrl: 'dr-tk/image13',
        date: new Date('2024-03-12')
      },
      {
        titleEn: 'Policy Discussion with Lawmakers',
        titleNp: 'सांसदहरूसँग नीतिगत छलफल',
        category: 'Parliament Sessions',
        mediaUrl: 'dr-tk/image14',
        date: new Date('2024-06-11')
      },
      {
        titleEn: 'Addressing Public Assembly in Lalitpur',
        titleNp: 'ललितपुरमा आयोजित आमसभामा सम्बोधन',
        category: 'Public Meetings',
        mediaUrl: 'dr-tk/image15',
        date: new Date('2024-05-18')
      }
    ]);
    console.log('Gallery seeded...');

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Home.deleteMany();
    await About.deleteMany();
    await Ministry.deleteMany();
    await Parliament.deleteMany();
    await News.deleteMany();
    await Blog.deleteMany();
    await Media.deleteMany();
    await Gallery.deleteMany();
    await Settings.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
