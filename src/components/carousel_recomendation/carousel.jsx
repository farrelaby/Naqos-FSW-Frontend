// import React from 'react';
import { useState, useEffect } from 'react';
import Card from './card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import Dropdown from '../../assets/Carousel6_dropdown.svg';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './style.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = () => {
  // const showDrop = (event) => {
  //   event.preventDefault();
  //   const tag = event.currentTarget.id + 'Item';
  //   console.log(event.currentTarget.id);
  //   const tagged = document.getElementById(tag);
  //   tagged.classList.contains('hidden')
  //     ? tagged.classList.remove('hidden')
  //     : tagged.classList.add('hidden');
  // };

  // const changePlace = (event, target) => {
  //   event.preventDefault();
  //   // const tag = event.currentTarget.id;
  //   setPlace(event.target.id);
  //   const tagged = document.getElementById(place);
  //   const taggedText = tagged.innerText;
  //   const targeted = document.getElementById(target);
  //   targeted.innerText = taggedText;
  //   document.getElementById('dropItem').classList.add('hidden');
  // };

  const [place, setPlace] = useState('Bekasi');
  const [isClosed, setIsClosed] = useState(true);

  const changePlace = (event) => {
    setPlace(event.target.id);
    toggle();
  };

  const toggle = () => setIsClosed(!isClosed);

  const kosResponse = useQuery({
    queryKey: ['kos'],
    queryFn: async () =>
      await axios.get(
        `https://be-naqos.up.railway.app/api/public/by-city-2/${place}?page=1&size=10&orderBy=id&orderType=desc`,
      ),
  });

  useEffect(() => {
    kosResponse.refetch();
  }, [place]);

  if (kosResponse?.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='space-y-12 p-4 py-12 font-montserrat bg-[#FAFAFA]'>
      <div className='relative'>
        <div className='flex space-x-3 items-center mb'>
          <h1 className='ml-2 lg:ml-0 text-lg lg:text-4xl font-bold  text-start '>
            Rekomendasi Kos Bulanan di
          </h1>
          <div className='bg-[#FFBA2C] flex items-center px-1 lg:px-5 py-2 lg:py-4 rounded-full space-x-2'>
            <div className='font-montserrat font-bold text-xs lg:text-xl' id='location'>
              {place}
            </div>
            <button id='drop' onClick={toggle}>
              <img src={Dropdown} />
            </button>
          </div>
          <div
            className={
              isClosed
                ? 'bg-white absolute z-40 left-[8rem] lg:left-[29rem] mt-[23rem] lg:mt-[30rem] font-montserrat font-bold text-center drop-shadow-md text-sm hidden'
                : 'bg-white absolute z-40 left-[8rem] lg:left-[29rem] mt-[23rem] lg:mt-[30rem] font-montserrat font-bold text-center drop-shadow-md text-sm'
            }
            id='dropItem'
          >
            <div
              className='px-20 lg:px-28 py-2 lg:py-3 hover:bg-[#FFDEAA] hover:cursor-pointer'
              onClick={(event) => changePlace(event, 'location')}
              id='Jakarta'
            >
              Jakarta
            </div>
            <div
              className='px-20 lg:px-28 py-2 lg:py-3 hover:bg-[#FFDEAA] hover:cursor-pointer'
              onClick={(event) => changePlace(event, 'location')}
              id='Bandung'
            >
              Bandung
            </div>
            <div
              className='px-20 lg:px-28 py-2 lg:py-3 hover:bg-[#FFDEAA] hover:cursor-pointer'
              onClick={(event) => changePlace(event, 'location')}
              id='Surabaya'
            >
              Surabaya
            </div>
            <div
              className='px-20 lg:px-28 py-2 lg:py-3 hover:bg-[#FFDEAA] hover:cursor-pointer'
              onClick={(event) => changePlace(event, 'location')}
              id='Bekasi'
            >
              Bekasi
            </div>
            <div
              className='px-20 lg:px-28 py-2 lg:py-3 hover:bg-[#FFDEAA] hover:cursor-pointer'
              onClick={(event) => changePlace(event, 'location')}
              id='Tanggerang'
            >
              Tanggerang
            </div>
            <div
              className='px-20 lg:px-28 py-2 lg:py-3 hover:bg-[#FFDEAA] hover:cursor-pointer'
              onClick={(event) => changePlace(event, 'location')}
              id='Depok'
            >
              Depok
            </div>
            <div
              className='px-20 lg:px-28 py-2 lg:py-3 hover:bg-[#FFDEAA] hover:cursor-pointer'
              onClick={(event) => changePlace(event, 'location')}
              id='Semarang'
            >
              Semarang
            </div>
            <div
              className='px-20 lg:px-28 py-2 lg:py-3 hover:bg-[#FFDEAA] hover:cursor-pointer'
              onClick={(event) => changePlace(event, 'location')}
              id='Bogor'
            >
              Bogor
            </div>
          </div>
        </div>
      </div>
      <Swiper
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {kosResponse?.data?.data.data.map((entry) => {
          return (
            <SwiperSlide key={entry.id}>
              <Link to={`/kos/${entry.id}/${entry.rooms[0]?.id}`}>
                <Card
                  name={entry.name}
                  pictureUrl={entry.imageKosts[0].url}
                  type={entry.kostType.slice(4)}
                  rate={0}
                  details={`${entry.address}, ${entry.district}, ${entry.subdistrict}, ${entry.city.city}, ${entry.city.province.province} (${entry.postalCode})`}
                  location={entry.city.city}
                  price={entry.rooms[0]?.pricePerMonthly ?? 10}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
