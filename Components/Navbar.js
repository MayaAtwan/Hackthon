// components/Navbar.js
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <span>Sign Up</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
