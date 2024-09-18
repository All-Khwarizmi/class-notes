"use client";

import { useState } from "react";
import { Button } from "@/core/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog";
import { Label } from "@/core/components/ui/label";
import { Input } from "@/core/components/ui/input";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { Check, Image as ImageIcon } from "lucide-react";

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

interface SelectImageUrlProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function SelectImageUrl({
  imageUrl,
  setImageUrl,
}: SelectImageUrlProps) {
  const [open, setOpen] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState("");

  const handleImageSelect = (url: string) => {
    setImageUrl(url);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
        <img
          alt="Selected image"
          className="object-cover w-full h-48"
          src={imageUrl}
          style={{
            aspectRatio: "16/9",
            objectFit: "cover",
          }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ImageIcon className="w-8 h-8 text-white" />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Select Image
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] pr-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {imagesUrls.map((url) => (
                <button
                  key={url}
                  onClick={() => handleImageSelect(url)}
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <img
                    alt="Selectable image"
                    className="object-cover w-full h-32"
                    src={url}
                    style={{
                      aspectRatio: "16/9",
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">Upload your own image</Label>
              <Input
                id="file"
                type="file"
                disabled
                onClick={() => alert("This feature is not yet implemented")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">Insert image URL</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="url"
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  value={userImageUrl}
                  onChange={(e) => setUserImageUrl(e.target.value)}
                />
                <Button
                  onClick={() => handleImageSelect(userImageUrl)}
                  type="button"
                >
                  Insert
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
