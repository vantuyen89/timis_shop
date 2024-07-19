import axios from "axios";

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


const CLOUDINARY_NAME = 'dzurnefms';
const CLOUDINARY_PRESET = 'project_cn';
const CLOUDINARY_FOLDER = 'project_cn';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const uploadFileCloudinary = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_PRESET)
    formData.append('folder', CLOUDINARY_FOLDER)
    formData.append('quality', 'auto:best') // Đảm bảo chất lượng tốt nhất
    formData.append('width', 'auto') // Để Cloudinary tự động điều chỉnh
    formData.append('height', 'auto') // Để Cloudinary tự động điều chỉnh
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload/`, formData)
    if (response.status === 200) {
      return response.data.url
    } else {
      console.log('Error')
      return
    }
  } catch (error) {
      // handle error here
      console.error(error);
  }
};

export { uploadFileCloudinary };



