import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ParliamentHero from '../../components/parliament/ParliamentHero';
import ParliamentJourney from '../../components/parliament/ParliamentJourney';
import ParliamentFilters from '../../components/parliament/ParliamentFilters';
import ParliamentActivities from '../../components/parliament/ParliamentActivities';
import axios from 'axios';
import { getCloudinaryUrl } from '../../services/cloudinaryService';
import './Parliament.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';
const PARLIAMENT_OG_IMAGE = getCloudinaryUrl('dr-tk/parliment.hero', { width: 1200, height: 630 });

const FALLBACK_ACTIVITIES = [
  ['Parliamentary Discussion on Healthcare Issues', 'स्वास्थ्य मुद्दाहरूमा संसदीय छलफल', 'Raised important healthcare concerns in Parliament, focusing on improving healthcare accessibility, strengthening public health services, and supporting evidence-based healthcare policy development in Nepal.', 'स्वास्थ्य सेवामा पहुँच सुधार, सार्वजनिक स्वास्थ्य सेवा सुदृढीकरण र प्रमाणमा आधारित स्वास्थ्य नीति विकासमा केन्द्रित हुँदै संसदमा महत्वपूर्ण स्वास्थ्य सरोकारहरू उठाइयो।', 'Health Policy', 'स्वास्थ्य नीति', 2024, 'https://hr.parliament.gov.np/en/video/18557'],
  ['Public Health System Discussion', 'सार्वजनिक स्वास्थ्य प्रणाली छलफल', 'Participated in parliamentary discussions regarding Nepal’s public health system, addressing challenges in healthcare infrastructure, service delivery, and improving healthcare access for citizens.', 'नेपालको सार्वजनिक स्वास्थ्य प्रणाली, स्वास्थ्य पूर्वाधार, सेवा प्रवाह र नागरिकको स्वास्थ्य सेवामा पहुँच सुधारसम्बन्धी संसदीय छलफलमा सहभागिता।', 'Healthcare', 'स्वास्थ्य सेवा', 2024, 'https://hr.parliament.gov.np/en/video/19224'],
  ['Raising Public Issues in Parliament', 'संसदमा सार्वजनिक मुद्दाहरू उठाउँदै', 'Represented citizens’ concerns in Parliament by raising important public issues and advocating for responsible governance, transparency, and effective solutions for community challenges.', 'महत्वपूर्ण सार्वजनिक मुद्दा उठाउँदै जिम्मेवार शासन, पारदर्शिता र समुदायका चुनौतीको प्रभावकारी समाधानका लागि संसदमा नागरिकका सरोकार प्रतिनिधित्व गरियो।', 'Public Issues', 'सार्वजनिक मुद्दा', 2024, 'https://hr.parliament.gov.np/en/video/19765'],
  ['Health Sector Reform Discussion', 'स्वास्थ्य क्षेत्र सुधार छलफल', 'Contributed to discussions on healthcare reforms, focusing on improving healthcare policies, strengthening health governance, and creating sustainable healthcare systems for Nepal.', 'स्वास्थ्य नीति सुधार, स्वास्थ्य शासन सुदृढीकरण र नेपालका लागि दिगो स्वास्थ्य प्रणाली निर्माणमा केन्द्रित स्वास्थ्य सुधारसम्बन्धी छलफलमा योगदान।', 'Health Reform', 'स्वास्थ्य सुधार', 2024, 'https://hr.parliament.gov.np/en/video/21055'],
  ['Parliamentary Speech and Policy Discussion', 'संसदीय भाषण र नीति छलफल', 'Delivered parliamentary speeches and participated in policy discussions related to national development, public welfare, and government accountability.', 'राष्ट्रिय विकास, सार्वजनिक कल्याण र सरकारी जवाफदेहितासम्बन्धी संसदीय भाषण र नीति छलफलमा सहभागिता।', 'Parliamentary Debate', 'संसदीय बहस', 2024, 'https://hr.parliament.gov.np/en/video/14331'],
  ['Public Welfare Discussion', 'सार्वजनिक कल्याण छलफल', 'Addressed public welfare topics in Parliament, highlighting citizens’ needs and supporting policies focused on social development and community improvement.', 'नागरिकका आवश्यकता उजागर गर्दै सामाजिक विकास र समुदाय सुधारमा केन्द्रित नीतिको समर्थनसहित संसदमा सार्वजनिक कल्याणका विषय उठाइयो।', 'Citizen Issues', 'नागरिक मुद्दा', 2024, 'https://hr.parliament.gov.np/en/video/18188'],
  ['Healthcare Related Parliamentary Questions', 'स्वास्थ्य सम्बन्धी संसदीय प्रश्नहरू', 'Raised questions regarding healthcare programs, government responsibilities, and health sector management to improve accountability and service quality.', 'जवाफदेहिता र सेवा गुणस्तर सुधारका लागि स्वास्थ्य कार्यक्रम, सरकारी जिम्मेवारी र स्वास्थ्य क्षेत्र व्यवस्थापनसम्बन्धी प्रश्न उठाइयो।', 'Health Governance', 'स्वास्थ्य शासन', 2024, 'https://hr.parliament.gov.np/en/video/21282'],
  ['National Trauma Policy Advocacy', 'राष्ट्रिय आघात नीति वकालत', 'Continued advocacy for strengthening Nepal’s emergency healthcare system through improved trauma care policies, better emergency response mechanisms, and accessible healthcare services.', 'सुधारिएको आघात उपचार नीति, प्रभावकारी आपतकालीन प्रतिक्रिया संयन्त्र र पहुँचयोग्य स्वास्थ्य सेवामार्फत नेपालको आपतकालीन स्वास्थ्य प्रणाली सुदृढ गर्न निरन्तर वकालत।', 'Healthcare Reform', 'स्वास्थ्य सुधार', 2026, 'https://english.ratopati.com/story/63620', 'Ratopati News'],
  ['Continuing Representation of Lalitpur Constituency No. 3', 'ललितपुर निर्वाचन क्षेत्र नं. ३ को निरन्तर प्रतिनिधित्व', 'Continued representing Lalitpur Constituency No. 3 in the Federal Parliament, focusing on citizen voices, constituency development, public concerns, and effective representation.', 'नागरिकको आवाज, निर्वाचन क्षेत्र विकास, सार्वजनिक सरोकार र प्रभावकारी प्रतिनिधित्वमा केन्द्रित हुँदै संघीय संसदमा ललितपुर निर्वाचन क्षेत्र नं. ३ को निरन्तर प्रतिनिधित्व।', 'Parliamentary Representation', 'संसदीय प्रतिनिधित्व', 2025, 'https://english.nepalnews.com/s/politics/toshima-karki-wins-lalitpur-3-with-43906-votes/', 'Nepal News']
].map(([titleEn, titleNe, descriptionEn, descriptionNe, categoryEn, categoryNe, year, sourceUrl, sourceName], index) => ({
  _id: `local-activity-${index + 1}`,
  title: { en: titleEn, ne: titleNe },
  description: { en: descriptionEn, ne: descriptionNe },
  category: { en: categoryEn, ne: categoryNe },
  tenure: index < 7 ? 'first' : 'second',
  date: new Date(`${year}-01-01`).toISOString(),
  sourceUrl,
  sourceName: sourceName || 'Federal Parliament Video',
  sourceType: index < 7 ? 'video' : 'news'
}));

