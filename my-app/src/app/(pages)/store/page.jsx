"use client";

import styles from "@/app/page.module.css";
import Link from "next/link";

import { useEffect, useState } from "react";

import AddToCartButton from "@/app/Components/AddToCartButton";
import { useAuth } from "@/app/Components/AuthContex";

export default function StorePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");

      if (!res.ok) {
        throw new Error('Failed to fetch product catalog data');
      }
      
      const data = await res.json();

      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
    fetchProducts();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>RevoShop - Product Catalog</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '2rem' 
      }}>
        
        {products.map((product) => (
          <Link className={styles.card}
            key={product.id}
            href={`/store/${product.id}`}
          >
            <div className={styles.card1}>
              <img className={styles.img}
                src={product.image} 
                alt={product.title}
              />
            </div>

            <div className={styles.card2}>
              <h3>{product.title}</h3>
              <p>{product.category}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>

            {user?.role === 'admin' ? (
              <button disabled>Manage Item</button>
            ) : (
              <AddToCartButton product={product} />
            )}
            
          </Link>
        ))}

      </div>
    </div>
  );
}