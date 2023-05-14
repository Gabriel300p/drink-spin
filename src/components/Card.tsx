import "swiper/css";
import "swiper/css/effect-cards";

export interface CardProps {
  id: number;
  title: string;
  description: string;
}

const Card = ({ id, title = "Default Title", description = "" }: CardProps) => {
  return (
    <div className="">
      <h2 className="text-lg font-medium mb-2 text-gray-600">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
