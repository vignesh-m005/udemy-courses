import { useSelector } from "react-redux";
import ProductItem from "./Products/ProductItem";

export default function Home() {
  const products = useSelector((state) => state.product.products);

  if (products.length === 0) {
    return <h2 className="products-list__fallback">Found no products</h2>;
  }
  let recentProducts;
  if (products.length <= 5) {
    recentProducts = products;
  } else {
    const tempProducts = [...products]
    tempProducts.sort((a, b) => b.addedTime - a.addedTime);
    recentProducts = tempProducts.slice(0, 5);
  }

  return recentProducts.map((product) => {
    return <ProductItem key={product.id} product={product} />;
  });
}
