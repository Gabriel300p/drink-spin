import prisma from "@/libs/prisma";
import { Card } from "@prisma/client";

export async function GET() {
  // Procurando cards no banco de dados
  const cards = await prisma.card.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      points: true,
      typeCreation: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return new Response(JSON.stringify(cards));
}

export async function POST(request: Request) {
  const cards: Card = await request.json();
  // Cria um novo card no banco de dados
  const createCards = await prisma.card.create({
    data: {
      title: cards.title,
      description: cards.description,
      points: cards.points,
      typeCreation: "user",
    },
  });
  return new Response(JSON.stringify(createCards));
}
