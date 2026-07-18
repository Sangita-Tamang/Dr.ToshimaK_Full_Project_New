const mongoose = require('mongoose');

const ContributionItemSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleNp: { type: String },
  descriptionEn: { type: String, required: true },
  descriptionNp: { type: String },
  image: { type: String },
  link: { type: String }
});

const MinistrySchema = new mongoose.Schema({
  hero: {
    titleEn: { type: String, default: 'Leadership with Compassion. Reform with Purpose.' },
    titleNp: { type: String, default: 'सहानुभूति सहितको नेतृत्व। उद्देश्यपूर्ण सुधार।' },
    descriptionEn: { type: String, default: 'Dedicated to building an equitable, accessible, and people-centered healthcare system through policy reform, innovation, and compassionate governance.' },
    descriptionNp: { type: String, default: 'नीतिगत सुधार, नवप्रवर्तन र सहानुभूतिपूर्ण सुशासन मार्फत समतामूलक, पहुँचयोग्य र जनमुखी स्वास्थ्य सेवा प्रणाली निर्माणमा समर्पित।' },
    image: { type: String, default: 'dr-tk/ministry.hero' }
  },
  stats: {
    livesImpacted: { type: String, default: '1M+' },
    patientsSupported: { type: String, default: '500K+' },
    healthPolicies: { type: String, default: '20+' },
    yearsOfService: { type: String, default: '15+' },
    districtsReached: { type: String, default: '75+' }
  },
  contributions: [ContributionItemSchema],
  majorPrograms: [
    {
      titleEn: String,
      titleNp: String,
      descriptionEn: String,
      descriptionNp: String
    }
  ],
  policyHighlights: [
    {
      titleEn: String,
      titleNp: String,
      link: String
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ministry', MinistrySchema);
