"use client";

import styles from "@/app/page.module.css";

import { useEffect, useState, use} from "react";

import AddToCartButton from "@/app/Components/AddToCartButton";

export default function DetailPage({ params }) {
    const resolvedParams = use(params); 
    const productID = resolvedParams.id;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProducts = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${productID}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch product detail data for ID: ${productID}`);
        }
        
        const data = await res.json();

        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
      if (productID) {
        fetchProducts();
      }
    }, [productID]);
    
    if (loading) {
      return <div>Loading...</div>;
    }

  return (
    <div className={styles.card}>

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

            <AddToCartButton product={product} />

    </div>
  );
}