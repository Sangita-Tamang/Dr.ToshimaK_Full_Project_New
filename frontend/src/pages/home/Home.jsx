import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Hero from '../../components/home/Hero';
import ExploreWork from '../../components/home/ExploreWork';
import CTA from '../../components/home/CTA';
import './Home.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="page-fade-in">
        <Hero />
        <ExploreWork />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
