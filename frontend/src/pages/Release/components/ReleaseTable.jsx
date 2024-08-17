const ReleaseTable = () => {
  return (
    <div className='text-white border bg-cards1 overflow-auto mb-5 border-slate-500 rounded-lg'>
      <table className='w-full md:min-w-full min-w-[600px] '>
        <thead>
          <tr className='bo   bg-[#002B5E]  border-slate-00'>
            <th className=' p-3 pl-9 bodrder-r '>Name</th>
            <th className='p-3 pl-9 bordder-r '>Type</th>
            <th className=' bordern-r '>Statuses</th>
            <th className=' '>Date</th>
          </tr>
        </thead>
        <tbody className='text-slate-300 text-center font-[200]'>
          <tr className='bo  '>
            <td className='mt-2 p-2'>Name</td>
            <td className=' p-2'>Dataset</td>
            <td className=' p-2'>Published</td>
            <td className=' p-2 '>8/15/17</td>
          </tr>
          <tr className='bo  '>
            <td className=' p-2'>Name</td>
            <td className=' p-2'>Dataset</td>
            <td className=' p-2'>Published</td>
            <td className=' p-2 '>8/15/17</td>
          </tr>
          <tr className='bo  '>
            <td className=' p-2'>Name</td>
            <td className=' p-2'>Dataset</td>
            <td className=' p-2'>Published</td>
            <td className=' p-2 '>8/15/17</td>
          </tr>
          <tr className='bo  '>
            <td className=' p-2'>Name</td>
            <td className=' p-2'>Dataset</td>
            <td className=' p-2'>Published</td>
            <td className=' p-2 '>8/15/17</td>
          </tr>
          <tr className='bo  '>
            <td className=' p-2'>Name</td>
            <td className=' p-2'>Dataset</td>
            <td className=' p-2'>Published</td>
            <td className=' p-2 '>8/15/17</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReleaseTable;
