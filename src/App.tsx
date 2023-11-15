import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface User {
  name: {
    first: string;
    last: string;
  };
  picture: any;
  email: any;
  phone: any;
  // Include other properties you need from the API
};                                       

const RandomUserPaginationSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=${resultsPerPage}&page=${page}`);
        setUsers(response.data.results);
        // console.log(response.data)


        // while (true) {
        //   const response1 = await fetch(`https://randomuser.me/api/?page=${page}`);
        //   const data: any = await response1.json();
          
        //   var totalUsers : any
        //   // If there are no more results, break the loop
        //   if (data.info.results === 0) {
        //     break;
        //   }
    
        //   totalUsers += data.info.results;
        //   //page++;
        // }
    
        // console.log(totalUsers.results.length);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page, resultsPerPage]);

  const handlePagination = (newPage: number) => {
    setPage(newPage);
  };

  const handleResultsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResultsPerPage(parseInt(e.target.value, 10));
    setPage(1); // Reset to first page when changing results per page
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className='header'>
      <h2>Car Wash Customer List</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className='searchField'
        />
        <select value={resultsPerPage} onChange={handleResultsPerPageChange}>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={30}>30 per page</option>
        </select>
      </div>
      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index}>
            <div className='user'>
            <div>
            <img src={user.picture.medium} alt='User Pic' className='userImage' /><br />
            </div>
            <div className='userDetails'>
            <b>{user.name.first} {user.name.last}</b><br />
            {user.phone}<br />
            {user.email}<br />
            {/* {user.registered.date} */}
            </div>
            </div>
            <br />
          </li>
        ))}
      </ul>
      <div className='pagination'>
      <div className='pagination_details'>
          {resultsPerPage} Users on Page {page}
      </div>

      <div className='pagination_button'>
      <button onClick={() => handlePagination(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => handlePagination(page + 1)}>
        Next
      </button>
      </div>
      </div>
    </div>
  );
};

export default RandomUserPaginationSearch;








// //import * as React from 'react';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './style.css';
// import UserContactList from './Components/UserContactList';
// import useContactList from './CustomHooks/useContactList';
// import Header from './Components/Header';
// import Paginator from './Components/Paginator';

// export default function App() {

//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('')



//   useEffect(() => {  
//     const fetchData = async () => {
//       const response = await axios.get(`https://randomuser.me/api/?results=30&page=${currentPage}&q=${searchQuery}`);
//       setData(response.data);
//     };
  
//       fetchData();
//     }, [currentPage, searchQuery]);
   
//     const handlePageChange = (page) => {
//       setCurrentPage(page);
//     };
  
//     const handleSearchChange = (query) => {
//       setSearchQuery(query);
//       setCurrentPage(1);
//     };
  

// //https://randomuser.me/api/?_results
// //https://randomuser.me/api/?results=${resultsPerPage}&page=${page}
// //https://randomuser.me/api/?results=30&page=1
//   const {
//     hasNextPage,
//     hasPrevPage,
//     contactList,
//     isSyncing,
//     prevPage,
//     nextPage,
//     sync,
//     currentPageList,
//     page,
//     onFilter,
//     totalPages,
//   } = useContactList();

//   return (
//     <div>
//       <Header isSyncing={isSyncing} sync={sync} onFilter={onFilter} />
//       {/* Do not edit test id in below div, it's added for testing purpose */}
//       <div data-testid='user-contact-list-wrapper'>
//         <UserContactList listId='page' contactList={currentPageList} />
//       </div>
//       <Paginator
//         hasPrevPage={hasPrevPage}
//         prevPage={prevPage}
//         hasNextPage={hasNextPage}
//         nextPage={nextPage}
//         page={page}
//         totalPages={totalPages}
//       />

// <input type="text" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>
//             {item.name}<br />
//             {item.email}<br />
//             {item.picture}<br />
//             {item.phone}<br />
//             {item.registered.date}<br />
//           </li>
//         ))}
//       </ul>
//       <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
//       <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>



// {/* <h1>Data</h1>
//       <input type="text" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//       <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
//       <button onClick={() => handlePageChange(currentPage + 1)}>Next</button> */}





//     </div>
//   );
// }