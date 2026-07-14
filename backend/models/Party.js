const mongoose = require('mongoose');

const LocalizedField = {
  titleEn: { type: String },
  titleNp: { type: String },
  descriptionEn: { type: String },
  descriptionNp: { type: String }
};

const PartyDocumentSchema = new mongoose.Schema({
  titleEn: { type: String },
  titleNp: { type: String },
  descriptionEn: { type: String },
  descriptionNp: { type: String },
  categoryEn: { type: String },
  categoryNp: { type: String },
  fileUrl: { type: String },
  downloadCount: { type: Number, default: 0 }
});

const PartyGallerySchema = new mongoose.Schema({
  titleEn: { type: String },
  titleNp: { type: String },
  categoryEn: { type: String },
  categoryNp: { type: String },
  mediaUrl: { type: String },
  type: { type: String, enum: ['photo', 'video'], default: 'photo' },
  date: { type: Date, default: Date.now }
});

const PartyNewsSchema = new mongoose.Schema({
  titleEn: { type: String },
  titleNp: { type: String },
  categoryEn: { type: String },
  categoryNp: { type: String },
  summaryEn: { type: String },
  summaryNp: { type: String },
  image: { type: String },
  date: { type: Date, default: Date.now },
  link: { type: String }
});

const PartySchema = new mongoose.Schema({
  hero: {
    titleEn: { type: String, default: 'POLITICAL PARTY' },
    titleNp: { type: String, default: 'राजनीतिक पार्टी' },
    subtitleEn: { type: String, default: 'Rastriya Swatantra Party' },
    subtitleNp: { type: String, default: 'राष्ट्रिय स्वतन्त्र पार्टी' },
    descriptionEn: { type: String, default: 'Committed to transparency, good governance, and accountable public leadership.' },
    descriptionNp: { type: String, default: 'पारदर्शिता, सुशासन र जवाफदेही सार्वजनिक नेतृत्वमा प्रतिबद्ध।' },
    ctaTextEn: { type: String, default: 'Learn More' },
    ctaTextNp: { type: String, default: 'थप जानकारी' },
    ctaLink: { type: String, default: '/party#about' },
    logoImage: { type: String, default: '' },
    backgroundImage: { type: String, default: '/image/image17.png' }
  },
  about: {
    historyEn: { type: String, default: 'Rastriya Swatantra Party (RSP) is a national political party in Nepal that advocates for good governance, transparency, accountability, and citizen-centered leadership.' },
    historyNp: { type: String, default: 'राष्ट्रिय स्वतन्त्र पार्टी (आरएसपी) नेपालमा एक राष्ट्रिय राजनीतिक पार्टी हो जुन सुशासन, पारदर्शिता, जवाफदेहिता र नागरिक केन्द्रित नेतृत्वको पक्षमा छ।' },
    missionEn: { type: String, default: 'To strengthen democratic institutions, champion justice, and build an inclusive future for every Nepali.' },
    missionNp: { type: String, default: 'न्यायको वकालत गर्ने, लोकतान्त्रिक संस्थाहरूलाई सशक्त बनाउने र प्रत्येक नेपालीको लागि समावेशी भविष्य निर्माण गर्ने।' },
    visionEn: { type: String, default: 'A prosperous Nepal governed by rule of law, transparency, and equal opportunity for all.' },
    visionNp: { type: String, default: 'कानूनको शासन, पारदर्शिता र सबैका लागि समान अवसरमा आधारित समृद्ध नेपाल।' },
    objectivesEn: { type: String, default: 'Promote ethical politics, defend rights, and deliver accountable public service at every level.' },
    objectivesNp: { type: String, default: 'नैतिक राजनीति प्रवर्द्धन गर्ने, अधिकारको रक्षा गर्ने र प्रत्येक तहमा जवाफदेही सार्वजनिक सेवा प्रदान गर्ने।' },
    ideologyEn: { type: String, default: 'People-first governance with transparency, inclusiveness, and adherence to democratic values.' },
    ideologyNp: { type: String, default: 'जनमुखी शासन, पारदर्शिता, समावेशीता र लोकतान्त्रिक मूल्यमा आधारित दर्शन।' },
    descriptionEn: { type: String, default: 'The party is built on the belief in transparent governance, equal opportunities, and responsible leadership to create a better, more prosperous Nepal.' },
    descriptionNp: { type: String, default: 'पार्टी पारदर्शी शासन, समान अवसर र जिम्मेवार नेतृत्वमा विश्वास राखेर राम्रो, बढी समृद्ध नेपाल निर्माण गर्न निर्माण गरिएको छ।' }
  },
  principles: [
    {
      titleEn: String,
      titleNp: String,
      descriptionEn: String,
      descriptionNp: String,
      icon: String
    }
  ],
  role: {
    titleEn: { type: String, default: 'Committed to People, Policies and Progress' },
    titleNp: { type: String, default: 'जनता, नीति र प्रगतिका लागि प्रतिबद्ध' },
    descriptionEn: { type: String, default: 'As a member of Rastriya Swatantra Party, Dr. Toshima Karki works with dedication to promote effective policies, strengthen institutions, and uplift the lives of citizens.' },
    descriptionNp: { type: String, default: 'राष्ट्रिय स्वतन्त्र पार्टीको सदस्यको रूपमा, डा. तोषिमा कार्की प्रभावकारी नीतिहरू प्रवर्द्धन गर्ने, संस्थाहरू सशक्त बनाउने र नागरिकहरूको जीवन उन्नत पार्ने समर्पणका साथ काम गर्नुहुन्छ।' },
    bullets: [
      {
        en: String,
        np: String
      }
    ]
  },
  leadership: [
    {
      photo: { type: String },
      nameEn: String,
      nameNp: String,
      positionEn: String,
      positionNp: String,
      bioEn: String,
      bioNp: String,
      order: { type: Number, default: 0 },
      status: { type: String, default: 'active' }
    }
  ],
  structure: [
    {
      levelEn: String,
      levelNp: String,
      descriptionEn: String,
      descriptionNp: String
    }
  ],
  achievements: [
    {
      labelEn: String,
      labelNp: String,
      value: String,
      descriptionEn: String,
      descriptionNp: String
    }
  ],
  documents: [PartyDocumentSchema],
  gallery: [PartyGallerySchema],
  latestNews: [PartyNewsSchema],
  statistics: {
    seatsWon: { type: String, default: '12' },
    members: { type: String, default: '5,000+' },
    districtOffices: { type: String, default: '25' },
    programs: { type: String, default: '40+' },
    achievements: { type: String, default: '20+' }
  },
  cta: {
    visitWebsiteEn: { type: String, default: 'Visit Official Website' },
    visitWebsiteNp: { type: String, default: 'अधिकारिक वेबसाइट हेर्नुहोस्' },
    joinPartyEn: { type: String, default: 'Join the Party' },
    joinPartyNp: { type: String, default: 'पार्टीमा सामेल हुनुहोस्' },
    contactEn: { type: String, default: 'Contact Us' },
    contactNp: { type: String, default: 'हामीलाई सम्पर्क गर्नुहोस्' }
  },
  seo: {
    metaTitleEn: { type: String, default: 'Rastriya Swatantra Party | Dr. Toshima Karki' },
    metaTitleNp: { type: String, default: 'राष्ट्रिय स्वतन्त्र पार्टी | डा. तोषिमा कार्की' },
    metaDescriptionEn: { type: String, default: 'Official page for the Rastriya Swatantra Party and Dr. Toshima Karki’s leadership in transparent and accountable governance.' },
    metaDescriptionNp: { type: String, default: 'राष्ट्रिय स्वतन्त्र पार्टी र डा. तोषिमा कार्कीको पारदर्शी र जवाफदेही नेतृत्वको आधिकारिक पृष्ठ।' },
    keywords: { type: String, default: 'Rastriya Swatantra Party, RSP, Dr. Toshima Karki, Nepal politics, public leadership' },
    ogImage: { type: String, default: '/image/image10.png' },
    twitterImage: { type: String, default: '/image/image10.png' },
    canonicalUrl: { type: String, default: '/party' },
    slug: { type: String, default: 'party' }
  },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
  displayOrder: { type: Number, default: 5 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Party', PartySchema);
