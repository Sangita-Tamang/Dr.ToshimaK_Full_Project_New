import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

export default function Stats() {
  const { t, lang } = useLanguage();

  const DEFAULT_STATS = [
    { icon: 'fas fa-users', value: '1M+', labelEn: 'Lives Impacted', labelNp: 'प्रभावित जीवन' },
    { icon: 'fas fa-heartbeat', value: '500K+', labelEn: 'Patients Supported', labelNp: 'सहयोग प्राप्त बिरामी' },
    { icon: 'fas fa-file-medical-alt', value: '20+', labelEn: 'Health Policies', labelNp: 'स्वास्थ्य नीतिहरू' },
    { icon: 'fas fa-award', value: '15+', labelEn: 'Years of Service', labelNp: 'सेवाका वर्षहरू' },
    { icon: 'fas fa-map-marked-alt', value: t('Nationwide', 'देशव्यापी'), labelEn: 'Reach & Impact', labelNp: 'पहुँच र प्रभाव' },
  ];

  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    api.get('/home').then(data => {
      if (data?.data?.stats) {
        const s = data.data.stats;
        setStats([
          { icon: 'fas fa-users', value: s.livesImpacted, labelEn: 'Lives Impacted', labelNp: 'प्रभावित जीवन' },
          { icon: 'fas fa-heartbeat', value: s.patientsSupported, labelEn: 'Patients Supported', labelNp: 'सहयोग प्राप्त बिरामी' },
          { icon: 'fas fa-file-medical-alt', value: s.healthPolicies, labelEn: 'Health Policies', labelNp: 'स्वास्थ्य नीतिहरू' },
          { icon: 'fas fa-award', value: s.yearsOfService, labelEn: 'Years of Service', labelNp: 'सेवाका वर्षहरू' },
          { icon: 'fas fa-map-marked-alt', value: s.reachImpact === 'Nationwide' ? t('Nationwide', 'देशव्यापी') : s.reachImpact, labelEn: 'Reach & Impact', labelNp: 'पहुँच र प्रभाव' },
        ]);
      }
    }).catch(() => {});
  }, [lang]);

  const tt = (en, np) => lang === 'np' ? np : en;

  return (
    <section style={{ backgroundColor: 'var(--light-gray)', paddingBottom: 60 }}>
      <div className="container">
        <div className="stats-bar">
          {stats.map((stat, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-icon"><i className={stat.icon}></i></div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{tt(stat.labelEn, stat.labelNp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
