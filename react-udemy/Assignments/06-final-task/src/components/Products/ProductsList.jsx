import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";

export default function ProductsList() {
  const products = useSelector((state) => state.product.products);

  if (products.length === 0) {
    return <h2 className="products-list__fallback">Found no products</h2>;
  }

  return products.map((product) => {
    if (product.quantity > 0)
      return <ProductItem key={product.id} product={product} />;
  });
}