export default function Parliament() {
  const { t, lang } = useLanguage();
  const isNepali = lang === 'np';
  
  // State
  const [activeTenure, setActiveTenure] = useState('first');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Fetch activities and hero
  useEffect(() => {
    fetchActivities();
  }, [activeTenure, searchQuery, selectedDate, page]);

  useEffect(() => {
    axios.get(`${API_BASE}/parliament`)
      .then(res => {
        if (res.data?.cloudinaryImages?.heroImage) {
          setHeroImage(res.data.cloudinaryImages.heroImage);
        }
      })
      .catch(err => console.error('Failed to fetch parliament settings', err));
  }, []);

  const getFilteredFallbackActivities = () => FALLBACK_ACTIVITIES.filter((activity) => {
    const matchesTenure = activity.tenure === activeTenure;
    const matchesSearch = !searchQuery || [activity.title.en, activity.title.ne, activity.description.en, activity.description.ne]
      .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesYear = !selectedDate || new Date(activity.date).getFullYear() === Number(selectedDate);

    return matchesTenure && matchesSearch && matchesYear;
  });
  
  const fetchActivities = async () => {
    try {
      setLoading(true);
      
      const params = {
        tenure: activeTenure,
        limit: 6,
        page: page,
        sort: '-date'
      };
      
      if (searchQuery) params.search = searchQuery;
      if (selectedDate) {
        params.year = Number(selectedDate);
      }
      
      const response = await axios.get(`${API_BASE}/parliament/activities`, { params });
      
      const apiActivities = response.data.data || [];
      if (apiActivities.length === 0) {
        const fallbackActivities = getFilteredFallbackActivities();
        const start = (page - 1) * 6;
        setActivities(fallbackActivities.slice(start, start + 6));
        setTotalPages(Math.max(1, Math.ceil(fallbackActivities.length / 6)));
      } else {
        setActivities(apiActivities);
        setTotalPages(response.data.pages || 1);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching activities:', err);
      const filteredActivities = getFilteredFallbackActivities();
      const start = (page - 1) * 6;

      setActivities(filteredActivities.slice(start, start + 6));
      setTotalPages(Math.max(1, Math.ceil(filteredActivities.length / 6)));
      setError(null);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle tenure change
  const handleTenureChange = (tenure) => {
    setActiveTenure(tenure);
    setPage(1);
    setSearchQuery('');
    setSelectedDate('');
  };
  
  // Handle filter changes
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const container = document.querySelector('.parliament-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <Helmet>
        <title>
          {!isNepali
            ? 'Parliament - Dr. Toshima Karki | Member of Parliament Lalitpur-3'
            : 'संसद - डा. तोशिमा कार्की | सांसद ललितपुर-३'
          }
        </title>
        <meta 
          name="description" 
          content={!isNepali
            ? 'Explore Dr. Toshima Karki\'s parliamentary work, speeches, debates, and policy initiatives as Member of Parliament representing Lalitpur Constituency No. 3. Evidence-based policymaking, healthcare reform, and citizen-centered governance.'
            : 'ललितपुर निर्वाचन क्षेत्र नं. ३ को प्रतिनिधित्व गर्ने सांसद डा. तोशिमा कार्कीको संसदीय कार्य, भाषण, बहस र नीति पहलहरू अन्वेषण गर्नुहोस्। प्रमाणमा आधारित नीति निर्माण, स्वास्थ्य सुधार र नागरिक केन्द्रित शासन।'
          }
        />
        <meta 
          name="keywords" 
          content={!isNepali
            ? 'Dr. Toshima Karki, Parliament Nepal, Member of Parliament, Lalitpur-3, Parliamentary Speeches, Healthcare Policy, Political Leadership, Nepal Congress, Legislative Work'
            : 'डा. तोशिमा कार्की, नेपाल संसद, सांसद, ललितपुर-३, संसदीय भाषण, स्वास्थ्य नीति, राजनीतिक नेतृत्व, नेपाली कांग्रेस, विधायी कार्य'
          }
        />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta 
          property="og:title" 
          content={!isNepali
            ? 'Parliament - Dr. Toshima Karki'
            : 'संसद - डा. तोशिमा कार्की'
          }
        />
        <meta 
          property="og:description" 
          content={!isNepali
            ? 'Parliamentary work, speeches, and policy initiatives of Dr. Toshima Karki, Member of Parliament representing Lalitpur Constituency No. 3.'
            : 'ललितपुर निर्वाचन क्षेत्र नं. ३ को प्रतिनिधित्व गर्ने सांसद डा. तोशिमा कार्कीको संसदीय कार्य, भाषण र नीति पहलहरू।'
          }
        />
        <meta property="og:image" content={PARLIAMENT_OG_IMAGE} />
        <meta property="og:url" content={`https://toshimakarki.gov.np${isNepali ? '/ne' : ''}/parliament`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta 
          name="twitter:title" 
          content={!isNepali
            ? 'Parliament - Dr. Toshima Karki'
            : 'संसद - डा. तोशिमा कार्की'
          }
        />
        <meta 
          name="twitter:description" 
          content={!isNepali
            ? 'Explore parliamentary work and legislative initiatives.'
            : 'संसदीय कार्य र विधायी पहलहरू अन्वेषण गर्नुहोस्।'
          }
        />
        <meta name="twitter:image" content={PARLIAMENT_OG_IMAGE} />
        
        {/* Canonical & Alternate */}
        <link rel="canonical" href={`https://toshimakarki.gov.np${isNepali ? '/ne' : ''}/parliament`} />
        <link rel="alternate" hrefLang="en" href="https://toshimakarki.gov.np/parliament" />
        <link rel="alternate" hrefLang="ne" href="https://toshimakarki.gov.np/ne/parliament" />
        <link rel="alternate" hrefLang="x-default" href="https://toshimakarki.gov.np/parliament" />
      </Helmet>
      
      <Navbar />
      <main className="page-fade-in parliament-page">
        <ParliamentHero heroUrl={heroImage} />
        
        <div className="parliament-container">
          <ParliamentJourney 
            activeTenure={activeTenure}
            onTenureChange={handleTenureChange}
          />
          
          <ParliamentFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            activeTenure={activeTenure}
          />
          
          <ParliamentActivities
            activities={activities}
            loading={loading}
            error={error}
            activeTenure={activeTenure}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
