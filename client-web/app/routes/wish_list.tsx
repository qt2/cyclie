import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { ReactNode, useState } from "react";
import {
  IoAdd,
  IoAddCircleOutline,
  IoArrowBack,
  IoBusiness,
  IoFolderOpen,
  IoSearch,
  IoTrashBinOutline,
} from "react-icons/io5";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots2 } from "react-icons/rx";

type PropertyData = {
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
};

export async function loader() {
  const res = await fetch("http://server-recommend:8000/wish_list");
  return (await res.json()) as PropertyData[];
}

export async function action({ request }: ActionFunctionArgs) {
  const res = await fetch("http://server-recommend:8000/wish_list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(await request.json()),
  });

  return await res.json();
}

export default function WishList() {
  const results = useLoaderData<typeof loader>();
  const ids = results.map((d) => d.id);

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over == null || active.id === over.id) {
      return;
    }
    const oldIndex = ids.findIndex((id) => id === active.id);
    const newIndex = ids.findIndex((id) => id === over.id);

    fetcher.submit(
      { ids: arrayMove(ids, oldIndex, newIndex) },
      {
        action: "/wish_list",
        method: "POST",
        encType: "application/json",
      }
    );
  };

  const submit = async () => {
    if (
      !confirm(
        "希望リストに登録された物件にマッチした場合、マッチングを取り消すことはできません。この希望リストで確定しますか？（訂正期間内は修正できます）"
      )
    )
      return;

    await fetcher.submit(null, {
      action: "/submit",
      method: "POST",
    });

    alert("希望リストを提出しました！");

    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-dvh bg-base-200">
      <header className="py-8">
        <div className="container flex items-center">
          <Link to="/find" className="btn rounded-full bg-base-100">
            <IoArrowBack className="text-xl" /> ほかの物件を探す
          </Link>
        </div>
      </header>

      <main className="py-8">
        <div className="container">
          <h1 className="mb-2 text-4xl font-semibold">希望リスト</h1>

          {ids.length !== 0 ? (
            <>
              <p>希望リストに登録されている物件の一覧です。</p>
              <p>
                物件の希望順位を入れ替えるには、各物件の左上のハンドルをつかんで、ドラッグアンドドロップしてください。
              </p>
              <p className="mt-4">
                希望順位が確定したら、ページ下部の「確定」ボタンを押してください。
              </p>
              <DndContext onDragEnd={onDragEnd}>
                <SortableContext items={ids}>
                  {results.map((data, i) => (
                    <PropertyCard key={data.id} data={data} rank={i} />
                  ))}
                </SortableContext>
              </DndContext>
              <div className="mt-8 text-right">
                <div
                  className="btn btn-lg btn-outline btn-primary"
                  onClick={submit}
                >
                  この希望順で確定する！
                </div>
              </div>
            </>
          ) : (
            <p>
              まだ希望リストに物件が登録されていません。「物件を探す」から希望の物件を追加してください。
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export function PropertyCard({
  data,
  rank,
}: {
  data: PropertyData;
  rank: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const fetcher = useFetcher();
  const results = useLoaderData<typeof loader>();
  const ids = results.map((d) => d.id);

  return (
    <div
      ref={setNodeRef}
      className="mt-8 px-6 py-4 rounded bg-base-100"
      style={style}
    >
      <div
        className="py-2 flex items-center gap-2"
        {...listeners}
        {...attributes}
      >
        <RxDragHandleDots2 />第{rank + 1}希望
      </div>
      <div className="flex">
        <h2 className="grow text-xl font-bold">{data.title}</h2>
        <div
          className="btn btn-sm btn-outline btn-primary"
          onClick={() => {
            fetcher.submit(
              { ids: ids.filter((e) => e !== data.id) },
              {
                action: "/wish_list",
                method: "POST",
                encType: "application/json",
              }
            );
          }}
        >
          <IoTrashBinOutline className="text-xl" /> 希望リストから削除
        </div>
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
