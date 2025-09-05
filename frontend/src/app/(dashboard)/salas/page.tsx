import { RoomCard } from '@/components/index';
import styles from './page.module.css';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { mockSalas } from './mock';


export default function SalasPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Salas</h1>
          <p className={styles.pageSubtitle}>Faça a reserva da sua sala</p>
        </div>
      </header>
      
      <div className={styles.filtersContainer}>
        <div className={styles.inputIconWrapper}>
          <FaSearch className={styles.inputIcon} />
          <input type="text" placeholder="Encontre e reserve salas ou laboratórios" className={styles.searchInput} />
        </div>
        <div className={styles.inputIconWrapper}>
          <FaFilter className={styles.inputIcon} />
          <select className={styles.filterDropdown}>
            <option>Filtros</option>
          </select>
        </div>
      </div>

      <div className={styles.statusTabs}>
        <button className={`${styles.statusTab} ${styles.disponivel}`}>2 Disponível</button>
        <button className={`${styles.statusTab} ${styles.ocupado}`}>1 Ocupadas</button>
        <button className={`${styles.statusTab} ${styles.manutencao}`}>3 Manutenção</button>
      </div>

      <div className={styles.grid}>
        {mockSalas.map(sala => (
          <RoomCard key={sala.id} sala={sala} />
        ))}
      </div>
    </main>
  );
}