import React from 'react';
import { Link } from 'react-router-dom';

import { OompaLoompa } from '../../types';

const OompaLoompaCard: React.FC<{ oompaLoompa: OompaLoompa }> = ({ oompaLoompa }) => {
  const { id, first_name, last_name, image, gender, profession } = oompaLoompa;

  return (
    <div className="flex flex-col rounded-2xl w-auto bg-[#ffffff] shadow-xl cursor-pointer">
      <Link to={`/oompaLoompa/${id}`}>
        <figure className="flex justify-center items-center rounded-2xl">
          <img src={image} alt="Card Preview" className="rounded-t-2xl" />
        </figure>
        <div className="flex flex-col p-6">
          <div className="text-xl font-bold text-[#374151] pb-2">
            {first_name} {last_name}
          </div>
          <div className=" text-lg text-[#374151] pb-2">{gender === 'F' ? 'Woman' : 'Man'}</div>
          <div className=" text-lg text-[#374151] italic">{profession}</div>
        </div>
      </Link>
    </div>
  );
};

export default OompaLoompaCard;
