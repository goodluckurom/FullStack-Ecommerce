import BestDeals from "../components/Route/BestDeals/BestDeals";
import Events from "../components/Events/Events";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts";
import Header from "../components/Layout/Header";
import Categories from "../components/Route/Categories/Categories";
import Hero from "../components/Route/Hero/Hero";
import Sponsored from "../components/Route/Sponsored/Sponsored";
import Footer from "../components/Route/Footer/Footer";
import styles from "../styles/styles";

const HomePage = () => {
  return (
    <div className={`${styles.section} w-[100%]`}>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
