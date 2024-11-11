import './footer.css'
import prevImage from './prev.png'
import nextImage from './next.png'

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-item">
                <img src={prevImage} width="14" height="14" alt="Previatura" />
                <p>Previatura</p>
            </div>
            <div className="footer-item">
                <img src={nextImage} width="14" height="14" alt="Continuidad" />
                <p>Continuidad</p>
            </div>
        </div>
    );
}