const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  titleEn: {
    type: String,
    default: 'A life dedicated to people and purpose.'
  },
  titleNp: {
    type: String,
    default: 'जनता र उद्देश्यमा समर्पित जीवन।'
  },
  descriptionEn: {
    type: String,
    default: 'A doctor by profession. A leader by responsibility. A human by choice. My journey is driven by compassion, guided by values, and anchored in service.'
  },
  descriptionNp: {
    type: String,
    default: 'पेशाले चिकित्सक। जिम्मेवारीले नेता। इच्छाले मानव। मेरो यात्रा सहानुभूतिद्वारा सञ्चालित, मूल्यमान्यताहरूद्वारा निर्देशित र सेवामा आधारित छ।'
  },
  storyEn: {
    type: String,
    default: 'I was born in a humble family that taught me the value of honesty, empathy, and hard work...'
  },
  storyNp: {
    type: String,
    default: 'मेरो जन्म एक सामान्य परिवारमा भएको थियो जसले मलाई इमानदारी, सहानुभूति र कडा परिश्रमको मूल्य सिकाएको थियो...'
  },
  signatureImage: {
    type: String,
      default: 'dr-tk/signature'
  },
  profileImage: {
    type: String,
      default: 'dr-tk/image5'
  },
  atAGlance: [
    {
      titleEn: String,
      titleNp: String,
      descriptionEn: String,
      descriptionNp: String,
      icon: String
    }
  ],
  whatDrivesMe: [
    {
      titleEn: String,
      titleNp: String,
      descriptionEn: String,
      descriptionNp: String,
      icon: String
    }
  ],
  focusAreas: [
    {
      titleEn: String,
      titleNp: String,
      descriptionEn: String,
      descriptionNp: String,
      icon: String
    }
  ],
  education: [
    {
      schoolEn: String,
      schoolNp: String,
      degreeEn: String,
      degreeNp: String,
      period: String
    }
  ],
  careerTimeline: [
    {
      organizationEn: String,
      organizationNp: String,
      roleEn: String,
      roleNp: String,
      period: String
    }
  ],
  values: [
    {
      titleEn: String,
      titleNp: String,
      descriptionEn: String,
      descriptionNp: String,
      icon: String
    }
  ],
  awards: [
    {
      titleEn: String,
      titleNp: String,
      organizationEn: String,
      organizationNp: String,
      year: String
    }
  ],
  achievements: [
    {
      titleEn: String,
      titleNp: String,
      descriptionEn: String,
      descriptionNp: String
    }
  ],
  impactStats: {
    programs: { type: String, default: '500+' },
    communities: { type: String, default: '250+' },
    initiatives: { type: String, default: '50+' },
    yearsOfService: { type: String, default: '10+' }
  },
  quoteEn: {
    type: String,
    default: 'Leadership is not about power. It is about purpose.'
  },
  quoteNp: {
    type: String,
    default: 'नेतृत्व शक्ति होइन। यो उद्देश्य हो।'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('About', AboutSchema);
