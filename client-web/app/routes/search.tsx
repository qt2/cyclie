import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { ReactNode } from "react";
import {
  IoAdd,
  IoAddCircleOutline,
  IoArrowBack,
  IoBusiness,
  IoFolderOpen,
  IoSearch,
} from "react-icons/io5";

type PropertyData = {
  title: string;
  address: string;
  rent: number;
  layout?: string;
  area: number;
  age: number;
  access: string;
  distance: number;
  image_urls: string[];
  atmos_green_visible: boolean;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL("http://localhost:8000/search");
  url.search = new URL(request.url).search;

  const res = await fetch(url);
  return json<PropertyData[]>(await res.json());
}

export default function Find() {
  const results = useLoaderData<typeof loader>();

  return (
    <div className="min-h-dvh bg-base-200">
      <header className="py-8">
        <div className="container flex items-center">
          <Link to="/find" className="btn rounded-full bg-base-100">
            <IoArrowBack className="text-xl" /> 条件を変更
          </Link>
          <div className="grow"></div>
          <a className="btn rounded-full bg-base-100">
            <IoFolderOpen className="text-xl" /> 希望リスト
          </a>
        </div>
      </header>
      <main className="py-8">
        <div className="container">
          <h1 className="text-4xl font-semibold">検索結果</h1>
          {results.map((data, i) => (
            <PropertyCard key={data.title + i} data={data} />
          ))}
        </div>
      </main>
    </div>
  );
}

export function PropertyCard({ data }: { data: PropertyData }) {
  return (
    <div className="mt-8 px-6 py-4 rounded bg-base-100">
      <div className="flex">
        <h2 className="grow text-xl font-bold">{data.title}</h2>
        <div className="btn btn-sm btn-outline btn-primary">
          <IoAddCircleOutline className="text-xl" /> 希望リストに追加
        </div>
      </div>
      <p>
        {data.rent}万円 | {data.area} m<sup>2</sup> | 築{data.age}年 |{" "}
        {data.access} | {data.atmos_green_visible && "緑あり "}
      </p>
      <div className="mt-4 flex flex-nowrap overflow-x-auto gap-3">
        {data.image_urls.map((url) => (
          <div>
            <div className="w-36 h-36 flex justify-center items-center rounded bg-base-200">
              {/* <IoBusiness className="text-xl text-primary-content" /> */}
              <img src={url} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
