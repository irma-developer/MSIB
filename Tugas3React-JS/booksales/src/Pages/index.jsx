import Header from "../components/shared/Header/index.jsx";
import Footer from "../components/shared/Footer/index.jsx";
import Hero from "../components/shared/Hero/index.jsx";
import ProductList from "../components/shared/ProductList/index.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProductList title="Best Seller" showAddButton />  {/* tampil di Home */}
      <Footer />
    </>
  );
}
