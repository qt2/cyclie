import { Link, useFetcher } from "@remix-run/react";
import { ReactNode } from "react";
import {
  IoAdd,
  IoAddCircleOutline,
  IoArrowBack,
  IoBusiness,
  IoFolderOpen,
  IoSearch,
} from "react-icons/io5";

export default function Find() {
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
          <h1 className="text-4xl font-semibold">本郷 の検索結果</h1>
          {[1, 2, 3].map((v) => (
            <PropertyCard />
          ))}
        </div>
      </main>
    </div>
  );
}

export function PropertyCard() {
  return (
    <div className="mt-8 px-6 py-4 rounded bg-base-100">
      <div className="flex">
        <h2 className="grow text-xl font-bold">SEハイツ</h2>
        <div className="btn btn-sm btn-outline btn-primary">
          <IoAddCircleOutline className="text-xl" /> 希望リストに追加
        </div>
      </div>
      <p>築5年 / 本郷三丁目 徒歩5分</p>
      <div className="mt-4 flex flex-nowrap overflow-x-auto gap-3">
        {[1, 2, 3, 4, 5, 6].map((v) => (
          <div>
            <div className="w-36 h-36 flex justify-center items-center rounded bg-base-200">
              <IoBusiness className="text-xl text-primary-content" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
