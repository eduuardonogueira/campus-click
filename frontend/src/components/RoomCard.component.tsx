import Image from 'next/image';
import styles from './SalaCard/SalaCard.module.css';
import { 
  FaMapMarkerAlt, 
  FaUsers, 
  FaTv, 
  FaChalkboardTeacher, 
  FaWifi, 
  FaVideo 
} from 'react-icons/fa';
import { Amenity, IRoom } from '@/types/room';


interface IRoomCardProps {
  sala: IRoom;
}

// Mapeia o nome da amenidade para o componente de ícone correspondente
const amenityIcons: Record<Amenity, React.ReactNode> = {
  'Projetor': <FaTv />,
  'Quadro': <FaChalkboardTeacher />,
  'Wifi': <FaWifi />,
  'Vídeo Conferência': <FaVideo />,
};

export function RoomCard({ sala }: IRoomCardProps) {
  const statusClass = {
    'Disponível': styles.disponivel,
    'Ocupado': styles.ocupado,
    'Manutenção': styles.manutencao,
  }[sala.status];

  const buttonInfo = {
    'Disponível': { text: 'Reservar Sala', disabled: false },
    'Ocupado': { text: 'Reservada', disabled: true },
    'Manutenção': { text: 'Em manutenção', disabled: true },
  }[sala.status];

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={sala.imageUrl} alt={`Foto da ${sala.name}`} layout="fill" objectFit="cover" />
        <span className={`${styles.statusBadge} ${statusClass}`}>{sala.status}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{sala.name}</h3>
        
        <div className={styles.infoRow}>
          <FaMapMarkerAlt className={styles.infoIcon} />
          <p>{sala.location}</p>
        </div>
        <div className={styles.infoRow}>
          <FaUsers className={styles.infoIcon} />
          <p>{sala.capacity} Pessoas</p>
        </div>
        
        <p className={styles.description}>{sala.description}</p>
        
        <div className={styles.amenities}>
          {sala.amenities.map(amenity => (
            <span key={amenity} className={styles.amenityTag}>
              {amenityIcons[amenity]}
              {amenity}
            </span>
          ))}
        </div>

        <button 
          className={styles.actionButton} 
          disabled={buttonInfo.disabled}
        >
          {buttonInfo.text}
        </button>
      </div>
    </div>
  );
}