"use client";

import styles from "@/app/page.module.css";
import { useCart } from "@/app/Components/CartContex"; 

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart(); 

  function handleAdd(event) {
    event.preventDefault();
    event.stopPropagation();

    addToCart(product); 
    
    alert(`${product.title} added to cart`);
  }

  return (
    <button className={styles.card3} onClick={handleAdd}>
      Add to Cart
    </button>
  );
}