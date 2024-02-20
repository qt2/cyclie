import { Link, useFetcher } from "@remix-run/react";
import { ReactNode, useRef } from "react";
import {
  IoAdd,
  IoAddCircleOutline,
  IoArrowBack,
  IoBusiness,
  IoFolderOpen,
  IoSearch,
} from "react-icons/io5";

export default function Result() {
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
          <p className="mt-4 text-lg font-semibold">
            おめでとうございます！🎉
            希望リストを満たすマッチングが成立しました！
          </p>
          <PropertyCard />
          <div className="mt-8 text-right">
            <button
              className="btn btn-outline btn-primary rounded-full"
              onClick={() =>
                (document.getElementById("procedure-modal") as any).showModal()
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
        {/* <div className="btn btn-sm btn-outline btn-primary">
          <IoAddCircleOutline className="text-xl" /> 希望リストに追加
        </div> */}
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
