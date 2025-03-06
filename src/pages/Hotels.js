import { useEffect, useState } from "react";
import { fetchHotels, bookHotel } from "../services/api";
import "./Hotels.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  
  console.log("userdata......",userId);
  useEffect(() => {
    fetchHotels()
      .then(res => setHotels(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to fetch hotels. Please try again later.");
      });
  }, []);

  const handleBooking = async (hotelId) => {
    try {
      await bookHotel({ 
        userId, 
        hotelId, 
        checkInDate: new Date(), 
        checkOutDate: new Date(), 
        totalGuests: 2
      });
      
      alert("Booking Successful! Your hotel has been booked.");
    } catch (error) {
      console.error(error);
      alert("Booking failed. Please try again.");
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="hotels-container">
      <h1 className="page-title">Available Hotels</h1>
      <div className="hotels-list">
        {hotels.length === 0 ? (
          <div className="loading-message">Loading hotels...</div>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <h2 className="hotel-name">{hotel.name}</h2>
              <p className="hotel-location">{hotel.location}</p>
              <button 
                className="book-button"
                onClick={() => handleBooking(hotel.id)}
              >
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Hotels;