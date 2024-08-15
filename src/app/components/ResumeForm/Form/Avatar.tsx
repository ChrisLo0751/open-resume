import { useState } from "react";

export interface AvatarProps {
  /** 头像图片的 URL */
  src?: string;
  /** 头像的替代文本 */
  alt?: string;
  /** 头像的尺寸,可选值为 'small', 'medium', 'large' */
  size?: 'small' | 'medium' | 'large';
  /** 头像的形状,可选值为 'circle', 'square' */
  shape?: 'circle' | 'square';
  /** 点击头像时的回调函数 */
  onClick?: () => void;
  /** 是否显示上传提示 */
  uploadPrompt?: boolean;
  labelClassName?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'medium',
  shape = 'circle',
  onClick,
  uploadPrompt = false,
  labelClassName,
}) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-lg',
  };

  const [uploadStatus, setUploadStatus] =  useState(uploadPrompt)

  const shapeClasses = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <div
      className={`relative flex items-center justify-center ${sizeClasses[size]} ${shapeClasses} ${labelClassName} bg-gray-200 text-gray-600 font-bold cursor-pointer hover:bg-gray-300 mx-auto my-auto`}
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
        <div className="absolute inset-0 flex items-center justify-center text-xs text-center text-white bg-opacity-50 rounded-lg bg-slate-600">
          Upload
        </div>
      )}
    </div>
  );
};