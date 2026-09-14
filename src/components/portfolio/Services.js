import { useState, useEffect } from 'react';
import './Services.css';
import ServiceCard from './ServiceCard';
import API_BASE_URL from '../../config/api';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const url = `${API_BASE_URL}/api/services`;
      console.log('📡 Fetching services from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('📦 Services data:', data);

      if (data.success) {
        const mappedServices = data.data.map(service => ({
          id: service._id,
          title: service.title,
          description: service.description,
          icon: service.icon,  // String like "FaReact"
          order: service.order
        }));
        setServices(mappedServices);
      } else {
        setError('Failed to load services');
      }
    } catch (err) {
      console.error('❌ Error fetching services:', err);
      setError('Cannot connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className='services' id='services'>
        <h2>My Services</h2>
        <div className='services-container'>
          <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}>
            <div style={{
              display: 'inline-block',
              border: '2px solid goldenrod',
              padding: '20px 40px',
              borderRadius: '10px',
              background: 'rgba(218, 165, 32, 0.1)'
            }}>
              ⏳ Loading services...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className='services' id='services'>
        <h2>My Services</h2>
        <div className='services-container'>
          <div style={{ textAlign: 'center', color: '#ff6b6b', padding: '50px' }}>
            <div style={{
              border: '2px solid #ff6b6b',
              padding: '20px 40px',
              borderRadius: '10px',
              background: 'rgba(255, 107, 107, 0.1)'
            }}>
              ❌ {error}
              <br /><br />
              <button
                onClick={fetchServices}
                style={{
                  padding: '10px 20px',
                  background: 'goldenrod',
                  border: 'none',
                  borderRadius: '5px',
                  color: 'black',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No services state
  if (services.length === 0) {
    return (
      <section className='services' id='services'>
        <h2>My Services</h2>
        <div className='services-container'>
          <div style={{ textAlign: 'center', color: '#bbb', padding: '50px' }}>
            <div style={{
              border: '2px dashed goldenrod',
              padding: '30px',
              borderRadius: '10px',
              background: 'rgba(218, 165, 32, 0.05)'
            }}>
              📂 No services yet. Add your first service!
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Display services
  return (
    <section className='services' id='services'>
      <h2>My Services</h2>
      <div className='services-container'>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

export default Services;