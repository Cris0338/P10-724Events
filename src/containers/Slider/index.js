import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';

import './style.scss';

const Slider = () => {
  const { data } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedData, setSortedData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Trier les données en fonction de la date et vérifier la disponibilité
  useEffect(() => {
    if (data?.focus && data.focus.length > 0) {
      const sortedFocusEvents = [...data.focus].sort((b, a) => new Date(a.date) - new Date(b.date));
      setSortedData(sortedFocusEvents);
      setIsDataLoaded(true);
    }
  }, [data?.focus]);

  // Timer changement de slide.
  useEffect(() => {
    if (isDataLoaded) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedData.length);
      }, 5000);
      
      // Reset timer.
      return () => clearTimeout(timer);
    }
    // Set undefined pour eviter erreurs.
    return undefined;
  }, [currentIndex, isDataLoaded, sortedData.length]);
  

  return (
    <div className="SlideCardList">
      {isDataLoaded && sortedData.map((event, index) => (
        <div
          key={event.date} // Utilisation de la date comme key
          className={`SlideCard SlideCard--${currentIndex === index ? 'display' : 'hide'}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      {isDataLoaded && (
        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {sortedData.map((event, index) => (
              <input
                key={event.date} // Utilisation de la date comme key
                type="radio"
                name="radio-button"
                checked={currentIndex === index}
                onChange={() => setCurrentIndex(index)}
                readOnly
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
