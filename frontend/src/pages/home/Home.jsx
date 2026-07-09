import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Hero from '../../components/home/Hero';
import Stats from '../../components/home/Stats';
import ExploreWork from '../../components/home/ExploreWork';
import CTA from '../../components/home/CTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ExploreWork />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
