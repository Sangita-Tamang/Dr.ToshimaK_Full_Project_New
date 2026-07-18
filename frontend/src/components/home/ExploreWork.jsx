import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getCloudinaryUrl } from '../../services/cloudinaryService';
import OptimizedImage from '../common/OptimizedImage';


const img1 = getCloudinaryUrl('dr-tk/image1', { width: 800 });
const img11 = getCloudinaryUrl('dr-tk/image11', { width: 800 });
const img12 = getCloudinaryUrl('dr-tk/image12', { width: 800 });
const img3 = getCloudinaryUrl('dr-tk/image3', { width: 800 });

export default function ExploreWork() {
  const { t } = useLanguage();

  const WORK_CARDS = [
    {
      img: img1,
      icon: 'fas fa-stethoscope',
      path: '/health-contributions',
      title: t('Health Contributions', 'स्वास्थ्य क्षेत्रमा योगदान'),
      desc: t(
        'Working to improve healthcare access, strengthen health systems and build a healthier Nepal.',
        'स्वास्थ्य सेवामा पहुँच सुधार गर्न, स्वास्थ्य प्रणालीलाई बलियो बनाउन र स्वस्थ नेपालको निर्माण गर्न कार्य गर्दै।'
      ),
      link: t('Explore Work', 'कामको अन्वेषण')
    },
    {
      img: img11,
      icon: 'fas fa-landmark',
      path: '/parliament',
      title: t('Parliamentary Work', 'संसदीय गतिविधि'),
      desc: t(
        "Advocating for people's rights, strong policies and meaningful legislative change.",
        'जनताको अधिकार, सुदृढ नीति र अर्थपूर्ण विधायी परिवर्तनका लागि आवाज उठाउँदै।'
      ),
      link: t('Explore Work', 'कामको अन्वेषण')
    },
    {
      img: img3,
      icon: 'fas fa-route',
      path: '/about',
      title: t('Political Journey', 'राजनीतिक यात्रा'),
      desc: t(
        'Dedication, resilience, and vision for clean politics, good governance, and systemic change.',
        'स्वच्छ राजनीति, सुशासन र प्रणालीगत परिवर्तनका लागि समर्पण, लचिलोपन र दृष्टिकोण।'
      ),
      link: t('Explore Work', 'कामको अन्वेषण')
    },
    {
      img: img12,
      icon: 'fas fa-microphone',
      path: '/media',
      title: t('Speeches & Media', 'मन्तव्य र मिडिया'),
      desc: t(
        'Sharing ideas, participating in discussions and raising voices for national progress.',
        'विचार साझा गर्दै, छलफलमा भाग लिँदै र राष्ट्रिय प्रगतिको लागि आवाज उठाउँदै।'
      ),
      link: t('Explore Work', 'कामको अन्वेषण')
    },
  ];

  return (
    <section className="section-padding" id="explore-work">
      <div className="container">
        <div className="section-header center">
          <h2>{t('Explore My Work', 'मेरो कामको अन्वेषण')}</h2>
        </div>
        <div className="grid-explore">
          {WORK_CARDS.map((card) => (
            <div className="card" key={card.title} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card-img-container">
                <OptimizedImage src={card.img} alt={card.title} lazy={true} fill={true} />
              </div>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div className="card-icon" style={{ width: 48, height: 48, background: 'rgba(200,16,46,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: 20 }}>
                  <i className={card.icon}></i>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 12 }}>{card.title}</h3>
                <p style={{ flexGrow: 1, fontSize: '0.9rem', color: '#555', marginBottom: 20 }}>{card.desc}</p>
                <Link to={card.path} state={{ fromExploreWork: true }} className="card-link">{card.link} &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .grid-explore {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }
        @media (max-width: 768px) {
          .grid-explore {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
