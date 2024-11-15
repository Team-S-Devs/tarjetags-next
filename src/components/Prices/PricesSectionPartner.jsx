
import CardPrice from "./CardPrice";
import "../../assets/styles/Prices/PricesSection.css";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const PricesSectionPartner= () => {

    return(
    <div className="price-container">
        <h2 className="tittle-section">DESCUBRE NUESTRAS OPCIONES DE SERVICIO PARA NUESTROS SOCIOS</h2>
        <div className="subtitle-container">
            <h4 className="sub-tittle-section">Todos los planes de socios incluyen los beneficios del plan Premium</h4>
            <MdOutlineWorkspacePremium className="icon-premium" />
        </div>
        <div className="cards-container">
            <CardPrice idPlan={4}/>
            <CardPrice idPlan={5}/>
            <CardPrice idPlan={6}/>
        </div>
    </div>
    );
}

export default PricesSectionPartner;