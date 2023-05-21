import Image from "next/image";
import React from "react";

export const HistoryPanel = ({
  imagesHistoryUrl,
  setSelectedImageUrl,
  setImagesHistoryUrl,
}: {
  imagesHistoryUrl: string[],
  setSelectedImageUrl: React.Dispatch<React.SetStateAction<string>>
  setImagesHistoryUrl: React.Dispatch<React.SetStateAction<string[]>>
}) => {

  const handleSelectFromHistory = (url: string) => {
    // Updates the state with the current selected image from the panel
    setSelectedImageUrl(url);
  }

  const handleDeleteFromHistory = (url: string) => {
    // Filter out the URL to delete the image selected from the panel
    setImagesHistoryUrl((prevUrl) => prevUrl.filter((value) => value !== url))
  }

  return (
    /* History panel container */
    <div className="flex w-full rounded-md shadow-3xl ring-8 ring-slate-900/50">
      <div className="flex h-32 w-full items-center justify-center gap-4 rounded-md bg-[#020617] bg-[length:15px_15px] p-4 [background-image:radial-gradient(#64748b_0.75px,_transparent_0)]">
        {imagesHistoryUrl.length > 0 ? (
          imagesHistoryUrl.map((url, index) => {
            return (
              /* History image container */
              <div
                key={index}
                className="relative flex aspect-square cursor-pointer rounded-lg border-2 border-slate-500 transition-colors hover:border-slate-400"
              >
                {/* History image delete button */}
                <button
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 p-4 font-bold leading-none text-white transition-colors hover:bg-red-500"
                  onClick={() => handleDeleteFromHistory(url)}
                >
                  X
                </button>
                {/* History image */}
                <Image
                  src={url}
                  width={100}
                  height={100}
                  alt="Image"
                  quality={50}
                  onClick={() => handleSelectFromHistory(url)}
                  className="rounded-lg object-cover"
                />
              </div>
            )
          })
        ) : (
          /* No history placeholder text */
          <h1 className="text-2xl font-light text-slate-400">Clipboard images history (empty)</h1>
        )}
      </div>
    </div>
  )
}