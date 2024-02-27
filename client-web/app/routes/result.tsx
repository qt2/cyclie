import { Link, json, useFetcher, useLoaderData } from "@remix-run/react";
import { ReactNode, useRef } from "react";
import {
  IoAdd,
  IoAddCircleOutline,
  IoArrowBack,
  IoBusiness,
  IoFolderOpen,
  IoSearch,
} from "react-icons/io5";
import { PropertyData } from "./search";

export async function loader() {
  const res = await fetch("http://server-recommend:8000/result");
  const data = await res.json();
  const result: PropertyData | null = data.result;
  return json({
    result,
  });
}

export default function Result() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-dvh bg-base-200">
      <header className="py-8">
        <div className="container flex items-center">
          <Link to="/" className="btn btn-circle bg-base-100">
            <IoArrowBack className="text-xl" />
          </Link>
          <div className="grow"></div>
          {/* <a className="btn rounded-full bg-base-100">
            <IoFolderOpen className="text-xl" /> 希望リスト
          </a> */}
        </div>
      </header>
      <main className="py-8">
        <div className="container">
          <h1 className="text-4xl font-semibold">結果確認</h1>
          {data.result ? (
            <>
              <p className="mt-4 text-lg font-semibold">
                おめでとうございます！🎉
                希望リストを満たすマッチングが成立しました！
              </p>
              <PropertyCard data={data.result} />
              <div className=" max-w-xs my-8 mx-auto p-4 border-2 border-base-300 rounded text-center bg-white">
                <h2 className="mb-2 font-semibold">今後の流れ</h2>
                <div className="p-2 flex gap-2">
                  <span className="w-4 text-green-500">✔</span>
                  <span>引っ越し先の物件の確定</span>
                </div>
                <div className="p-2 flex gap-2">
                  <span className="w-4 font-semibold text-blue-500">→</span>
                  <span>退去手続き</span>
                </div>
                <div className="p-2 flex gap-2">
                  <span className="w-4"></span>
                  <span>引っ越し先物件との契約</span>
                </div>
                <div className="p-2 flex gap-2">
                  <span className="w-4"></span>
                  <span>引っ越し業者の手配</span>
                </div>
                <div className="p-2 flex gap-2">
                  <span className="w-4"></span>
                  <span>水道や電気などの住所変更</span>
                </div>
              </div>
              <div className="mt-8 text-right">
                <button
                  className="btn btn-outline btn-primary rounded-full"
                  onClick={() =>
                    (
                      document.getElementById("procedure-modal") as any
                    ).showModal()
                  }
                >
                  手続きに進む
                </button>
              </div>
              <dialog id="procedure-modal" className="modal">
                <div className="modal-box">
                  <p>モックアップはここまでです。</p>
                  <p>ご覧いただきありがとうございました！😊</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>Close</button>
                </form>
              </dialog>
            </>
          ) : (
            <p className="mt-4">まだマッチングは確定していません。</p>
          )}
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
      </div>
      <p>
        {data.rent}万円 | {data.area} m<sup>2</sup> | 築{data.age}年 |{" "}
        {data.access} {data.atmos_peekable && "| peekable"}
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
