import Image from "next/image";
import React from "react";

export const PreviewPanel = ({
  images,
  setSelectImage,
  setImages
}: {
  images: string[],
  setSelectImage: React.Dispatch<React.SetStateAction<string>>
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}) => {

  const handleClick = (src: string) => {
    setSelectImage(src);
  }

  const handleDelete = (src: string) => {
    console.log(src)
    setImages((prev) => prev.filter((prevSrc) => prevSrc !== src))
  }

  return (
    <div className="flex w-full rounded-md shadow-3xl ring-8 ring-slate-900/50">
      <div className="flex h-32 w-full items-center justify-center gap-4 rounded-md bg-[#020617] bg-[length:15px_15px] p-4 [background-image:radial-gradient(#64748b_0.75px,_transparent_0)]">
        {images.length > 0 ? (
          images.map((imgSrc, index) => {
            return (
              <div key={index} className="relative flex aspect-square cursor-pointer rounded-lg border-2 border-slate-500 transition-colors hover:border-slate-400">
                <button onClick={() => handleDelete(imgSrc)} className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 p-4 font-bold leading-none text-white transition-colors hover:bg-red-500">X</button>
                <Image
                  src={imgSrc}
                  width={100}
                  height={100}
                  alt="Image"
                  quality={50}
                  onClick={() => handleClick(imgSrc)}
                  className="rounded-lg object-cover"
                />
              </div>
            )
          })
        ) : (
          <h1 className="text-2xl font-light text-slate-400">Clipboard images history (empty)</h1>
        )}
      </div>
    </div>
  )
}