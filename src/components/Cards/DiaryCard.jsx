import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import { Dropdown } from "flowbite-react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const DiaryCard = ({
  id,
  judul,
  tanggal,
  isi,
  foto,
  deleteDiaryById,
}) => {
  return (
    <div className="relative">
      <div className="absolute right-9 top-10 z-10 hover:bg-slate-200 rounded-full pr-2 py-2">
        <Dropdown inline="true">
          <Link
            to={`edit/${id}`}
            className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Edit
          </Link>
          <Dropdown.Item onClick={() => deleteDiaryById(id)}>
            Delete
          </Dropdown.Item>
        </Dropdown>
      </div>
      <Link
        to={`/dashboard/diari/${id}`}
        key={id}
        className="diary-card border border-slate-300 p-10 flex flex-col gap-2 cursor-pointer bg-white hover:bg-slate-200 rounded-lg"
        data-color-mode="light"
      >
        <div className="diary-heading">
          <p className="text-end pb-2 flex justify-between relative">
            <Moment format="D MMMM, YYYY">
              {tanggal}
            </Moment>
          </p>
          <p className="text-2xl">
            <strong>{judul}</strong>
          </p>
        </div>
        <div className="diary-content flex flex-col-reverse xl:flex-row justify-between gap-5 text-justify overflow-hidden max-h-[500px] md:max-h-[400px]">
          {foto === null ? (
            <ReactMarkdown children={isi} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}/>
          ) : (
            <>
              <ReactMarkdown children={isi} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}/>
              <img
                src={foto}
                alt=""
                className="self-center w-[400px] md:w-[250px] rounded-lg"
              />
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

export default DiaryCard;
