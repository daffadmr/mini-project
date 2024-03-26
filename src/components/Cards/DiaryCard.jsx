import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import { Dropdown } from "flowbite-react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const DiaryCard = ({ id, judul, tanggal, isi, foto, deleteDiaryById }) => {
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
            <Moment className="font-bold" format="dddd, D MMMM YYYY">{tanggal}</Moment>
          </p>
        </div>
        {foto === null ? (
          <>
            <h1 className="text-center lg:text-start text-xl xl:text-2xl">
              <strong>{judul}</strong>
            </h1>
            <div className="diary-content flex xl:flex-row gap-5 text-justify overflow-hidden min-w-full md:max-h-[400px]">
              <ReactMarkdown
                children={isi}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                className={
                  `flex flex-col max-h-[240px] overflow-hidden prose-sm prose-headings:mb-4 prose-headings:mt-0 prose-p:m-0 prose-li:m-0 xl:prose w-full`
                }
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        style={oneDark}
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        PreTag="div"
                      />
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center lg:text-start text-xl xl:text-2xl">
              <strong>{judul}</strong>
            </h1>
            <div className="diary-content flex flex-col-reverse xl:flex-row justify-between gap-5 text-justify overflow-hidden xl:max-h-[400px]">
              <ReactMarkdown
                children={isi}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                className={
                  `flex flex-col max-h-[240px] overflow-hidden prose-sm prose-headings:mb-4 prose-headings:mt-0 prose-p:m-0 prose-li:m-0  xl:prose`
                }
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        style={oneDark}
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        PreTag="div"
                      />
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
              <img
                src={foto}
                alt=""
                className="self-center md:w-[250px] rounded-lg"
              />
            </div>
          </>
        )}
      </Link>
    </div>
  );
};

export default DiaryCard;
