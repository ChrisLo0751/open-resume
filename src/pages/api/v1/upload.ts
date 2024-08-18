import type { NextApiRequest, NextApiResponse } from 'next';
import multiparty, { File } from 'multiparty';
import fs from 'fs';
import path from 'path';

interface ResponseData {
  message: string;
  data?: any;
  error?: string;
}

const uploadDir = path.join(process.cwd(), 'uploads');

// 确保上传目录存在
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const handlePost = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const form = new multiparty.Form({
    uploadDir,
    maxFilesSize: 10 * 1024 * 1024,
  });

  form.parse(req, (err: Error | null, fields: Record<string, any>, files: { [key: string]: File[] }) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({
        message: 'Error parsing form',
        error: err.message,
      });
    }

    // 检查是否有文件上传
    const file = files.file ? files.file[0] : null;

    if (!file) {
      return res.status(400).json({
        message: 'No file uploaded',
        error: 'Please upload a file',
      });
    }

    // 获取上传文件的信息
    const fileName = file.originalFilename || `uploaded-file-${Date.now()}`;
    const filePath = path.join(uploadDir, fileName);

    // 移动临时文件到指定目录
    fs.rename(file.path, filePath, (err) => {
      if (err) {
        console.error('Error moving file:', err);
        return res.status(500).json({
          message: 'Error moving file',
          error: err.message,
        });
      }

      return res.status(200).json({
        message: 'File uploaded successfully',
        data: {
          fileName,
          filePath,
        },
      });
    });
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  console.info('API request:', req.method, req.url);
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({
        message: 'Method Not Allowed',
        error: `Method ${req.method} is not allowed.`,
      });
  }
}