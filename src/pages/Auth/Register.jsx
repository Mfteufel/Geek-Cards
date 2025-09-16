import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import './Auth.css';

const Register = ({ onRegister, onSwitchToLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    });
    const [alert, setAlert] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Base de datos simulada de usuarios
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('geekCardsUsers');
        return savedUsers ? JSON.parse(savedUsers) : [
            {
                id: 1,
                name: 'Usuario Demo',
                email: 'demo@geekcards.com',
                password: '12345678',
                createdAt: new Date().toISOString()
            }
        ];
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar alerta cuando el usuario empiece a escribir
        if (alert) setAlert('');
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert('');

        // Validaciones
        if (!formData.name || !formData.email || !formData.password || !formData.password_confirm) {
            setAlert('Completá todos los campos.');
            setIsLoading(false);
            return;
        }

        if (formData.name.length < 2) {
            setAlert('El nombre debe tener al menos 2 caracteres.');
            setIsLoading(false);
            return;
        }

        if (!validateEmail(formData.email)) {
            setAlert('Ingresá un email válido.');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setAlert('La contraseña debe tener al menos 8 caracteres.');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.password_confirm) {
            setAlert('Las contraseñas no coinciden.');
            setIsLoading(false);
            return;
        }

        // Verificar si el email ya existe
        const existingUser = users.find(user => user.email === formData.email);
        if (existingUser) {
            setAlert('Ya existe una cuenta con este email.');
            setIsLoading(false);
            return;
        }

        // Simular delay de red
        setTimeout(() => {
            try {
                // Crear nuevo usuario
                const newUser = {
                    id: Date.now(),
                    name: formData.name,
                    email: formData.email,
                    password: formData.password, // En producción esto estaría hasheado
                    createdAt: new Date().toISOString()
                };

                // Agregar usuario a la base de datos simulada
                const updatedUsers = [...users, newUser];
                setUsers(updatedUsers);
                localStorage.setItem('geekCardsUsers', JSON.stringify(updatedUsers));

                console.log('[REGISTER SUCCESS]', newUser);
                setAlert('¡Registro exitoso! Redirigiendo...');
                
                // Llamar callback si existe
                if (onRegister) {
                    onRegister(newUser);
                }

                // Redirigir después de 2 segundos
                setTimeout(() => {
                    navigate('/auth/login');
                }, 2000);

            } catch (error) {
                console.error('[REGISTER ERROR]', error);
                setAlert('Error al crear la cuenta. Intentá nuevamente.');
            } finally {
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="register-container">
            <Header/>
            <section className="hero" aria-label="Geek Card">
                <img src="/images/logo-hero.png" alt="Geek Card" />
            </section>

            <main className="content" role="main" aria-labelledby="title">
                <section id="alert" className={`alert ${alert ? 'show' : ''}`} role="alert">
                    {alert}
                </section>
                <h1 id="title" className="title">Crear cuenta</h1>
                <form id="form-register" className="register-form" onSubmit={handleSubmit} autoComplete="on" noValidate>
                    <div className="field">
                        <label htmlFor="reg-name">Nombre</label>
                        <input 
                            id="reg-name" 
                            name="name" 
                            type="text" 
                            placeholder="Tu nombre" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="reg-email">Email</label>
                        <input 
                            id="reg-email" 
                            name="email" 
                            type="email" 
                            placeholder="tu@email.com" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="reg-pass">Contraseña</label>
                        <input 
                            id="reg-pass" 
                            name="password" 
                            type="password" 
                            placeholder="mín. 8 caracteres" 
                            minLength="8" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="reg-pass2">Repetir contraseña</label>
                        <input 
                            id="reg-pass2" 
                            name="password_confirm" 
                            type="password" 
                            placeholder="repetí la contraseña" 
                            minLength="8" 
                            value={formData.password_confirm}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="button-row">
                        <button 
                            className="btn primary" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                        </button>
                        <button 
                            className="btn secondary" 
                            type="button" 
                            onClick={() => navigate('/auth/login')}
                            disabled={isLoading}
                        >
                            ¿Ya tenés cuenta? Iniciá sesión
                        </button>
                    </div>
                </form>
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>© Geek Card. Todos los derechos reservados.</p>
                    <nav className="footer-links">
                        <a className="footer-link" href="#">Términos</a>
                        <a className="footer-link" href="#">Privacidad</a>
                        <a className="footer-link" href="#">Ayuda</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default Register;
