import Image from "next/image";
import React from "react";
import placeholder from "../app/placeholder.svg";

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
    setImagesHistoryUrl((prevUrl) => {
      // Length has to be subtracted by one to stay accurate
      // because the last operation is going to remove one item
      if ((prevUrl.length - 1) === 0) {
        // If the length is zero, then no images are left. Set the default placeholder.
        setSelectedImageUrl(placeholder.src);
        return []
      }

      return (
        prevUrl.filter((value, index) => {

          // If we match the current image being deleted with the one being displayed
          // And there are more than one images remaining in history then...
          if (value === url && (prevUrl.length - 1) > 0) {
            // Check if we have entries on the positive side
            prevUrl[index + 1] ? (
              // If there are, change the current image to the next positive index
              setSelectedImageUrl((prevUrl[index + 1]))
            ) : (
              // Else, change the current image to the next negative index
              setSelectedImageUrl((prevUrl[index - 1]))
            );
          }

          return (value !== url)
        })
      );
    });
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