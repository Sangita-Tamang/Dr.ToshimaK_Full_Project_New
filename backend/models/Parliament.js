const mongoose = require('mongoose');

const SpeechSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleNp: { type: String },
  date: { type: Date, default: Date.now },
  descriptionEn: { type: String },
  descriptionNp: { type: String },
  videoUrl: { type: String },
  imageUrl: { type: String, default: '/image/image11.png' }
});

const ParliamentSchema = new mongoose.Schema({
  hero: {
    titleEn: { type: String, default: 'Parliamentary Leadership for People-Centered Change' },
    titleNp: { type: String, default: 'जनमुखी परिवर्तनका लागि संसदीय नेतृत्व' },
    descriptionEn: { type: String, default: 'Representing the voice of citizens in Parliament with integrity, accountability, and commitment to national progress.' },
    descriptionNp: { type: String, default: 'इमानदारी, जवाफदेहिता र राष्ट्रिय प्रगतिको प्रतिबद्धताका साथ संसदमा नागरिकको आवाजको प्रतिनिधित्व गर्दै।' },
    image: { type: String, default: '/image/image11.png' }
  },
  roles: [
    {
      titleEn: String,
      titleNp: String,
      descriptionEn: String,
      descriptionNp: String,
      icon: String
    }
  ],
  speeches: [SpeechSchema],
  focusAreas: [
    {
      titleEn: String,
      titleNp: String
    }
  ],
  impact: {
    questionsRaised: { type: String, default: '50+' },
    discussions: { type: String, default: '20+' },
    billsSupported: { type: String, default: '10+' },
    committeeStatus: { type: String, default: 'Active' }
  },
  recentWork: [
    {
      year: String,
      titleEn: String,
      titleNp: String,
      descriptionEn: String,
      descriptionNp: String
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Parliament', ParliamentSchema);
