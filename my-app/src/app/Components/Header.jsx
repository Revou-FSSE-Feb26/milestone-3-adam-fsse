"use client";
import Link from 'next/link';

import { useCart } from "@/app/Components/CartContex";
import { useAuth } from "@/app/Components/AuthContex";

export default function Header({title}) {

  const { cart } = useCart();
  const cartCount = cart.length;

  const { user, logout } = useAuth();

  return (
    <header style={{ padding: '1rem', background: '#ff0000', borderBottom: '1px solid #ddd' }}>
        <Link href="/">
            <h1 style={{ margin: 0, color: '#fff', height: '1rem' }}>{title}</h1>
        </Link>
        <nav style={{ display: 'flex', gap: '1.5rem', justifyContent: 'right' }}>
            {/* <Link href="/">Home</Link> */}
            {user ? (
              <Link href="/dashboard" style={{ color: '#fff' }}>Dashboard</Link>
            ) : (
              <Link href="/" style={{ color: '#fff' }}>Home</Link>
            )}
            
            <Link href="/store">Store</Link>

            <Link href="/cart">
            {cartCount > 0 && <span> ({cartCount})</span>} Cart
            </Link>
            {/* <Link href="/login">Login</Link> */}
            {/* Conditional Authentication Button */}
            
            {user ? (
              <button 
                onClick={logout} 
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem', padding: 0 }}
              >
                Logout ({user.firstName})
              </button>
            ) : (
              <Link href="/login" style={{ color: '#fff' }}>Login</Link>
            )}
        </nav>
    </header>
  );
}