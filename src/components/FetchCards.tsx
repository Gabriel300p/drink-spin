"use client";

import { useQuery } from "react-query";
import CardCarousel from "@/components/CardCarousel";

const fetchCards = async () => {
  const response = await fetch("/api/cards");
  if (!response.ok) {
    throw new Error("Failed to fetch cards.");
  }
  return response.json();
};

const FetchCards = () => {
  const { isLoading, error, data } = useQuery("cards", fetchCards);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch cards.</div>;
  }

  return (
    <div className="container mx-auto mt-4">
      <CardCarousel cards={data} />
    </div>
  );
};

export default FetchCards;
