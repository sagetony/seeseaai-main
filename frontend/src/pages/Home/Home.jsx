import Cta from '../../components/CTA/CTA';
import Dataset from './components/Dataset';
import Hero from './components/Hero';
import Vision from './components/Vision';

const Home = () => {
  return (
    <div>
      <div>
        <Hero />
        <Vision />
        <Dataset />
        <Cta />
      </div>
    </div>
  );
};

export default Home;
