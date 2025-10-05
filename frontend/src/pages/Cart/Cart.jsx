import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import crossIcon from "../../assets/cross_icon.png";

export const deliveryFee = 2;

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    getTotalQuantity,
  } = useContext(StoreContext);

  const totalQuantity = getTotalQuantity();
  const subtotal = getTotalCartAmount();
  const delivery = subtotal > 0 ? deliveryFee : 0;
  const total = subtotal + delivery;
  const navigate = useNavigate();

  // Only items in cart
  const itemsInCart = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div className="cart">
      <div className="cart-items">
        {/* Cart Heading */}
        <div className="cart-items-title cart-heading">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <br />
        <hr />

        {/* Empty cart */}
        {totalQuantity === 0 ? (
          <div className="empty-cart">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty cart"
              className="empty-cart-img"
            />
            <p className="empty-cart-text">Your cart is empty!</p>
          </div>
        ) : (
          itemsInCart.map((item, index) => (
            <React.Fragment key={item._id}>
              <div className="cart-items-title cart-items-item">
                {/* Image */}
                <p>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                </p>

                {/* Name */}
                <p>{item.name}</p>

                {/* Price */}
                <p>₹{item.price}</p>

                {/* Quantity controls */}
                <p className="cart-qty-controls">
                  <button
                    className="cart-qty-btn cart-qty-btn-minus"
                    onClick={() => removeFromCart(item._id)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="cart-qty-value">{cartItems[item._id]}</span>
                  <button
                    className="cart-qty-btn cart-qty-btn-plus"
                    onClick={() => addToCart(item._id)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </p>

                {/* Item total */}
                <p className="cart-item-total">
                  ₹{item.price * cartItems[item._id]}
                </p>

              </div>
              <hr key={`hr-${item._id}-${index}`} />
            </React.Fragment>
          ))
        )}
      </div>

      {/* Cart Bottom */}
      <div className="cart-bottom">
        {/* Totals */}
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{delivery}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b className="cart-total-amount">₹{total}</b>
            </div>
          </div>
          <button
            disabled={subtotal === 0}
            onClick={() => navigate("/order")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code */}
        <div className="cart-promocode">
          <form className="cart-promocode-form" onSubmit={e => { e.preventDefault(); alert('Promo code applied!'); }}>
            <label htmlFor="promoCode" className="cart-promocode-label">Have a promocode?</label>
            <div className="cart-promocode-input">
              <input id="promoCode" type="text" placeholder="Enter promo code" className="cart-promocode-field" />
              <button type="submit" className="cart-promocode-btn">Apply</button>
            </div>
            <p className="cart-promocode-hint">Get discounts and offers by applying your code.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
