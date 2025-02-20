"use client";
import Accordion from "react-bootstrap/Accordion";
import { ExamsProps } from "@/Interfaces/InterFaces";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { ChangeEvent, SetStateAction } from "react";

export default function QuestionsPage({
  type,
  id,
  question,
  choase,
  degree,
  answers,
  setAnswers,
}: ExamsProps) {
  const answerHandeller = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "radio") {
      if (answers.length) {
        const find = answers.find((item) => item.id === id);
        if (find) {
          setAnswers([
            ...answers.filter((item) => item.id !== id),
            { id: id, answer: e.target.value, type: e.target.type },
          ] as unknown as SetStateAction<never[]>);
        } else {
          setAnswers([
            ...answers,
            { id: id, answer: e.target.value, type: e.target.type },
          ] as unknown as SetStateAction<never[]>);
        }
      } else {
        setAnswers([
          ...answers,
          { id: id, answer: e.target.value, type: e.target.type },
        ] as unknown as SetStateAction<never[]>);
      }
    }

    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        const find = answers.find((item) => item.id === id);
        const PrevCheckanswers = answers.filter((prev) => prev.id === id)[0]
          ?.answer;
        if (find && PrevCheckanswers.length) {
          setAnswers([
            ...answers.filter((item) => item.id !== id),
            {
              id: id,
              answer: [...PrevCheckanswers, e.target.value],
              type: e.target.type,
            },
          ] as unknown as SetStateAction<never[]>);
        } else {
          setAnswers([
            ...answers,
            { id: id, answer: [e.target.value], type: e.target.type },
          ] as unknown as SetStateAction<never[]>);
        }
      } else {
        const PrevCheckanswers = (
          answers.filter((prev) => prev.id === id)[0]
            ?.answer as unknown as string[]
        )?.filter((ele: string) => ele !== e.target.value);
        setAnswers([
          ...answers.filter((item) => item.id !== id),
          { id: id, answer: [...PrevCheckanswers], type: e.target.type },
        ] as unknown as SetStateAction<never[]>);
        if (PrevCheckanswers?.length < 1) {
          setAnswers([
            ...answers.filter((item) => item.id !== id),
          ] as unknown as SetStateAction<never[]>);
        }
      }
    }
  };

  return (
    <>
      <Accordion.Item eventKey={id as string}>
        <Accordion.Header className="flex relative flex-row justify-between">
          <h1 className="font-bold text-fuchsia-700 ml-1">
            {id}
            {")"}
          </h1>
          <h2 className="font-bold text-xl text-center mx-2">{question}</h2>
          {answers?.find((ele) => ele?.id === id) ? (
            <IoCheckmarkDone className="text-green-500 absolute left-10" />
          ) : (
            <MdClose className="text-accent_color absolute left-10" />
          )}
        </Accordion.Header>
        <Accordion.Body>
          <div className="flex w-full justify-between items-center flex-wrap">
            <div className="flex-col lg:w-1/4 flex justify-start text-justify gap-1 sm:gap-0">
              {choase.map((choase, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-2 justify-between w-full "
                  >
                    <label
                      className="cursor-pointer"
                      htmlFor={`${id}-${choase}-${question}`}
                    >{`${index + 1} ${")"} ${choase}`}</label>
                    <input
                      className="cursor-pointer"
                      onChange={(e) => answerHandeller(e)}
                      value={choase}
                      id={`${id}-${choase}-${question}`}
                      type={type}
                      name={`${id}${question}`}
                    />
                  </div>
                );
              })}
            </div>
            <span className="font-bold text-accent_color">
              درجة السؤال: ({degree})
            </span>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}
