/**
 * v0 by Vercel.
 * @see https://v0.dev/t/g5Q10vVtZPj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/core/components/ui/button";
import { DialogFooter } from "@/core/components/ui/dialog";
import { Label } from "@/core/components/ui/label";
import { Input } from "@/core/components/ui/input";
import CustomDialog from "@/core/components/common/CustomDialog";
import { useState } from "react";
const imagesUrls = [
  "/images/fredrik-ohlander-s9NttXGehL4-unsplash.jpg",
  "/images/joel-muniz-ltZBgG22fqk-unsplash.jpg",
  "/images/lena-polishko-w8zJdG8R_LE-unsplash.jpg",
  "/images/mos-design-Io433E805vo-unsplash.jpg",
  "/images/mos-design-jzFbbG2WXv0-unsplash.jpg",
  "/images/nisha-gurung-M6KJaQ54oB0-unsplash.jpg",
  "/images/pascal-van-de-vendel-b4ps0846ScI-unsplash.jpg",
  "/images/shelby-murphy-figueroa-FyH2_oRyfYA-unsplash.jpg",
  "/images/thomas-de-luze-uFoKmskAUIE-unsplash.jpg",
  "/images/venti-views-jlphfn0fk4A-unsplash.jpg",
];
export default function SelectImageUrl({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState("");
  return (
    <>
      <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
        <img
          alt="Image 1"
          className="object-cover w-full h-48"
          height={300}
          src={imageUrl}
          style={{
            aspectRatio: "300/300",
            objectFit: "cover",
          }}
          width={300}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <CheckIcon className="w-8 h-8 text-white" />
        </div>
      </div>

      <CustomDialog
        title="Select Image"
        displayButton={true}
        buttonText="Select Image"
        open={open}
        setOpen={setOpen}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
          {imagesUrls.map((url) => (
            <div
              key={url}
              onClick={() => {
                setImageUrl(url);
                setOpen(false);
              }}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
            >
              <img
                alt="Image 1"
                className="object-cover w-full h-48"
                height={300}
                src={url}
                style={{
                  aspectRatio: "300/300",
                  objectFit: "cover",
                }}
                width={300}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="file">Upload your own image</Label>
            <Input
              id="file"
              disabled
              onClick={() => {
                alert("This feature is not yet implemented");
              }}
              type="file"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url">Insert image URL</Label>
            <div className="flex items-center gap-2">
              <Input
                id="url"
                placeholder="https://example.com/image.jpg"
                type="text"
                value={userImageUrl}
                onChange={(e) => setUserImageUrl(e.target.value)}
              />
              <Button
                onClick={() => {
                  setImageUrl(userImageUrl);
                  setOpen(false);
                }}
                type="button"
              >
                Insert
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Choose Image</Button>
          <div>
            <Button variant="outline">Cancel</Button>
          </div>
        </DialogFooter>
      </CustomDialog>
    </>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
