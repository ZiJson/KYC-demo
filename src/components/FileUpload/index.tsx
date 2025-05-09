import React, { useRef } from "react";
import Button from "@/components/Button";
import { Paperclip, Trash } from "lucide-react";

const ACCEPT = ".png, .jpg, .pdf";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  value?: File[];
  multiple?: boolean;
  accept?: string;
}

const FileUpload = ({
  onChange,
  value = [],
  multiple = false,
  accept = ACCEPT,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemove = (indexToRemove: number) => {
    const newFiles = value.filter((_, index) => index !== indexToRemove);
    onChange(newFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    if (multiple && value.length) {
      const map = new Map<string, File>();
      [...value, ...selectedFiles].forEach((file) => {
        map.set(file.name + file.size, file);
      });
      onChange(Array.from(map.values()));
    } else {
      onChange(selectedFiles);
    }

    e.target.value = "";
  };

  return (
    <div>
      <Button variant="secondary" onClick={() => inputRef.current?.click()}>
        Upload
      </Button>

      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />

      <ul className="mt-2 space-y-2 text-sm">
        {value.map((file, index) => {
          const isImage = file.type.startsWith("image");
          const blobUrl = URL.createObjectURL(file);

          return (
            <li
              key={index}
              className="bg-card border-muted flex items-center justify-between gap-2 rounded border px-2 py-1 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <a href={blobUrl} target="_blank" rel="noreferrer">
                  {isImage ? (
                    <img
                      src={blobUrl}
                      alt={file.name}
                      className="h-9 w-9 rounded"
                    />
                  ) : (
                    <Button
                      variant="icon"
                      className="flex h-9 w-9 items-center justify-center rounded"
                    >
                      <Paperclip />
                    </Button>
                  )}
                </a>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button variant="icon" onClick={() => handleRemove(index)}>
                <Trash />
              </Button>
            </li>
          );
        })}

        {multiple && value.length > 0 && (
          <p className="text-muted-foreground px-2 text-xs">
            Total size:{" "}
            {(value.reduce((acc, file) => acc + file.size, 0) / 1024).toFixed(
              1,
            )}{" "}
            KB
          </p>
        )}
      </ul>
    </div>
  );
};

export default FileUpload;
