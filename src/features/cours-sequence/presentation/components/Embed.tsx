import React, { useState } from "react";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { toast } from "sonner";
interface EmbedWithInputProps {
  initialUrl: string;
  title: string;
  width?: string | number;
  height?: string | number;
  allowFullScreen?: boolean;
  onUrlUpdate: (newUrl: string) => void;
}

const EmbedWithInput: React.FC<EmbedWithInputProps> = ({
  initialUrl,
  title,
  width = "100%",
  height = "100%",
  allowFullScreen = true,
  onUrlUpdate,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };

  const handleUpdateUrl = () => {
    setUrl(inputUrl);
    onUrlUpdate(inputUrl);
  };

  return (
    <div className="space-y-4 h-[90vh]">
      <div className="flex items-center space-x-2">
        <Input
          type="url"
          value={inputUrl}
          onChange={handleUrlChange}
          placeholder="Entrez l'URL de l'embed"
          className="flex-grow"
        />
        <Button onClick={handleUpdateUrl}>Mettre à jour</Button>
      </div>
      <iframe
        src={url}
        title={title}
        width={width}
        height={height}
        allowFullScreen={allowFullScreen}
        loading="lazy"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default EmbedWithInput;
