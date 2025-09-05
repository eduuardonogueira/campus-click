import Link from 'next/link';
import styles from './Header.module.css';
import { FaCalendarAlt, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

interface HeaderProps {
  userName?: string;
  userRole?: string;
}

export default function Header({ 
  userName = "aluno.teste@discente.ufra.edu.br", 
  userRole = "Aluno",
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <FaCalendarAlt className={styles.logoIcon} />
        <Link href="/salas" className={styles.appName}>Campus Click</Link>
      </div>

      <div className={styles.profileSection}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.userRoleTag}>{userRole}</span>
        </div>
        <FaUserCircle className={styles.userAvatar} />
        <button className={styles.iconButton} aria-label="Configurações">
          <FaCog />
        </button>
        <button className={styles.iconButton} aria-label="Sair">
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
}