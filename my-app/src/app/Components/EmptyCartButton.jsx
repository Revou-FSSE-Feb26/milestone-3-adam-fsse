"use client";
import styles from "@/app/page.module.css";

export default function EmptyCartButton({ onClear }) {
  return (
    <button className={styles.card3} onClick={onClear}>
      Empty Cart
    </button>
  );
}