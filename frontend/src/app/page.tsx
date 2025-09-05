import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Campus Click</h1>
        <p className={styles.subtitle}>Acesse o sistema com suas credenciais</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Digite seu email" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" placeholder="Digite sua senha" />
          </div>
          
          <Link href="/salas" className={styles.submitButton}>
            Entrar
          </Link>
        </form>

        <p className={styles.navigationLink}>
          Não tem uma conta? <Link href="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}