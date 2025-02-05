import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve("./public/uploads");
const UPLOAD_IMAGES_DIR = path.resolve("./public/uploads/images");
const UPLOAD_FILES_DIR = path.resolve("./public/uploads/files");
const UPLOAD_AUDIOS_DIR = path.resolve("./public/uploads/audios");
const UPLOAD_VEDIOS_DIR = path.resolve("./public/uploads/videos");

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as File) || null;

  if (file) {
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
    }
      const imageExtensions = ['.jpg','.jpeg','.png','.gif','.bmp','.tiff','.webp','.svg','.heif','.raw'];
      const Extention = (file as File)?.name?.slice((file as File)?.name?.indexOf('.'), )
          if(imageExtensions.includes(Extention)){
              const buffer = Buffer.from(await (file as File).arrayBuffer());
              if (!fs.existsSync(UPLOAD_IMAGES_DIR)) {
                fs.mkdirSync(UPLOAD_IMAGES_DIR);
            }
            fs.writeFileSync(
                path.resolve(UPLOAD_IMAGES_DIR, (body.file as File).name.slice(0,(file as File)?.name?.indexOf('.'))+new Date().getDate()+Extention),
                buffer
              );
          }
          if(Extention === '.pdf'){
            const buffer = Buffer.from(await (file as File).arrayBuffer());
              if (!fs.existsSync(UPLOAD_FILES_DIR)) {
                fs.mkdirSync(UPLOAD_FILES_DIR);
            }
            fs.writeFileSync(
                path.resolve(UPLOAD_FILES_DIR, (body.file as File).name.slice(0,(file as File)?.name?.indexOf('.'))+new Date().getTime()+Extention),
                buffer
              );
          }
          if(Extention === '.mp3' || Extention === '.wav' || Extention === '.ogg' || Extention === '.flac'){
            const buffer = Buffer.from(await (file as File).arrayBuffer());
              if (!fs.existsSync(UPLOAD_AUDIOS_DIR)) {
                fs.mkdirSync(UPLOAD_AUDIOS_DIR);
            }
            fs.writeFileSync(
                path.resolve(UPLOAD_AUDIOS_DIR, (body.file as File).name.slice(0,(file as File)?.name?.indexOf('.'))+new Date().getTime()+Extention),
                buffer
              );
          }
          if(Extention === '.mp4' || Extention === '.avi' || Extention === '.mov' || Extention === '.flv'){
            const buffer = Buffer.from(await (file as File).arrayBuffer());
              if (!fs.existsSync(UPLOAD_VEDIOS_DIR)) {
                fs.mkdirSync(UPLOAD_VEDIOS_DIR);
            }
            fs.writeFileSync(
                path.resolve(UPLOAD_VEDIOS_DIR, (body.file as File).name.slice(0,(file as File)?.name?.indexOf('.'))+new Date().getTime()+Extention),
                buffer
              );
          }

  } else {
    return NextResponse.json({
      success: false,
      file: file,
    });
  }

  return NextResponse.json({
    success: true,
    name: (body.file as File).name.slice(0,(file as File)?.name?.indexOf('.'))+new Date().getTime()+(body.file as File).name.slice((file as File)?.name?.indexOf('.'),),
  });
};

