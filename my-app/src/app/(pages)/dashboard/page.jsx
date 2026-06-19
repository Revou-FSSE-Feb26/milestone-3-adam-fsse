import styles from "@/app/page.module.css";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  // NO MIDDLEWARE REQUIRED: Protect the route right here
  if (!sessionCookie) {
    redirect('/login');
  }

  const { user } = JSON.parse(sessionCookie.value);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img src={user.image} alt={user.username} className={styles.card2} />
        <h1 className={styles.title}>Welcome, {user.firstName}!</h1>
        
        <div className={styles.card2}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> <span >{user.role}</span></p>
        </div>
      </div>
    </div>
  );
}

// const styles = {
//   container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000000' },
//   card: { padding: '2.5rem', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', width: '100%', maxWidth: '400px', color: '#333' },
//   avatar: { width: '96px', height: '96px', borderRadius: '50%', marginBottom: '1rem', border: '3px solid #0070f3' },
//   welcome: { fontSize: '1.5rem', marginBottom: '1.5rem', color: '#000000' },
//   infoGroup: { textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '1rem' },
//   badge: { background: '#0070f3', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }
// };