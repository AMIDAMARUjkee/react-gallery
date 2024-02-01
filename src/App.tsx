import { useEffect, useRef, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import leftArrow from './imgs/left-arrow.svg';
import rightArrow from './imgs/right-arrow.svg';
import { Navigation } from 'swiper/modules';

interface Breed {
  weight: {
    imperial: number;
    metric: number;
  };
  id: string;
  name: string;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
}

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}

function App() {
  const [data, setData] = useState<Cat[]>([]);

  const swiperRef = useRef<SwiperType>();

  console.log(swiperRef);
  console.log(swiperRef.current);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get(
          `https://api.thecatapi.com/v1/images/search?limit=15&has_breeds=1&api_key=live_koLZrN6xQSKJwHg4RJjZf2ctFSeSJFICsNUCoWgM2iHuT4m8hQeWxgZPGARYjPhs`,
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCats();
  }, []);

  return (
    <main className="main">
      <div className="main-gallery">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="swiper-button-prev arrow arrow-prev">
          <img src={leftArrow} className="arrow-left" alt="" />
        </button>
        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          className="cat mySwipper">
          {data.map((item) => (
            <SwiperSlide className="cat-slider" key={item.id}>
              <div className="cat-image">
                <img src={item.url} />
              </div>
              <div className="cat-info">
                <h1 className="cat-info-title">{item.breeds[0].name}</h1>
                <h2 className="cat-info-origin">{item.breeds[0].origin}</h2>
                <p className="cat-info-description">{item.breeds[0].description}</p>
                <div className="cat-info-wiki">
                  <p>Checkout more info about cat</p>
                  <a className="cat-info-link" href={item.breeds[0].wikipedia_url} target="_blank">
                    <img
                      className="cat-info-wiki-logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a6/W_mark.svg"
                    />
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="swiper-button-next arrow arrow-next">
          <img className="arrow-right" src={rightArrow} />
        </button>
      </div>
    </main>
  );
}

export default App;
