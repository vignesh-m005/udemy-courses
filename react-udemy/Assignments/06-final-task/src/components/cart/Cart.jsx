import { useSelector } from "react-redux";
import CartItem from "./CartItem";

export default function Cart() {
  const user = 2;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userCartItems = cartItems.filter((cart) => cart.user === user);
  const productAvailable = userCartItems.length > 0;
  console.log(userCartItems);
  console.log(productAvailable);
  let userCart;
  if (userCartItems.length === 1) {
    userCart = userCartItems[0];
  }
  console.log(userCart);
  return (
    <>
      {!productAvailable && <h2 className="empty">No Product added to Cart</h2>}
      {productAvailable && (
        <ul>
          {userCart.products.map((product) => {
            return (
              <CartItem
                key={product.productId}
                quantity={product.quantity}
                productId={product.productId}
                user={user}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
