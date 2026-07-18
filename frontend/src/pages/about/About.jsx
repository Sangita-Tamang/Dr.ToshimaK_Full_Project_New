import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect } from 'react';
import { useCachedApi } from '../../hooks/useCachedApi';
import OptimizedImage from '../../components/common/OptimizedImage';
import './About.css';

export default function About() {
  const { t } = useLanguage();
  const { data: apiData } = useCachedApi('/about');
  const cloudImg = apiData?.cloudinaryImages || {};
  const heroImage = cloudImg.heroImage || '';
  const storyImage = cloudImg.storyImage || cloudImg.profileImage || '';
  const quoteBgImage = cloudImg.quoteBgImage || '';
  const lookingAheadImage = cloudImg.lookingAheadImage || '';

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-show');
        }
      });
    }, { threshold: 0.25 });

    document.querySelectorAll('.animate-hidden').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const atAGlance = [
    { icon: 'fas fa-stethoscope', title: t('Medical Professional', 'चिकित्सा पेशेवर'), desc: t('MBBS doctor dedicated to improving healthcare for all citizens of Nepal.', 'नेपालका सबै नागरिकको स्वास्थ्य सुधारमा समर्पित एमबीबीएस चिकित्सक।') },
    { icon: 'fas fa-users', title: t('Community Advocate', 'सामुदायिक अधिवक्ता'), desc: t('Worked in rural and underprivileged areas for health and social development.', 'स्वास्थ्य र सामाजिक विकासका लागि ग्रामीण र विपन्न क्षेत्रमा काम गरेको।') },
    { icon: 'fas fa-landmark', title: t('Member of Parliament', 'संसद् सदस्य'), desc: t('Elected to represent the voice of the people and drive meaningful change.', 'जनताको आवाजको प्रतिनिधित्व गर्न र अर्थपूर्ण परिवर्तन ल्याउन निर्वाचित।') },
    { icon: 'fas fa-book-open', title: t('Lifelong Learner', 'जीवनभर सिक्ने'), desc: t('Believes in continuous learning, listening and growing with the people.', 'जनतासँग निरन्तर सिक्ने, सुन्ने र बढ्नेमा विश्वास।') },
  ];

  const drivesMe = [
    { icon: 'fas fa-users', title: t('People First', 'जनता पहिलो'), desc: t('Every decision guided by the needs and hopes of the people.', 'प्रत्येक निर्णय जनताको आवश्यकता र आशाबाट निर्देशित।') },
    { icon: 'fas fa-heartbeat', title: t('Healthcare for All', 'सबैका लागि स्वास्थ्य'), desc: t('Working towards accessible, affordable quality healthcare for every Nepali.', 'हरेक नेपालीका लागि सुलभ, किफायती गुणस्तरीय स्वास्थ्य सेवाका लागि।') },
    { icon: 'fas fa-balance-scale', title: t('Equity & Inclusion', 'समानता र समावेश'), desc: t('Promoting equality, social justice and opportunities for all.', 'सबैका लागि समानता, सामाजिक न्याय र अवसरको प्रवर्द्धन।') },
    { icon: 'fas fa-shield-alt', title: t('Integrity', 'इमानदारिता'), desc: t('Committed to transparency, accountability and ethical leadership.', 'पारदर्शिता, जवाफदेहिता र नैतिक नेतृत्वप्रति प्रतिबद्ध।') },
    { icon: 'fas fa-seedling', title: t('Sustainable Future', 'दिगो भविष्य'), desc: t('Building a better Nepal for present and future generations.', 'वर्तमान र भावी पुस्ताका लागि राम्रो नेपाल निर्माण।') },
  ];

  const journey = [
    { icon: 'fas fa-graduation-cap', title: t('Education in Medicine', 'चिकित्सा शिक्षा'), desc: t('Completed medical education and dedicated herself to healthcare and community service.', 'चिकित्सा शिक्षा पूरा गरी स्वास्थ्य सेवा र सामुदायिक सेवामा समर्पित।') },
    { icon: 'fas fa-hospital', title: t('Healthcare & Community Work', 'स्वास्थ्य र सामुदायिक कार्य'), desc: t('Worked in hospitals and rural areas, leading health awareness programs and supporting underserved communities.', 'अस्पताल र ग्रामीण क्षेत्रमा काम गरी स्वास्थ्य सचेतना कार्यक्रम र वंचित समुदायलाई समर्थन।') },
    { icon: 'fas fa-landmark', title: t('Elected to Parliament', 'संसदमा निर्वाचित'), desc: t('Elected as a Member of Parliament to represent the voice of the people and drive meaningful change.', 'जनताको आवाजको प्रतिनिधित्व गर्न र अर्थपूर्ण परिवर्तनको लागि संसद सदस्यमा निर्वाचित।') },
    { icon: 'fas fa-bullhorn', title: t('Policy Advocacy & Leadership', 'नीति वकालत र नेतृत्व'), desc: t('Actively working on policies for health, women empowerment, youth opportunities and inclusive development.', 'स्वास्थ्य, महिला सशक्तिकरण, युवा अवसर र समावेशी विकासका नीतिहरूमा सक्रिय।') },
    { icon: 'fas fa-flag', title: t('Continuing the Mission', 'मिसन जारी'), desc: t('Every day, I continue to work for a healthier, stronger and more inclusive Nepal.', 'हरेक दिन स्वस्थ, बलियो र अधिक समावेशी नेपालको लागि काम जारी।') },
  ];

  const focusAreas = [
    { icon: 'fas fa-heartbeat', title: t('Health for All', 'सबैका लागि स्वास्थ्य'), desc: t('Accessible and affordable healthcare for every citizen.', 'हरेक नागरिकको लागि सुलभ र किफायती स्वास्थ्य सेवा।') },
    { icon: 'fas fa-book', title: t('Education & Youth', 'शिक्षा र युवा'), desc: t('Better education and opportunities to empower the next generation.', 'अर्को पुस्तालाई सशक्त बनाउन राम्रो शिक्षा र अवसर।') },
    { icon: 'fas fa-female', title: t('Women Empowerment', 'महिला सशक्तिकरण'), desc: t('Promoting equality, safety and leadership for women in every field.', 'हरेक क्षेत्रमा महिलाका लागि समानता, सुरक्षा र नेतृत्वको प्रवर्द्धन।') },
    { icon: 'fas fa-balance-scale', title: t('Social Justice', 'सामाजिक न्याय'), desc: t('Ensuring equity, inclusion and opportunities for all communities.', 'सबै समुदायका लागि समानता, समावेश र अवसर सुनिश्चित।') },
    { icon: 'fas fa-leaf', title: t('Sustainable Development', 'दिगो विकास'), desc: t('Building a prosperous Nepal while protecting our environment and resources.', 'हाम्रो वातावरण र स्रोत जोगाउँदै समृद्ध नेपाल निर्माण।') },
  ];

  const stats = [
    { icon: 'fas fa-plus-circle', val: '500+', label: t('Healthcare Programs Supported', 'समर्थित स्वास्थ्य कार्यक्रम') },
    { icon: 'fas fa-map-marker-alt', val: '250+', label: t('Communities Reached', 'पुगेका समुदाय') },
    { icon: 'fas fa-file-alt', val: '50+', label: t('Policies & Initiatives Supported', 'समर्थित नीति र पहल') },
    { icon: 'fas fa-calendar-check', val: '10+', label: t('Years of Service & Dedication', 'सेवा र समर्पणका वर्ष') },
  ];

  const lookingAhead = [
    { icon: 'fas fa-chalkboard-teacher', label: t('Mentoring', 'सल्लाह र मार्गदर्शन') },
    { icon: 'fas fa-handshake', label: t('Community Engagement', 'सामुदायिक सहभागिता') },
    { icon: 'fas fa-venus', label: t('Women Leadership', 'महिला नेतृत्व') },
    { icon: 'fas fa-book-reader', label: t('Lifelong Learning', 'जीवनभर सिकाइ') },
    { icon: 'fas fa-globe-asia', label: t('Humanitarian Work', 'मानवीय कार्य') },
  ];

  return (
    <>
      <Navbar />
      <main className="page-fade-in about-page">

        {/* ── HERO ── */}
        <section className="about-hero">
          <div className="about-hero-bg">
            {heroImage && (
              <OptimizedImage
                src={heroImage}
                alt=""
                lazy={false}
                priority={true}
                objectFit="cover"
              />
            )}
          </div>
          <div className="about-hero-gradient"></div>
          <div className="container about-hero-container">
            <div className="about-hero-content animate-hidden fade-in-up">
              <span className="about-hero-tag">
                {t('ABOUT DR. TOSHIMA KARKI', 'डा. तोसिमा कार्कीको बारेमा')}
              </span>
              <h1 className="about-hero-title">
                {t('A Life Dedicated', 'जीवन समर्पित')}<br />
                {t('to People', 'जनताका लागि')}<br />
                {t('and Purpose', 'र उद्देश्यका लागि')}<span className="text-red">.</span>
              </h1>
              <p className="about-hero-sub">
                {t(
                  'A doctor by profession, a leader by responsibility, and a public servant driven by compassion, integrity, and service.',
                  'पेशाले चिकित्सक, जिम्मेवारीले नेता, र करुणा, ईमानदारी र सेवाद्वारा प्रेरित सार्वजनिक सेवक।'
                )}
              </p>
              <p className="about-hero-sig">— Dr. Toshima Karki</p>
            </div>
            <div></div> {/* Empty column for grid layout */}
          </div>
        </section>

        {/* ── MY STORY ── */}
        <section className="section-padding bg-light">
          <div className="container about-story-grid">
            <div className="about-story-text">
              <h2 className="section-title-line">{t('My Story', 'मेरो कथा')}</h2>
              <p>
                {t(
                  'I was born in a humble family that taught me the value of honesty, empathy, and hard work. From a young age, I was drawn to medicine and community service, inspired by the desire to reduce suffering and bring positive change.',
                  'म एक विनम्र परिवारमा जन्मिएँ जसले मलाई इमानदारिता, सहानुभूति र कडा परिश्रमको मूल्य सिकायो। सानैदेखि पीडा कम गर्ने र सकारात्मक परिवर्तन ल्याउने इच्छाले म चिकित्सा र सामुदायिक सेवातर्फ आकर्षित भएँ।'
                )}
              </p>
              <p>
                {t(
                  'Over the years, I have worked in hospitals, rural communities, and public health initiatives, witnessing both the challenges and the incredible strength of our people.',
                  'वर्षौंसम्म मैले अस्पताल, ग्रामीण समुदाय र सार्वजनिक स्वास्थ्य पहलहरूमा काम गरेँ, हाम्रा जनताका चुनौती र उल्लेखनीय शक्ति दुवै देखेँ।'
                )}
              </p>
              <p>
                {t(
                  'As a Member of Parliament, I strive to be a voice for the people — listening, understanding, and working together to create policies that bring real change in health, education, equality and opportunities.',
                  'संसद सदस्यका रूपमा म जनताको आवाज बन्न प्रयास गर्छु — सुन्दै, बुझ्दै र स्वास्थ्य, शिक्षा, समानता र अवसरमा वास्तविक परिवर्तन ल्याउने नीतिहरू सँगै बनाउँदै।'
                )}
              </p>
            </div>
            <div className="about-story-img">
              {storyImage && <OptimizedImage src={storyImage} alt="Dr. Toshima at work" lazy={true} objectFit="cover" />}
              <div className="about-story-badge">
                <i className="fas fa-award"></i>
                <span>{t('Member of Parliament', 'संसद सदस्य')}</span>
              </div>
            </div>
            <div className="about-at-a-glance">
              <h3>{t('At a Glance', 'एक नजरमा')}</h3>
              <div className="glance-list">
                {atAGlance.map((item, i) => (
                  <div key={i} className="glance-item">
                    <div className="glance-icon"><i className={item.icon}></i></div>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT DRIVES ME ── */}
        <section className="section-padding">
          <div className="container">
            <div className="section-header center">
              <h2>{t('What Drives Me', 'मलाई के प्रेरित गर्छ')}</h2>
              <div className="section-underline"></div>
            </div>
            <div className="drives-grid">
              {drivesMe.map((d, i) => (
                <div key={i} className="drives-card">
                  <div className="drives-icon"><i className={d.icon}></i></div>
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOURNEY + FOCUS AREAS ── */}
        <section className="section-padding bg-light">
          <div className="container about-journey-grid">
            <div>
              <h3 className="section-title-line">{t('My Journey in Public Service', 'सार्वजनिक सेवामा मेरो यात्रा')}</h3>
              <div className="journey-list">
                {journey.map((j, i) => (
                  <div key={i} className="journey-item">
                    <div className="journey-icon"><i className={j.icon}></i></div>
                    <div>
                      <strong>{j.title}</strong>
                      <p>{j.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="section-title-line">{t('Key Focus Areas', 'प्रमुख फोकस क्षेत्रहरू')}</h3>
              <div className="focus-list">
                {focusAreas.map((f, i) => (
                  <div key={i} className="focus-item">
                    <div className="focus-icon"><i className={f.icon}></i></div>
                    <div>
                      <strong>{f.title}</strong>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── IMPACT STATS ── */}
        <section className="section-padding">
          <div className="container">
            <div className="section-header center">
              <h2>{t('Our Impact So Far', 'अहिलेसम्मको हाम्रो प्रभाव')}</h2>
              <div className="section-underline"></div>
            </div>
            <div className="impact-grid">
              {stats.map((s, i) => (
                <div key={i} className="impact-card">
                  <div className="impact-icon"><i className={s.icon}></i></div>
                  <h3>{s.val}</h3>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUOTE BANNER ── */}
        <div className="about-quote-banner" style={quoteBgImage ? { backgroundImage: `url(${quoteBgImage})` } : {}}>
          <div className="about-quote-overlay"></div>
          <div className="container about-quote-inner">
            <i className="fas fa-quote-left about-quote-icon"></i>
            <blockquote>
              {t('Leadership is not about power.', 'नेतृत्व शक्तिको बारेमा होइन।')}
              <br />
              <span>{t('It is about purpose.', 'यो उद्देश्यको बारेमा हो।')}</span>
            </blockquote>
          </div>
        </div>

        {/* ── LOOKING AHEAD ── */}
        <section className="section-padding">
          <div className="container about-looking-grid">
            <div className="about-looking-text">
              <h3 className="section-title-line">{t('Looking Ahead', 'भविष्यतिर हेर्दै')}</h3>
              <p>
                {t(
                  'Whether mentoring young minds, supporting community initiatives, or simply being there for someone in need — my heart has always belonged to the people.',
                  'युवा मनहरूलाई मार्गदर्शन गर्दा, सामुदायिक पहललाई समर्थन गर्दा, वा आवश्यकतामा परेका कसैका लागि त्यहाँ हुँदा — मेरो मन सधैं जनतासँगै रहेको छ।'
                )}
              </p>
              <p style={{ fontWeight: 600, color: 'var(--secondary)' }}>
                {t(
                  "Together, let's build a healthier, stronger and more compassionate Nepal.",
                  'सँगै, एक स्वस्थ, बलियो र अधिक दयालु नेपाल बनाउँ।'
                )}
              </p>
              <div className="looking-tags">
                {lookingAhead.map((l, i) => (
                  <div key={i} className="looking-tag">
                    <i className={l.icon}></i>
                    <span>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-looking-img">
              {lookingAheadImage && <img src={lookingAheadImage} alt="Looking Ahead" loading="lazy" />}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
