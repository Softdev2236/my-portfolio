import './Services.css';
import ServiceCard from './ServiceCard';
import ServicesData from './ServicesData';
function Services()
{
    
    return(
        <section className='services' id='services'>
            <h2>My Services</h2>
            <div className='services-container'>
                {ServicesData.map((service) => (
        <ServiceCard
            key={service.id}
            service={service}
        />
    ))}
           
            </div>
        </section>
    )
}
export default Services;