import SalaCard, { Sala } from '../../components/SalaCard';
import styles from './page.module.css';
import { FaSearch, FaFilter } from 'react-icons/fa';

const mockSalas: Sala[] = [
  { id: 1, name: 'SALA 101', location: 'Pavilhão, 1 Andar', capacity: 30, status: 'Disponível', amenities: ['Projetor', 'Quadro', 'Wifi', 'Vídeo Conferência'], imageUrl: 'https://images.unsplash.com/photo-1590487988256-5582f9a7c3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', description: 'Sala Excelente para aulas e apresentações de times, com diversos equipamentos e bastante confortável' },
  { id: 2, name: 'Laboratório A', location: 'Pavilhão, 1 Andar', capacity: 30, status: 'Ocupado', amenities: ['Projetor', 'Quadro', 'Wifi'], imageUrl: 'https://images.unsplash.com/photo-1590487988256-5582f9a7c3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', description: 'Sala Excelente para aulas e apresentações de times, com diversos equipamentos' },
  { id: 3, name: 'SALA 102', location: 'Pavilhão, 1 Andar', capacity: 30, status: 'Disponível', amenities: ['Projetor', 'Quadro', 'Wifi'], imageUrl: 'https://images.unsplash.com/photo-1590487988256-5582f9a7c3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', description: 'Sala Excelente para aulas e apresentações de times, com diversos equipamentos e bastante confortável' },
  { id: 4, name: 'Laboratório B', location: 'Pavilhão, 1 Andar', capacity: 30, status: 'Manutenção', amenities: ['Vídeo Conferência'], imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4b248a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', description: 'Sala Excelente para aulas e apresentações de times' },
  { id: 5, name: 'Laboratório C', location: 'Pavilhão, 1 Andar', capacity: 30, status: 'Manutenção', amenities: ['Projetor', 'Wifi', 'Vídeo Conferência'], imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4b248a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', description: 'Sala Excelente para aulas e apresentações de times, com diversos equipamentos' },
  { id: 6, name: 'Laboratório D', location: 'Pavilhão, 1 Andar', capacity: 30, status: 'Manutenção', amenities: ['Quadro'], imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4b248a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', description: 'Sala Excelente para aulas e apresentações de times, com diversos equipamentos e bastante confortável' },
];

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
          <SalaCard key={sala.id} sala={sala} />
        ))}
      </div>
    </main>
  );
}