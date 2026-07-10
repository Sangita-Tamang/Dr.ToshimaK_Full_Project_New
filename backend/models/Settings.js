const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  siteNameEn: {
    type: String,
    default: 'Dr. Toshima Karki Official Website'
  },
  siteNameNp: {
    type: String,
    default: 'डा. तोषिमा कार्की आधिकारिक वेबसाइट'
  },
  contactAddressEn: {
    type: String,
    default: 'Nakkhu, Lalitpur, Nepal'
  },
  contactAddressNp: {
    type: String,
    default: 'नक्कु, ललितपुर, नेपाल'
  },
  contactEmail: {
    type: String,
    default: 'info@toshimakarki.gov.np'
  },
  contactPhone: {
    type: String,
    default: '+977 1 1234567'
  },
  contactPhoneAlt: {
    type: String,
    default: '+977 98XXXXXXXX'
  },
  logo: {
    type: String,
    default: '/image/logo.png'
  },
  favicon: {
    type: String,
    default: '/favicon.ico'
  },
  copyrightEn: {
    type: String,
    default: '© 2026 Dr. Toshima Karki. All Rights Reserved.'
  },
  copyrightNp: {
    type: String,
    default: '© २०२६ डा. तोषिमा कार्की। सर्वाधिकार सुरक्षित।'
  },
  officeHoursEn: {
    type: String,
    default: 'Sun - Fri: 9:00 AM - 5:00 PM'
  },
  officeHoursNp: {
    type: String,
    default: 'आइतबार - शुक्रबार: बिहान ९:०० - दिउँसो ५:०० बजे'
  },
  googleMapsUrl: {
    type: String,
    default: ''
  },
  seo: {
    metaTitleEn: { type: String, default: 'Dr. Toshima Karki | Official Website' },
    metaTitleNp: { type: String, default: 'डा. तोषिमा कार्की | आधिकारिक वेबसाइट' },
    metaDescriptionEn: { type: String, default: 'Official website of Dr. Toshima Karki - Member of Parliament, Medical Professional, and Social Activist.' },
    metaDescriptionNp: { type: String, default: 'डा. तोषिमा कार्कीको आधिकारिक वेबसाइट - संसद सदस्य, चिकित्सा पेशेवर र सामाजिक कार्यकर्ता।' },
    keywords: { type: String, default: 'Dr. Toshima Karki, Toshima Karki, Member of Parliament Nepal, RSP, Health Reform' },
    ogImage: { type: String, default: '/image/image10.png' },
    twitterCardImage: { type: String, default: '/image/image10.png' }
  },
  homepageCounts: {
    featuredNews: { type: Number, default: 3 },
    featuredBlogs: { type: Number, default: 3 },
    featuredVideos: { type: Number, default: 3 },
    galleryPreview: { type: Number, default: 6 }
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  socials: {
    facebook: { type: String, default: 'https://facebook.com' },
    twitter: { type: String, default: 'https://twitter.com' },
    instagram: { type: String, default: 'https://instagram.com' },
    youtube: { type: String, default: 'https://youtube.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    tiktok: { type: String, default: 'https://tiktok.com' }
  },
  internshipOpen: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);
