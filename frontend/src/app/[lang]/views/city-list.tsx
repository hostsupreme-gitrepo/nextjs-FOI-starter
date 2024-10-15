import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface City {
  id: number;
  attributes: {
    Name: string;
    State: string;
    slug: string;
    Photo:{
      data:{
        attributes:{
          url:string;
        }}
    };
    fois: {
      data: [
        {
          attributes: {
            NationsID: string;
          }
        }
      ]

    }
  };
}

export default function CityList({
  data: cities,
  children,
}: {
  data: City[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => {
          const imageUrl = getStrapiMedia(
            city.attributes.Photo?.data?.attributes.url || 'http://localhost:1337/uploads/revised_noi_logo2_942d6c26ae.png'
          );

          return (
            <Link
              className="max-w-sm mx-auto group transition duration-500 ease-in-out hover:shadow-gray-900 hover:transform hover:scale-105 focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
            href={`cities/${city.attributes.slug}`}
            >
              {imageUrl && (
                <Image
                  alt="presentation"
                  width="240"
                  height="240"
                  className="object-cover w-full h-44 "
                  src={imageUrl}
                />
              )}
              <div className="p-6 space-y-2 relative">
                <h3 className="text-2xl font-semibold ">
                  {`${city.attributes.Name}, ${city.attributes.State}`}
                </h3>
                <span className="text-xs dark:text-gray-400">
                  {'Placehoder-1 '}
                </span>
                <div className="flex justify-between items-center">
                  <span className="text-xs dark:text-gray-400">
                    {'Placeholder-2'}
                  </span>
                </div>
                <p className="py-4">{city.attributes.fois?.data.length||0} FOI authorized</p>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
