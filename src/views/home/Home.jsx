import styles from './Home.module.css';
import { NavLink } from 'react-router-dom';


const Home = () => {




    return (
        <div className={styles.homeContainer}>


            <header className={styles.header}>
                <h1 className={styles.title}>Calculadora de Precios y Presupuestos</h1>
                <p className={styles.subtitle}>
                    Usa esta herramienta para calcular los precios de venta de tus productos y crear presupuestos personalizados.
                </p>
                <button className={styles.ctaButton}>
                    Venta Local
                </button>
            </header>

            <main className={styles.mainContent}>
                <section className={styles.cardSection}>
                    <div className={styles.card}>
                        <h2>📦 Calculadora de Precios</h2>
                        <p>Calcula automáticamente los precios de venta de tus productos según el precio de compra y el margen de ganancia deseado.</p>
                        <NavLink to='/calc' className={styles.cardButton}>Ir a la Calculadora</NavLink>
                    </div>

                    <div className={styles.card}>
                        <h2>📋 Presupuestos Marelis</h2>
                        <p>Crea presupuestos rápidos y profesionales para tus clientes, con detalles precisos y listos para enviar.</p>
                        <NavLink to='/butget' className={styles.cardButton}>Ir a Presupuestos</NavLink>
                    </div>

                    <div className={styles.card}>
                        <h2>💵 Ventas Locales</h2>
                        <p>Espacio para las ventas locales, con descuento de stock, opcion para dejar una reseña de la venta, aplicar descuestos si el cliente lo merece porque es vacano.</p>
                        <NavLink to='/local-sale' className={styles.cardButton}>Ir a Ventas Locales</NavLink>
                    </div>

                    <div className={styles.card}>
                        <h2>📒 Gestion Producto</h2>
                        <p>Espacio para las ventas locales, con descuento de stock, opcion para dejar una reseña de la venta, aplicar descuestos si el cliente lo merece porque es vacano.</p>
                        <NavLink to='/prod-management' className={styles.cardButton}>Ir a Gestion Producto</NavLink>
                    </div>
                </section>

                <section className={styles.upcomingFeatures}>
                    <h2>🚀 Próximas Funciones</h2>
                    <ul>
                        <li>🔍 Reportes de ventas</li>
                        <li>📊 Análisis de márgenes de ganancia</li>
                        <li>⚙️ Personalización de tarifas e impuestos</li>
                    </ul>
                </section>
            </main>

            <footer className={styles.footer}>
                <p>© 2024 Marelis La Distri. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Home;
