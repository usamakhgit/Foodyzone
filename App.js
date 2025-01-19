import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './Components/Login';
import Main from './Components/Main';
import { Data } from './Data';
import { useState } from 'react';

const getUniqueCategories = (data) => {
  const categories= data.map(item => item.category);
  return["All",...new Set(categories)];
}

function App(){
  const[selectedCategory, setSelectedCategory]= useState('All');
  const[search, setSearch]= useState('');
  const categories= getUniqueCategories(Data);

  const handleCategoryChange= (category) =>{
    setSelectedCategory(category);
  } 

  const handleSearchChange= (term) =>{
    setSearch(term);
    setCurrentpage(1);
  }

  const filteredData = Data.filter(data =>{
    return(selectedCategory === "All" || data.category === selectedCategory )
    &&
    data.heading.toLowerCase().includes(search.toLowerCase())
  });


  const [currentPage, setCurrentpage]= useState(1);
  const recordsPerPage= 6;
  const lastIndex= currentPage * recordsPerPage;
  const firstIndex= lastIndex - recordsPerPage;
  const currentRecords= filteredData.slice(firstIndex, lastIndex);
  const nPage= Math.ceil(filteredData.length / recordsPerPage);
  const numbers= [...Array(nPage+1).keys()].slice(1);

  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path='/' element={<Navigate to='/Login'/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Main' 
      element={<Main 
      records={currentRecords} 
      numbers={numbers} 
      nPage={nPage}
      currentPage={currentPage}
      setCurrentpage={setCurrentpage}
      categories={categories}
      onCategoryChange={handleCategoryChange}
      onSearchChange={handleSearchChange}
      />}/>
      </Routes>
      </Router>
    </div>
  );
}
export default App;
