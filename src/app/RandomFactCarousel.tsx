import { ExternalLink } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { getRandomFact } from "~/server/actions/randomFacts";

export async function RandomFactCarousel() {
  const facts = await getRandomFact(5);

  return (
    <Carousel opts={{ loop: true }} className="w-[70%] max-w-lg">
      <CarouselContent>
        {facts.map((fact, i) => (
          <CarouselItem key={fact.code + "fact" + i} className="h-[250px]">
            <div className="h-[250px] p-1">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col justify-center p-2 text-center md:p-4">
                  <Link href={`/compare?nations=${fact.code}`}>
                    <h4 className="inline-flex items-center gap-1 text-xl font-bold hover:underline">
                      {fact.name}
                      <ExternalLink
                        color="black"
                        className="inline h-5 w-5"
                      />{" "}
                    </h4>
                  </Link>
                  <p className="mt-2">{fact.fact}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
