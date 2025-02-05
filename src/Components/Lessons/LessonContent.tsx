"use client";
import DateConvert from "@/Utils/Date";
import Image from "next/image";
import Accordion from "react-bootstrap/Accordion";

export default function LessonContent({
  id,
  number,
  title,
  desc,
  date,
  src,
}: {
  id: string;
  number: string;
  title: string;
  desc: string;
  date: Date;
  src: { linkVideo: string; fileName: string[]; body: string };
}) {
  return (
    <Accordion className="w-full">
      <Accordion.Item eventKey={id as string} className="w-full">
        <Accordion.Header>
          {" "}
          المحاضرة
          <h1 className="font-bold text-fuchsia-700 text-2xl mx-3">{number}</h1>
        </Accordion.Header>
        <Accordion.Body>
          <div className="flex justify-start items-center flex-col w-full">
            <h1 className="font-bold text-3xl text-red-500">{title}</h1>
            <p className="text-2xl text-center leading-loose">{desc}</p>
            <span className="flex gap-2 text-sm text-gray-300 justify-start items-start">
              تاريخ إضافة الدرس :<span>{DateConvert(date)}</span>
            </span>
            <h2 className="m-3 font-bold text-2xl text-purple-600">
              فيديو {number}
            </h2>
            <div className="w-full my-2 flex justify-center items-center">
              {src?.linkVideo &&
                src?.linkVideo?.startsWith("https://www.youtube.com") && (
                  <iframe
                    width={"100%"}
                    height={"100%"}
                    className="w-full h-64 lg:w-2/3 md:w-2/3 sm:w-5/6"
                    src={src?.linkVideo}
                    title="فيديو المحاضرة"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                )}
              {src?.linkVideo &&
                src?.linkVideo &&
                src?.linkVideo?.startsWith("https://www.facebook.com") && (
                  <iframe
                    width={"100%"}
                    height={"100%"}
                    className="w-full h-64 lg:w-2/3 md:w-2/3 sm:w-5/6"
                    src={src?.linkVideo}
                    title="فيديو المحاضرة"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                )}
            </div>

            <div className="w-full my-2 gap-2 flex flex-col  justify-center items-center">
              {src?.fileName &&
                src?.fileName?.length > 0 &&
                src?.fileName?.map((el, i) => {
                  const imageExtensions = [
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".gif",
                    ".bmp",
                    ".tiff",
                    ".webp",
                    ".svg",
                    ".heif",
                    ".raw",
                  ];
                  const Extention = el?.slice(el?.indexOf("."));

                  return imageExtensions.includes(Extention) ? (
                    <div
                      key={i}
                      className="w-full my-5  lg:w-2/3 md:w-2/3 sm:w-5/6 rounded"
                    >
                      <h2 className="m-3 font-bold text-2xl text-purple-600">
                        صور {number}
                      </h2>
                      <Image
                        className="w-full"
                        key={i}
                        width={100}
                        height={100}
                        src={`/uploads/images/${el}`}
                        alt="image"
                      />
                    </div>
                  ) : el?.slice(el?.indexOf(".")) === ".pdf" ? (
                    <div
                      key={i}
                      className="w-full my-5 min-h-fit lg:w-2/3 md:w-2/3 rounded"
                    >
                      <h2 className="m-3 font-bold text-2xl text-purple-600">
                        ملخص {number}
                      </h2>
                      <iframe
                        key={i}
                        width="560"
                        height="615"
                        className="w-full shadow "
                        src={`/uploads/files/${el}`}
                        title="ملفات المحاضرة"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; mopile"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : el?.slice(el?.indexOf(".")) === ".mp4" ||
                    el?.slice(el?.indexOf(".")) === ".avi" ||
                    el?.slice(el?.indexOf(".")) === ".mov" ||
                    el?.slice(el?.indexOf(".")) === ".flv" ? (
                    <div
                      key={i}
                      className="w-full my-5 h-72 lg:w-2/3 md:w-2/3 sm:w-5/6 rounded"
                    >
                      <h2 className="m-3 font-bold text-2xl text-purple-600">
                        فيديو {number}
                      </h2>
                      <video
                        controls
                        key={i}
                        width={"100%"}
                        height={"100%"}
                        className="w-full shadow text-center flex justify-center items-center"
                        src={`/uploads/videos/${el}`}
                        title="فيديو المحاضرة"
                      ></video>
                    </div>
                  ) : el?.slice(el?.indexOf(".")) === ".mp3" ||
                    el?.slice(el?.indexOf(".")) === ".wav" ||
                    el?.slice(el?.indexOf(".")) === ".ogg" ||
                    el?.slice(el?.indexOf(".")) === ".flac" ? (
                    <div
                      key={i}
                      className="w-full flex justify-center items-center flex-col my-5  lg:w-2/3 md:w-2/3 sm:w-5/6 rounded"
                    >
                      <h2 className="m-3 font-bold text-2xl text-purple-600">
                        المحاضرة صوت {number}
                      </h2>
                      <audio
                        controls
                        className="w-full"
                        title="المحاضرة صوت فقط"
                        src={`/uploads/audios/${el}`}
                      />
                    </div>
                  ) : (
                    ""
                  );
                })}
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
