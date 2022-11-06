import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Swal from "sweetalert2";
import LoadingPage from "../components/Loading/LoadingPage";
import { GET_DIARY_DETAIL } from "../GraphQL/queries";
import { UPDATE_DIARY } from "../GraphQL/mutations";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { storage } from "../configs/firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const EditDiary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: diaryData, loading } = useQuery(GET_DIARY_DETAIL, {
    variables: { id: id },
  });

  const [editDiary] = useMutation(UPDATE_DIARY);

  const [data, setData] = useState({});

  console.log(data);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setData({ ...data, foto: downloadURL });
      });
    });
  };

  const handleEditorChange = (editorState) => {
    setData({ ...data, isi: editorState });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editDiary({
      variables: {
        id: data.id,
        isi: data.isi,
        judul: data.judul,
        foto: data.foto,
      },
    });

    navigate("/dashboard");
    Swal.fire({
      title: "Success",
      text: "Diari berhasil diedit!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  useEffect(() => {
    setData({ ...diaryData?.diari[0] });
  }, [diaryData?.diari]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
    <Helmet>
        <title>Diariku - Edit Diari</title>
        <meta name="description" content="Edit diari" />
      </Helmet>
    <div className="container">
      <div className="flex items-center flex-col">
        <Link to="/dashboard" className="self-start">
          <p className="px-3 py-5 lg:px-0 lg:py-5 underline">{"<- Back to Dashboard"}</p>
        </Link>
        <h1 className="pt-5 pb-5 font-bold">Edit Diari</h1>
        <form onSubmit={handleSubmit} className="w-[80vw] md:w-[50vw] pb-24">
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Judul" />
              </div>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                name="judul"
                value={data.judul}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="base" value="Isi" />
              </div>
              <MDEditor
                value={data.isi}
                onChange={handleEditorChange}
                data-color-mode="light"
                preview="edit"
                className="bg-slate-500"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="base" value="Foto" />
              </div>
              <FileInput
                id="base"
                type="text"
                sizing="md"
                name="foto"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleUploadChange}
              />
              {!!data?.foto && (
                <div className="flex gap-5 items-center py-4">
                  <p>foto saat ini:</p>
                  <img src={data.foto} alt="" width={100} />
                </div>
              )}
            </div>
          </div>
          <div className="input-group mt-10">
            <Button color={"dark"} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditDiary;
