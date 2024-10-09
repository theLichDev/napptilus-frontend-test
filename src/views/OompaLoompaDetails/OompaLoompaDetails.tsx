import React from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { useGetOompaLoompaByIdQuery } from '../../services/oompaLoompa';

const OompaLoompaDetails: React.FC = () => {
  const { id = '' } = useParams();

  const { data, error, isLoading } = useGetOompaLoompaByIdQuery(id, {
    skip: !id,
    pollingInterval: 24 * 60 * 60 * 1000, // 24 hours
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Oompa Loompa details</div>;

  const sanitizedHtmlContent = DOMPurify.sanitize(data?.description || '');

  return (
    <div className="flex flex-col md:flex-row">
      <img src={data?.image} className="p-4 w-full md:w-3/6" alt="OompaLoompa User" />
      <div className="flex flex-col p-4 w-full md:w-3/6">
        <span className="text-xl font-bold text-[#374151]">
          {data?.first_name} {data?.last_name}
        </span>
        <span className="text-[#374151]">{data?.gender === 'F' ? 'Woman' : 'Man'}</span>
        <span className="text-[#374151] italic mb-4">{data?.profession}</span>
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
      </div>
    </div>
  );
};

export default OompaLoompaDetails;
