import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
const ComboBox = ({ id, label, searchParams,reload }) => {
  const [value, setValue] = useState();
  const [options, setOptions] = useState(
    id == "gov"
      ? [{ name: "القاهرة", code: "القاهرة" }]:null
  );
  useEffect(()=>{
    setValue(searchParams.current[id])
  },[reload])
  return (
    <>
      <span className="p-float-label">
        <Dropdown
          inputId={id}
          value={value}
          onChange={(e) => {
            setValue(e.value);
            searchParams.current[id] = e.value;
          }}
          options={options}
          optionLabel="name"
          className="w-full"
          showClear
        />
        <label htmlFor={id}>{label}</label>
      </span>
    </>
  );
};

export default ComboBox;
