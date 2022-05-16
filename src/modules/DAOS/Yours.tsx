import React, { FC, useState } from "react";
import GalleryRowHeader from "components/Gallery/GalleryRowHeader";
import GalleryRowHeader1 from "components/Gallery/GalleryRowHeader1";
import DaoCard from "components/Cards/Dao";
import { YOUR_DAO, YOUR_UNIONS, DISCOVER } from "data/daos";
import SearchInput from "components/SearchInput";
import { useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { apiCaller } from "utils/fetcher";

const fetchDaos = async ({
  term,
  member,
  onSuccess,
  onError,
  onFinally,
}: {
  term?: string;
  member?: Boolean;
  onSuccess: (daos: [any]) => void;
  onError: (e: any) => void;
  onFinally: () => void;
}) => {
  try {
    let params = new URLSearchParams();
    if (term) params.set("term", term);
    if (member) params.set("member", member.toString());
    const {
      data: { daos },
    } = await apiCaller.get("/daos?" + params.toString());
    onSuccess(daos);
  } catch (err) {
    onError(err);
  }
  onFinally();
};

const YourDaos = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [daos, setDaos] = useState<any>([]);
  const fetchFunction = () =>
    fetchDaos({
      member: true,
      onSuccess: (daos) => setDaos(daos),
      onError: () => setError(true),
      onFinally: () => setLoading(false),
    });

  useEffect(() => {
    fetchFunction();
  }, []);

  const Header = () => (
    <GalleryRowHeader
      title="Your DAOs"
      detail="In a goldberg Polyhedron there are 12 pentagons, those will be the community leaders, so choose carefully! They can be single members, or other DAOs"
    />
  );

  if (loading) {
    return (
      <>
        <Header />
        <div className="alert alert-info">Loading Your DAOs...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="alert alert-error">Error Loading Your DAOs</div>
      </>
    );
  }

  if (daos.length == 0) {
    return (
      <>
        <Header />
        <div className="alert alert-warning">You are not part of any DAOs</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-5 gap-3">
        {daos.length > 0 &&
          daos.map((dao, index) => <DaoCard key={index} {...dao} />)}
      </div>
    </>
  );
};

const YourUnions = () => {
  return (
    <>
      <GalleryRowHeader
        title="Your DAOs"
        detail="In a goldberg Polyhedron there are 12 pentagons, those will be the community leaders, so choose carefully! They can be single members, or other DAOs"
      />
      <div className="grid grid-cols-5 gap-3">
        {YOUR_DAO.map((dao, index) => (
          <DaoCard key={index} {...dao} />
        ))}
      </div>
    </>
  );
};

const AllDaos: FC<{ initialDaos: [any] }> = ({ initialDaos }) => {
  const [term, setTerm] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [daos, setDaos] = useState(initialDaos);
  const logged = useSelector((state: RootStateOrAny) => state.auth.logged);

  const fetchFunction = () =>
    fetchDaos({
      term,
      onSuccess: (daos) => setDaos(daos),
      onError: () => setError(true),
      onFinally: () => setLoading(false),
    });

  useEffect(() => {
    setError(false);
    const timer = setTimeout(() => {
      setLoading(true);
      fetchFunction();
    }, 500);
    return () => clearTimeout(timer);
  }, [term]);

  const display = (() => {
    if (loading) {
      return <div className="alert alert-info">Searching for DAOs...</div>;
    }
    if (error) {
      return <div className="alert alert-error">Error fetching DAOs...</div>;
    }
    if (daos.length <= 0) {
      return (
        <div className="alert alert-warning">
          No DAOs exist {term && "matching the search term"}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-5 gap-3">
        {daos.map((dao: any, index: number) => (
          <DaoCard key={index} {...dao} />
        ))}
      </div>
    );
  })();

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Discover New DAOs</span>
        <div className="flex gap-4">
          <div className="w-[350px]">
            <SearchInput
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onSubmit={fetchFunction}
            />
          </div>
          {logged && (
            <button className="rounded-full btn btn-secondary">
              Create DAO
            </button>
          )}
        </div>
      </div>
      {display}
    </>
  );
};

const Yours: FC<{ daos: any }> = ({ daos }) => {
  const logged = useSelector((state: RootStateOrAny) => state.auth.logged);

  return (
    <div className="flex flex-col mb-10 -mt-4 gap-7">
      {logged && (
        <>
          <YourDaos />
          {/* <YourUnions /> */}
        </>
      )}
      <AllDaos initialDaos={daos} />
    </div>
  );
};

export default Yours;
