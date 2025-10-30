import Header from "../components/shared/Header/index.jsx";
import Footer from "../components/shared/Footer/index.jsx";
import ProductList from "../components/shared/ProductList/index.jsx";

export default function Book() {
  return (
    <>
      <Header />
      <ProductList title="Semua Buku" showAddButton />   {/* tampil juga di Books */}
      <Footer />
    </>
  );
}
