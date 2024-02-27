import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { ReactNode, useState } from "react";
import {
  IoAdd,
  IoAddCircleOutline,
  IoArrowBack,
  IoBusiness,
  IoCheckmark,
  IoFolderOpen,
  IoSearch,
} from "react-icons/io5";

export type PropertyData = {
  id: number;
  title: string;
  address: string;
  rent: number;
  layout?: string;
  area: number;
  age: number;
  access: string;
  distance: number;
  image_urls: string[];
  atmos_peekable: boolean;
  atmos_green_visible: boolean;
  atmos_wall_patterned: boolean;
  is_wished: boolean;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL("http://server-recommend:8000/search");
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
          <Link to="/wish_list" className="btn rounded-full bg-base-100">
            <IoFolderOpen className="text-xl" /> 希望リスト
          </Link>
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
  const fetcher = useFetcher();
  const [isWished, setIsWished] = useState(data.is_wished);

  return (
    <div className="mt-8 px-6 py-4 rounded bg-base-100">
      <div className="flex">
        <h2 className="grow text-xl font-bold">{data.title}</h2>
        {isWished ? (
          <fetcher.Form
            method="delete"
            action={`/wish_list/${data.id}`}
            onSubmit={() => setIsWished(false)}
          >
            <button className="btn btn-sm btn-primary">
              <IoCheckmark className="text-xl" /> 追加済み
            </button>
          </fetcher.Form>
        ) : (
          <fetcher.Form
            method="post"
            action={`/wish_list/${data.id}`}
            onSubmit={() => setIsWished(true)}
          >
            <button
              type="submit"
              className="btn btn-sm btn-outline btn-primary"
            >
              <IoAddCircleOutline className="text-xl" /> 希望リストに追加
            </button>
          </fetcher.Form>
        )}
      </div>
      <p>
        {data.rent}万円 | {data.area} m<sup>2</sup> | 築{data.age}年 |{" "}
        {data.access}
      </p>
      <div className="mt-4 flex flex-nowrap overflow-x-auto gap-3">
        {data.image_urls.map((url, i) => (
          <div key={i}>
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
