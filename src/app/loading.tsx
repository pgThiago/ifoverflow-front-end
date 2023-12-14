"use client";

import { Dna } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Dna
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loading;
