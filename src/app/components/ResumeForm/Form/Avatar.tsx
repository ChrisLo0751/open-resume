import { useState } from "react";
import { InputGroupWrapper } from "./InputGroup";

export interface AvatarProps {
  name: string;
  label: string;
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  shape?: 'circle' | 'square';
  onClick?: () => void;
  uploadPrompt?: boolean;
  labelClassName?: string;
  onUpload?: (file: File) => void; // New prop for handling file upload
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  label,
  src,
  alt = 'Avatar',
  size = 'medium',
  shape = 'circle',
  onClick,
  uploadPrompt = false,
  labelClassName,
  onUpload,
}) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-lg',
  };

  const [uploadStatus, setUploadStatus] = useState(uploadPrompt);
  const shapeClasses = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      onUpload(file); // Call the onUpload prop with the selected file
    }
  };

  return (
    <InputGroupWrapper label={label} className={labelClassName}>
      <div
        className={`relative flex items-center justify-center ${sizeClasses[size]} ${shapeClasses} ${labelClassName} bg-gray-200 text-gray-600 font-bold cursor-pointer hover:bg-gray-300`}
        onClick={onClick}
        onMouseMove={() => setUploadStatus(true)}
        onMouseLeave={() => setUploadStatus(false)}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {src ? (
          <img src={src} alt={alt} className={`object-cover ${shapeClasses}`} />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            {alt.charAt(0).toUpperCase()}
          </div>
        )}
        {uploadStatus && !src && (
          <div className={`absolute inset-0 flex items-center justify-center text-xs text-center text-white bg-opacity-50 rounded-lg bg-slate-600`}>
            上传
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </div>
    </InputGroupWrapper>
  );
};