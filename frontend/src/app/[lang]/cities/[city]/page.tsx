"use client"; 
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from '@/app/[lang]/utils/fetch-api';
import { usePathname } from 'next/navigation';
import Loader from "../../components/Loader";
import FoiList from '@/app/[lang]/views/foi-list';
import PageHeader from '@/app/[lang]/components/PageHeader';

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}


export default function Profile() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const city = usePathname().split('/')[3]

  const fetchData = useCallback(async (filter: string, start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/fois`;
      const urlParamsObject = {
          sort: { createdAt: 'asc' },
          filters: {
              city: {
                  slug: filter.toLowerCase(),
              },
          },
          populate: '*',
          pagination: {
              start: start,
              limit: limit,
          },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[] ) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);


  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(city,nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    
    fetchData(city,0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <PageHeader heading={city.replace('-', ' ').toUpperCase()} text={"City Of"} />
      <FoiList data={data}>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-xl rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
              onClick={loadMorePosts}
            >
              Load more ...
            </button>
          </div>
        )}
      </FoiList>
    </div>
  );
}
