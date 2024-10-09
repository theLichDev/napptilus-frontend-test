import React, { useEffect, UIEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, setOompaLoompas, setLastPageFetched } from '../../store';
import { useGetOompaLoompasQuery } from '../../services/oompaLoompa';
import OompaLoompaCard from '../../components/OompaLoompaCard/OompaLoompaCard';
import Spinner from '../../components/Spinner/Spinner';
import SearchIcon from '../../assets/img/ic_search.png';

const OompaLoompaList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const oompaLoompas = useSelector((state: RootState) => state.oompaLoompas.list);
  const lastPageFetched = useSelector((state: RootState) => state.oompaLoompas.lastPageFetched);

  const { data, error, isFetching, isLoading } = useGetOompaLoompasQuery(lastPageFetched, {
    pollingInterval: 24 * 60 * 60 * 1000, // 24 hours
  });

  useEffect(() => {
    if (data) {
      dispatch(setOompaLoompas(data.results));
    }
  }, [data, dispatch]);

  const filteredOompaLoompas = oompaLoompas.filter(
    (oompaLoompa) =>
      !searchTerm ||
      `${oompaLoompa.first_name} ${oompaLoompa.last_name}`.toLowerCase().includes(searchTerm) ||
      oompaLoompa.profession.toLowerCase().includes(searchTerm)
  );

  const scrollHandler = (event: UIEvent) => {
    const element = event.target as HTMLDivElement;
    if (!isFetching && Math.ceil(element.scrollHeight - element.scrollTop) <= element.clientHeight + 10) {
      dispatch(setLastPageFetched(lastPageFetched + 1));
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Oompa Loompas</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center my-6">
        <span className="text-2xl font-bold mb-2">Find your Oompa Loompa</span>
        <span>There are more than 100k</span>
        <div className="relative w-64 sm:w-96">
          <input
            className="w-full my-6 px-3.5 py-2.5 rounded-lg border focus:outline-slate-500 border-slate-400"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
          <img src={SearchIcon} alt="Search Icon" className="absolute top-[2.375rem] right-5 w-4" draggable={false} />
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 max-h-[calc(100vh-13.375)] overflow-auto px-12 pb-40"
        onScroll={scrollHandler}
      >
        {filteredOompaLoompas.map((oompaLoompa) => (
          <OompaLoompaCard oompaLoompa={oompaLoompa} key={oompaLoompa.id} />
        ))}
        {isFetching && <Spinner className="absolute bottom-[5%] right-2/4 col-span-3 flex justify-center" />}
      </div>
    </div>
  );
};

export default OompaLoompaList;
