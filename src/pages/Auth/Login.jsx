import React, { useState } from 'react'; 
import { useLocation, useNavigate } from "react-router-dom";
import './Auth.css';

const Login = ({ onLogin, onSwitchToRegister }) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const from = location.state?.from?.pathname || null; 

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [alert, setAlert] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (alert) setAlert('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert('');

        if (!formData.email || !formData.password) {
            setAlert('Completá email y contraseña.');
            setIsLoading(false);
            return;
        }

        // Simular delay de red
        setTimeout(() => {
            try {
                const savedUsers = localStorage.getItem('geekCardsUsers');
                const users = savedUsers ? JSON.parse(savedUsers) : [];

                const user = users.find(u => u.email === formData.email && u.password === formData.password);

                if (user) {
                    console.log('[LOGIN SUCCESS]', user);
                    setAlert('¡Login exitoso! Redirigiendo...');
                    
                    // Guardar sesión
                    if (formData.remember) {
                        localStorage.setItem('geekCardsCurrentUser', JSON.stringify(user));
                    } else {
                        sessionStorage.setItem('geekCardsCurrentUser', JSON.stringify(user));
                    }

                    if (onLogin) onLogin(user);

                    setTimeout(() => {
                        if (from === '/checkout') {
                            navigate(from, { replace: true });
                        } else {
                            navigate('/', { replace: true });
                        }
                    }, 1500);

                } else {
                    setAlert('Email o contraseña incorrectos.');
                }

            } catch (error) {
                console.error('[LOGIN ERROR]', error);
                setAlert('Error al iniciar sesión. Intentá nuevamente.');
            } finally {
                setIsLoading(false);
            }
        }, 1000);
    };

    const handleForgotPassword = () => {
        alert('Linkear a /recuperar-contraseña');
    };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="hero-section">
                    <img src="/images/logo-hero.png" alt="Geek Card" className="hero-logo" />
                </div>

                <main className="auth-main">
                    <div id="alert" className={`alert ${alert ? 'show' : ''}`} role="alert">
                        {alert}
                    </div>

                    <form id="form-login" className="auth-form active" onSubmit={handleSubmit}>
                        <h1 className="auth-title">Bienvenido</h1>
                        
                        <div className="field">
                            <label htmlFor="login-email">Email</label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="field">
                            <label htmlFor="login-pass">Contraseña</label>
                            <input
                                id="login-pass"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                minLength="8"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="row">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                />
                                Recordarme
                            </label>
                            <button
                                type="button"
                                className="link"
                                onClick={handleForgotPassword}
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                        
                        <div className="button-row">
                            <button 
                                className="btn primary" 
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Iniciando sesión...' : 'Entrar'}
                            </button>
                            <div className="button-group">
                                <button
                                    className="btn secondary"
                                    type="button"
                                    onClick={() => navigate('/auth/register')}
                                    disabled={isLoading}
                                >
                                    Registrarse
                                </button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Login;
