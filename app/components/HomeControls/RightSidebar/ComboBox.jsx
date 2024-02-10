import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
const ComboBox = ({ id, label, searchParams }) => {
  const [value, setValue] = useState();
  const [options, setOptions] = useState(
    id == "gov"
      ? [{ name: "القاهرة", code: "القاهرة" }]
      : [{ name: "جهة 1", code: "جهة 1" }]
  );
  return (
    <>
      <span className="p-float-label">
        <Dropdown
          inputId={id}
          value={value}
          onChange={(e) => {
            setValue(e.value);
            searchParams.current[id] = e.value?.name;
          }}
          options={options}
          optionLabel="name"
          className="w-full md:w-14rem"
          showClear
        />
        <label htmlFor={id}>{label}</label>
      </span>
    </>
  );
};

export default ComboBox;
