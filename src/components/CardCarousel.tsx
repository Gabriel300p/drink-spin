"use client";

import { useState } from "react";
import Card, { CardProps } from "./Card";
import ViewedCardsList from "./ViewedCardsList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";
import Modal from "./Modal";

interface CardCarouselProps {
  cards: CardProps[];
}

const CardCarousel = ({ cards }: CardCarouselProps) => {
  const [viewedCards, setViewedCards] = useState<CardProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [randomCard, setRandomCard] = useState<CardProps>();

  const handleRandomCardClick = () => {
    // Verifica se ainda há cards não vistos
    if (viewedCards.length < cards.length) {
      const unviewedCards = cards.filter(
        (card) =>
          !viewedCards.some((viewedCard) => viewedCard.title === card.title)
      );
      const randomIndex = Math.floor(Math.random() * unviewedCards.length);
      setRandomCard({ ...unviewedCards[randomIndex], id: randomIndex });
      setIsModalOpen(true);
      setViewedCards([...viewedCards, unviewedCards[randomIndex]]);
      setActiveIndex(randomIndex);
    }
  };

  const handleResetClick = () => {
    setViewedCards([]);
    setActiveIndex(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <Card
            title={randomCard?.title || ""}
            description={randomCard?.description || ""}
            id={randomCard?.id || 1}
          />
        </Modal>
      )}
      <div className="overflow-hidden">
        {viewedCards.length === cards.length ? (
          <p className="text-center">All cards have been viewed.</p>
        ) : (
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {cards.map((card, index) => {
              const isViewed = viewedCards.some(
                (viewedCard) => viewedCard.title === card.title
              );
              if (isViewed) {
                return null;
              }
              return (
                <SwiperSlide
                  key={`${card.id}${isViewed}`}
                  className="bg-red-500 shadow-md p-4 flex items-center justify-center rounded-2xl h-80 w-40"
                >
                  <Card {...card} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
          onClick={
            viewedCards.length < cards.length
              ? handleRandomCardClick
              : undefined
          }
          disabled={viewedCards.length === cards.length}
        >
          Choose random card
        </button>
        <button
          className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none"
          onClick={handleResetClick}
        >
          Reset
        </button>
        {viewedCards.length > 0 && (
          <ViewedCardsList viewedCards={viewedCards} />
        )}
      </div>
    </div>
  );
};

export default CardCarousel;
