import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { string } from "zod";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        {value.map((url) => (
          <div className="relative w-[300px] h-[300px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-700 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              key={url}
              src={url}
              alt="group"
              className="object-cover"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="ahwsurj6" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              onClick={(event) => {
                event.preventDefault();
                open();
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
