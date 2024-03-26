import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingPage from "../components/Loadings/LoadingPage";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GET_DIARY_DETAIL } from "../graphql/queries";
import { DELETE_DIARY } from "../graphql/mutations";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Moment from "react-moment";

const DiariDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useQuery(GET_DIARY_DETAIL, {
    variables: {
      id: id,
    },
  });
  const [deleteDiary] = useMutation(DELETE_DIARY);

  const deleteDiaryById = (id) => {
    Swal.fire({
      title: "Yakin menghapus diari?",
      text: "Diari tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDiary({ variables: { id: id } });
        Swal.fire({
          title: "Success",
          text: "Diari berhasil dihapus!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/dashboard");
      }
    });
  };

  if (loading) return <LoadingPage />;

  return (
    <>
      <Helmet>
        <title>Diariku - {data?.diari[0].judul}</title>
        <meta name="description" content="Detail diari" />
      </Helmet>
      <div className="bg-slate-100" data-color-mode="light">
        <div className="container flex items-center flex-col gap-12 pb-20 min-h-[730px] lg:px-20 overflow-x-hidden">
          <div className="flex justify-between w-full px-5">
            <Link to="/dashboard" className="self-start">
              <p className="px-3 py-5 lg:px-0 lg:py-5 underline">
                {"<- Back to Dashboard"}
              </p>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                to={`../dashboard/edit/${id}`}
                className="text-white bg-gray-800 border border-transparent hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 disabled:hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 dark:disabled:hover:bg-gray-800 group flex h-min items-center justify-center text-center font-medium focus:z-10 rounded-lg p-[1px]"
              >
                <FontAwesomeIcon icon={faEdit} className="px-4 py-2" />
              </Link>
              <Button color="dark" onClick={() => deleteDiaryById(id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </div>
          </div>

          {data?.diari[0].foto === null ? (
            <div
              className="flex flex-col min-h-[60vh] w-[80vw] lg:w-[50vw] bg-white rounded-lg p-10"
              key={data?.diari[0].id}
            >
              <Moment
                className="font-bold pb-12 text-center lg:text-end"
                format="dddd, D MMMM YYYY"
              >
                {data?.diari[0].created_at}
              </Moment>
              {data?.diari[0].judul !== "" && (
                <h1 className="pb-5 text-center">
                  <strong>{data?.diari[0].judul}</strong>
                </h1>
              )}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                children={data?.diari[0].isi}
                className="prose prose-p:mt-0 prose-p:mb-2 prose-headings:mb-2 prose-headings:mt-0 min-w-full prose-li:m-0"
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, "")}
                        style={oneDark}
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
          ) : (
            <div
              className="flex flex-col min-h-[60vh] w-[80vw] lg:w-[50vw] bg-white rounded-lg p-10 md:mt-0"
              key={data?.diari[0].id}
            >
              <Moment
                className="font-bold pb-12 text-center lg:text-end"
                format="dddd, D MMMM YYYY"
              >
                {data?.diari[0].created_at}
              </Moment>
              {data?.diari[0].judul !== "" && (
                <h1 className="pb-5 text-center">
                  <strong>{data?.diari[0].judul}</strong>
                </h1>
              )}
              <div className="flex flex-col">
                <img
                  src={data?.diari[0].foto}
                  alt=""
                  className="max-h-[500px] self-center mb-2 rounded-lg"
                />
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  children={data?.diari[0].isi}
                  className="prose prose-p:mt-0 prose-p:mb-2 prose-headings:mb-4 prose-headings:mt-0 prose-li:text-black min-w-full prose-li:m-0"
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DiariDetail;
