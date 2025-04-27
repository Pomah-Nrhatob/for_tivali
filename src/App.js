import { useState } from "react";
import "./App.css";
import Multiselect from "./components/Multiselect/Multiselect";
import { data } from "./data";

function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const onSelectionChange = (selectedOptionsList) => {
    setSelectedOptions(selectedOptionsList);
    alert(
      `На сервер отправлены выбранные опции: ${
        selectedOptionsList.length > 0
          ? selectedOptionsList.map((option) => {
              return " " + option.value;
            })
          : "без опций"
      }`
    );
  };

  return (
    <div className="App">
      <Multiselect
        placeholder="Выбери города"
        selectedOptions={selectedOptions}
        options={data}
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
}

export default App;
