import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


const Carousels = ({products, ProductCardComponent}) => {
  return (
    <Carousel
      opts={{
        align: "start",
        slideToScroll: 4,
        slidesToScroll: 1,
        startIndex: 0,
        loop: true,
      }}
      className="w-full max-w-6xl mx-auto  flex justify-center items-center"
    >
      <CarouselContent className="m-4">
        {products.map((item, index) => (
          <CarouselItem
            key={`${item.id}-${index}`}
            className="pl-2 basis-1/4 max-sm:basis-full max-sm:p-4"
          >
            <div className="flex justify-center">
              <Card className="w-full max-w-xs max-sm:max-w-full">
                <CardContent className="p-0">
                  <ProductCardComponent items={item} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext className="max-sm:hidden" />
    </Carousel>
  );
};

export default Carousels;
