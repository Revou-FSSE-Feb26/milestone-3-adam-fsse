"use client";

import styles from "@/app/page.module.css";
import Link from "next/link";

import { useCart } from "@/app/Components/CartContex";
import EmptyCartButton from "@/app/Components/EmptyCartButton";

export default function CartPage() {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.page}>
        <h1>RevoShop - Cart Page</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1>RevoShop - Cart Page</h1>
      <div>
        {cart.map((item, index) => (
          <div key={`${item.id}-${index}`} className={styles.card}>
            <div className={styles.card1}>
              <img src={item.image} alt={item.title} className={styles.img} />
            </div>
            <div className={styles.card2}>
              <h3>{item.title}</h3>
              <p>{item.category}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.page}>
      <EmptyCartButton onClear={clearCart} />

      <Link href="/checkout" className={styles.card3}>
              Proceed to Checkout      
      </Link>
      </div>
    </div>
  );
}