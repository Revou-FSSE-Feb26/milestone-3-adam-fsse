"use client";

import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState, use} from "react";

import AddToCartButton from "@/app/Components/AddToCartButton";
import { useAuth } from "@/app/Components/AuthContex";

export default function DetailPage({ params }) {
    const router = useRouter();
    const { user } = useAuth();
    
    const resolvedParams = use(params); 
    const productID = resolvedParams.id;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ title: "", price: "" });

    useEffect(() => {
      const fetchProducts = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${productID}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch product detail data for ID: ${productID}`);
        }
        
        const data = await res.json();

        setProduct(data);
        setEditForm({ title: data.title, price: data.price });

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
      if (productID) {
        fetchProducts();
      }
    }, [productID]);

// this is for editing the product by admin roles
    // Handle updating product information (PUT)
    const handleUpdateProduct = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`/api/products/${productID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editForm.title,
            price: parseFloat(editForm.price),
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update item");

        setProduct({ ...product, ...data }); // Sync changes locally
        setIsEditing(false); // Close edit view
        alert("Product updated successfully!");
      } catch (err) {
        alert(err.message);
      }
    };

    // Handle deleting product completely (DELETE)
    const handleDeleteProduct = async () => {
      if (!confirm("Are you sure you want to delete this item?")) return;
      
      try {
        const res = await fetch(`/api/products/${productID}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to delete item");

        alert("Product removed completely!");
        router.push("/store"); // Redirect back to store catalog grid
      } catch (err) {
        alert(err.message);
      }
    };
// this is for editing the product by admin roles ^^^

    
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
              {/* If admin clicks Modify, swap standard text for an inline input form */}
              {isEditing ? (
                <form onSubmit={handleUpdateProduct}>
                  <input 
                    type="text" 
                    value={editForm.title} 
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} 
                    required 
                  />
                  <input 
                    type="number" 
                    step="0.01" 
                    value={editForm.price} 
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} 
                    required 
                  />
                  <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <h3>{product.title}</h3>
                  <p>{product.category}</p>
                  <p>${product.price.toFixed(2)}</p>
                </>
              )}
            </div>

            {/* SWITCH: If user is admin, provide Modify & Delete controls. Otherwise, display Add to Cart button. */}
            {user?.role === 'admin' ? (
              <div>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)}>Modify Item</button>
                )}
                <button onClick={handleDeleteProduct}>Delete Item</button>
              </div>
            ) : (
              <AddToCartButton product={product} />
            )}

    </div>
  );
}