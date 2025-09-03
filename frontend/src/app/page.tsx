// app/page.tsx
import React from 'react';

export default function CadastroPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5', // Um fundo claro para o corpo da página
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2em',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#333'
        }}>
          Campus Click
        </h1>
        <p style={{
          fontSize: '0.9em',
          color: '#666',
          marginBottom: '1.5rem'
        }}>
          Cadastre suas credenciais para acessar o sistema
        </p>

        <form>
          {/* Nome Completo */}
          <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <label htmlFor="nomeCompleto" style={{ display: 'block', fontSize: '0.9em', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>
              Nome Completo
            </label>
            <input
              type="text"
              id="nomeCompleto"
              placeholder="Digite seu nome"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1em',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.9em', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1em',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Senha */}
          <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <label htmlFor="senha" style={{ display: 'block', fontSize: '0.9em', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>
              Senha
            </label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1em',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Confirmar Senha */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label htmlFor="confirmarSenha" style={{ display: 'block', fontSize: '0.9em', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder="Digite a mesma senha"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1em',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Qual seu Perfil */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <p style={{ fontSize: '0.9em', fontWeight: 'bold', marginBottom: '0.8rem', color: '#555' }}>
              Qual seu Perfil:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr', // Duas colunas
              gap: '10px' // Espaçamento entre os botões
            }}>
              <button
                type="button"
                style={{
                  padding: '0.75rem 1.25rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: '#f5f5f5',
                  color: '#555',
                  fontSize: '0.9em',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, border-color 0.2s',
                  // Adicione um hover para feedback
                  // ':hover': { backgroundColor: '#eee', borderColor: '#bbb' }
                }}
              >
                Discente
              </button>
              <button
                type="button"
                style={{
                  padding: '0.75rem 1.25rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: '#f5f5f5',
                  color: '#555',
                  fontSize: '0.9em',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, border-color 0.2s',
                }}
              >
                Externo
              </button>
              <button
                type="button"
                style={{
                  padding: '0.75rem 1.25rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: '#f5f5f5',
                  color: '#555',
                  fontSize: '0.9em',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, border-color 0.2s',
                }}
              >
                Professor
              </button>
              <button
                type="button"
                style={{
                  padding: '0.75rem 1.25rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: '#f5f5f5',
                  color: '#555',
                  fontSize: '0.9em',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, border-color 0.2s',
                }}
              >
                TAE
              </button>
            </div>
          </div>

          {/* Botão Cadastrar */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#000',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1em',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1.5rem',
              transition: 'background-color 0.2s',
              // ':hover': { backgroundColor: '#333' }
            }}
          >
            Cadastrar
          </button>
        </form>

        {/* Link para Login */}
        <p style={{ fontSize: '0.9em', marginTop: '1.5rem', color: '#666' }}>
          Já tem uma conta?{' '}
          <a href="#" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}