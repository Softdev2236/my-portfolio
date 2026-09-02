const ServiceCard = ({ service }) => {
    return (
        <div className="service-card">

            <div className="service-icon">
                {service.icon}
            </div>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

        </div>
    );
};

export default ServiceCard;