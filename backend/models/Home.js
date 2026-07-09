const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  hero: {
    titleEn: {
      type: String,
      default: 'Empowering Health & Leadership in Nepal'
    },
    titleNp: {
      type: String,
      default: 'नेपालमा स्वास्थ्य र नेतृत्वको सबलीकरण'
    },
    subtitleEn: {
      type: String,
      default: 'Leadership. Compassion. Commitment.'
    },
    subtitleNp: {
      type: String,
      default: 'नेतृत्व। सहानुभूति। प्रतिबद्धता।'
    },
    descriptionEn: {
      type: String,
      default: 'Dedicated to building a healthy, equitable and prosperous Nepal through healthcare reform, good governance and people-first leadership.'
    },
    descriptionNp: {
      type: String,
      default: 'स्वास्थ्य सेवा सुधार, सुशासन र जनता-प्रथम नेतृत्व मार्फत एक स्वस्थ, समतामूलक र समृद्ध नेपाल निर्माणमा समर्पित।'
    },
    image: {
      type: String,
      default: '/image/image10.png'
    },
    ctaTextEn: {
      type: String,
      default: 'Learn More About Me'
    },
    ctaTextNp: {
      type: String,
      default: 'मेरो बारेमा थप जान्नुहोस्'
    },
    ctaLink: {
      type: String,
      default: '/about'
    }
  },
  stats: {
    livesImpacted: { type: String, default: '1M+' },
    patientsSupported: { type: String, default: '500K+' },
    healthPolicies: { type: String, default: '20+' },
    yearsOfService: { type: String, default: '15+' },
    reachImpact: { type: String, default: 'Nationwide' }
  },
  exploreWork: {
    health: {
      titleEn: { type: String, default: 'Health Contributions' },
      titleNp: { type: String, default: 'स्वास्थ्य क्षेत्रमा योगदान' },
      descriptionEn: { type: String, default: 'Reforming healthcare services, health insurance, policies, and rural access.' },
      descriptionNp: { type: String, default: 'स्वास्थ्य सेवा सुधार, स्वास्थ्य बीमा, नीति तथा ग्रामीण पहुँचमा सुधार।' },
      link: { type: String, default: '/ministry' }
    },
    parliament: {
      titleEn: { type: String, default: 'Parliamentary Work' },
      titleNp: { type: String, default: 'संसदीय कार्य' },
      descriptionEn: { type: String, default: 'Raising voices, proposing bills, committee duties, and civic debates.' },
      descriptionNp: { type: String, default: 'आवाज उठाउने, विधेयकहरू प्रस्ताव गर्ने, समिति जिम्मेवारी र नागरिक बहस।' },
      link: { type: String, default: '/parliament' }
    },
    media: {
      titleEn: { type: String, default: 'Speeches & Media' },
      titleNp: { type: String, default: 'भाषण तथा मिडिया' },
      descriptionEn: { type: String, default: 'Public addresses, TV talks, interviews, podcasts, and press briefings.' },
      descriptionNp: { type: String, default: 'सार्वजनिक ठेगानाहरू, टेलिभिजन कुराकानी, अन्तर्वार्ता, पोडकास्ट र प्रेस ब्रिफिङ।' },
      link: { type: String, default: '/media' }
    },
    journey: {
      titleEn: { type: String, default: 'Political Journey' },
      titleNp: { type: String, default: 'राजनीतिक यात्रा' },
      descriptionEn: { type: String, default: 'Values, campaigns, events, and vision of Dr. Toshima Karki.' },
      descriptionNp: { type: String, default: 'मूल्यहरू, अभियानहरू, घटनाहरू, र डा. तोषिमा कार्कीको दृष्टिकोण।' },
      link: { type: String, default: '/about' }
    }
  },
  visionMission: {
    visionEn: {
      type: String,
      default: 'A prosperous Nepal with universal healthcare access and transparent leadership.'
    },
    visionNp: {
      type: String,
      default: 'सार्वभौमिक स्वास्थ्य सेवा पहुँच र पारदर्शी नेतृत्वको साथ एक समृद्ध नेपाल।'
    },
    missionEn: {
      type: String,
      default: 'To advocate for healthcare reform, lead with empathy, and amplify citizen voices in parliament.'
    },
    missionNp: {
      type: String,
      default: 'स्वास्थ्य सेवा सुधारको वकालत गर्ने, सहानुभूतिपूर्वक नेतृत्व गर्ने र संसदमा नागरिकको आवाजलाई बुलन्द गर्ने।'
    }
  },
  sections: {
    type: Map,
    of: new mongoose.Schema({
      visible: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }, { _id: false }),
    default: () => new Map([
      ['hero', { visible: true, order: 1 }],
      ['stats', { visible: true, order: 2 }],
      ['explore', { visible: true, order: 3 }],
      ['visionMission', { visible: true, order: 4 }],
      ['featuredNews', { visible: true, order: 5 }],
      ['featuredVideos', { visible: true, order: 6 }],
      ['gallery', { visible: true, order: 7 }]
    ])
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Home', HomeSchema);
