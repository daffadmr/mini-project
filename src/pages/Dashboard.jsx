import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";
import DiaryCard from "../components/Card/DiaryCard";
import UserCard from "../components/Card/UserCard";
import LoadingPage from "../components/Loading/LoadingPage";
import LoadingComponent from "../components/Loading/LoadingComponent";
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { Button } from "flowbite-react";
import { useState } from "react";
import { DELETE_DIARY } from "../graphql/mutations";
import { FILTER_DIARY, GET_USER, SEARCH_DIARY } from "../graphql/queries";
import { DIARY_USER_SUBS } from "../graphql/subscriptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [showScrollButton, setScrollButton] = useState(false);
  const userId = Cookies.get("userId");

  const { loading, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const [filterDiary, { data: filterData, loading: filterLoading }] =
    useLazyQuery(FILTER_DIARY);

  const [searchDiary, { data: searchData, loading: searchLoading }] =
    useLazyQuery(SEARCH_DIARY);

  const { data: dataDiary, loading: subsLoading } = useSubscription(
    DIARY_USER_SUBS,
    {
      variables: {
        user_id: userId,
      },
    }
  );

  const [deleteDiary] = useMutation(DELETE_DIARY);

  const userData = { ...data?.user[0] };

  const { username, avatar } = userData;

  const handleChange = (date) => {
    if (date) {
      date.setHours((-1 * date.getTimezoneOffset()) / 60);
    }
    setDate(date);
    filterDiary({ variables: { tanggal: date, user_id: userId } });
  };

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
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchDiarys = (e) => {
    e.preventDefault();
    searchDiary({
      variables: {
        user_id: userId,
        input: `%${search}%`,
      },
    });
  };

  useEffect(() => {
    const handleScrollButton = () => {
      window.pageYOffset > 100 ? setScrollButton(true) : setScrollButton(false);
    };

    window.addEventListener("scroll", handleScrollButton);

    return () => {
      window.removeEventListener("scroll", handleScrollButton);
    };
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>Diariku - Dashboard</title>
        <meta name="description" content="Dashboard diariku untuk mengatur diari" />
      </Helmet>
      <div className="bg-slate-100">
        <div className="container flex flex-col lg:flex-row gap-10 lg:justify-center text-justify py-10 md:p-10 relative min-h-[698px] overflow-x-hidden">
          <UserCard avatar={avatar} username={username} />
          <div className="pt-0 px-5 md:px-0 flex flex-col gap-5 w-full lg:max-w-xl xl:max-w-3xl">
            <div className="flex justify-between">
              <ReactDatePicker
                selected={date}
                onChange={handleChange}
                dateFormat="d/MM/yyyy"
                className="w-[130px] rounded-lg border border-slate-300 py-1 px-5 text-sm justify-self-end"
                placeholderText={"Filter by Date"}
              />
              <button
                className="w-[100px] text-white text-sm bg-gray-800 border border-transparent hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 disabled:hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 dark:disabled:hover:bg-gray-800 group flex h-min items-center justify-center p-1 text-center font-medium focus:z-10 rounded-lg"
                onClick={() => window.location.reload(false)}
              >
                Show All
              </button>
            </div>
            <form onSubmit={searchDiarys} className="flex">
              <input
                type="text"
                className="rounded-r-none rounded-l-lg bg-gray-50 border border-slate-300 text-gray-900 focus:ring-blue-500 block flex-1 text-sm p-2.5  w-full lg:max-w-xl xl:max-w-3xl"
                placeholder="Search Diari"
                onChange={handleChangeSearch}
                value={search}
              />
              <Button type="submit" color="dark" className="rounded-l-none">
                <FontAwesomeIcon icon={faSearch} className="p-1" />
              </Button>
            </form>
            {searchLoading ? (
              <LoadingComponent />
            ) : searchData ? (
              searchData?.diari.length === 0 ? (
                <div className="h-[600px] flex flex-col items-center pt-24 md:pt-0 md:justify-center">
                  <p>Tidak ada diari</p>
                </div>
              ) : (
                searchData?.diari.map(
                  ({ id, judul, isi, tanggal, foto }) => {
                    return (
                      <DiaryCard
                        loading={searchLoading}
                        deleteDiaryById={deleteDiaryById}
                        key={id}
                        id={id}
                        judul={judul}
                        isi={isi}
                        tanggal={tanggal}
                        foto={foto}
                      />
                    );
                  }
                )
              )
            ) : filterLoading ? (
              <LoadingComponent />
            ) : filterData?.diari.length === 0 ? (
              <div className="h-[600px] flex flex-col items-center pt-24 md:pt-0 md:justify-center">
                <p>Tidak ada diari</p>
              </div>
            ) : filterData ? (
              filterData?.diari.map(({ id, judul, isi, tanggal, foto }) => {
                return (
                  <DiaryCard
                    loading={searchLoading}
                    deleteDiaryById={deleteDiaryById}
                    key={id}
                    id={id}
                    judul={judul}
                    isi={isi}
                    tanggal={tanggal}
                    foto={foto}
                  />
                );
              })
            ) : subsLoading ? (
              <LoadingComponent />
            ) : dataDiary.diari.length === 0 ? (
              <div className="h-[600px] flex flex-col items-center pt-24 md:pt-0 md:justify-center">
                <p>Tidak ada diari</p>
              </div>
            ) : (
              dataDiary?.diari.map(({ id, judul, isi,created_at, tanggal, foto }) => {
                return (
                  <DiaryCard
                    loading={searchLoading}
                    deleteDiaryById={deleteDiaryById}
                    key={id}
                    id={id}
                    judul={judul}
                    isi={isi}
                    created_at={created_at}
                    tanggal={tanggal}
                    foto={foto}
                  />
                );
              })
            )}
          </div>
          <button
        className={`${
          showScrollButton ? "fixed" : "hidden"
        } rounded-lg p-4 bottom-[40px] right-[40px] bg-gray-900 text-white`}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        <FontAwesomeIcon icon={faArrowUp}/>
      </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
