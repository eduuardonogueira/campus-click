import Link from 'next/link';
import styles from './page.module.css';

export default function CadastroPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Campus Click</h1>
        <p className={styles.subtitle}>Cadastre suas credenciais para acessar o sistema</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome">Nome Completo:</label>
            <input type="text" id="nome" placeholder="Digite seu nome" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Digite seu email" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" placeholder="Digite sua senha" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input type="password" id="confirmarSenha" placeholder="Digite sua senha" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="perfil">Selecione Seu Perfil:</label>
            <select id="perfil">
              <option value="discente">Discente</option>
              <option value="docente">Docente</option>
              <option value="administrativo">Administrativo</option>
            </select>
          </div>
          
          <button type="submit" className={styles.submitButton}>Cadastrar</button>
        </form>

        <p className={styles.navigationLink}>
          Já tem uma conta? <Link href="/">Entrar</Link>
        </p>
      </div>
    </div>
  );
}