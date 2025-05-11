import React, { useRef } from "react";
import Button from "@/components/Button";
import { Paperclip, Trash } from "lucide-react";
import type { ControlledFieldProps } from "@/type";
import { useStableId } from "@/hooks";

const ACCEPT = ".png, .jpg, .pdf";

interface FileUploadProps<T = File[]> extends ControlledFieldProps<T> {
  multiple?: boolean;
  accept?: string;
}

const FileUpload = ({
  onChange,
  value = [],
  multiple = false,
  accept = ACCEPT,
  label,
  id: idProp,
  errorMessage,
  required,
}: FileUploadProps) => {
  const id = useStableId(idProp);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleRemove = (indexToRemove: number) => {
    if (!value) return;
    const newFiles = value.filter((_, index) => index !== indexToRemove);
    onChange(newFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    if (multiple && !!value?.length) {
      const map = new Map<string, File>();
      [...value, ...selectedFiles].forEach((file) => {
        map.set(file.name + file.size, file);
      });
      onChange(Array.from(map.values()));
    } else {
      console.log(selectedFiles);
      onChange(selectedFiles);
    }

    e.target.value = "";
  };

  return (
    <div className="relative flex w-full max-w-3xs flex-col items-center gap-1">
      <div className="relative flex w-full items-center justify-between">
        {label && (
          <label
            htmlFor={id}
            className="relative block px-1 text-sm font-bold whitespace-nowrap"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <Button variant="secondary" onClick={() => inputRef.current?.click()}>
          Upload
        </Button>
        {errorMessage && (
          <p className="text-destructive absolute -bottom-2 left-1 text-xs">
            {errorMessage}
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />

      <ul className="mt-2 w-full space-y-2 text-sm">
        {value &&
          value.map((file, index) => {
            if (!file.type) return;
            const isImage = file.type?.startsWith("image");
            const blobUrl = URL.createObjectURL(file);

            return (
              <li
                title={file.name}
                key={index}
                className="bg-card flex w-full items-center justify-between gap-2 rounded-md border px-2 py-1"
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
                    <p className="line-clamp-1 font-medium">{file.name}</p>
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

        {multiple && !!value?.length && (
          <p className="text-muted-foreground px-2 text-xs">
            Total size: {formatFileSize(value)}
          </p>
        )}
      </ul>
    </div>
  );
};

export default FileUpload;

const formatFileSize = (files: File[]) => {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  const mb = totalBytes / (1024 * 1024);
  return mb < 0.1
    ? `${(totalBytes / 1024).toFixed(1)} KB`
    : `${mb.toFixed(1)} MB`;
};
