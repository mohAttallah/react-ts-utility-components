import React from 'react';
import moment from 'moment';
import CalendarButton from "./Components/AddToCalender";
import MapComponent from './Components/Maps';
function App() {


  return (
    <div className="App">
      <MapComponent />
      <CalendarButton />

    </div>
  );
}

export default App;
