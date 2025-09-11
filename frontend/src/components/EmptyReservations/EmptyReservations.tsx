import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './EmptyState.module.css';
import { CalendarX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  buttonText: string;
  buttonHref: string;
}

export function EmptyState({ title, message, buttonText, buttonHref }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <CalendarX size={48} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      <Link href={buttonHref}>
        <button className={styles.actionButton}>{buttonText}</button>
      </Link>
    </div>
  );
}