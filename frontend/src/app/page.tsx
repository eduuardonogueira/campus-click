import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="formTitle">Campus Click</h1>
        <p className="formSubtitle">Acesse o sistema com suas credenciais</p>

        <form className="form">
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Digite seu email" />
          </div>

          <div className="inputGroup">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" placeholder="Digite sua senha" />
          </div>
          
          <button type="submit" className="submitButton">Entrar</button>
        </form>

        <p className="navigationLink">
          Não tem uma conta? <Link href="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}