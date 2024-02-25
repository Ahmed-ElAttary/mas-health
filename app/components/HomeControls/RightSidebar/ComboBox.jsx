import { Dropdown } from "primereact/dropdown";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@app/home/DataProvider.jsx";
const ComboBox = ({
  id,
  label,
  searchParams,
  reload,
  reloadHandler,
  filter_id,
  column,
  dependancy,
}) => {
  const { lookups } = useContext(DataContext);
  const [value, setValue] = useState();

  const [options, setOptions] = useState();

  const optionsHandler = () => {

    setOptions(
      lookups?.current[id]
        ?.filter((el) => {
          if (dependancy) {
            return searchParams.current[dependancy]
              ? el?.[dependancy] == searchParams.current[dependancy]?.code
              : false;
          } else return true;
        })
        .map((el) => {
          return {
            name: String(el[column]),
            code: String(el.id),
            [dependancy]: el[dependancy],
          };
        })
    );
  };
  useEffect(() => {
    if (dependancy && !searchParams.current[dependancy]) {
      searchParams.current[filter_id] = undefined;
    }
    if (dependancy && searchParams.current[filter_id]) {
      if (
        searchParams.current[dependancy]?.code !=
        searchParams.current[filter_id][dependancy]
      ) {
        searchParams.current[filter_id] = undefined;
      }
    }
    optionsHandler();
    setValue(searchParams.current[filter_id]);
  }, [reload]);
  return (
    <>
      <span className="p-float-label">
        <Dropdown
          inputId={id}
          value={value}
          onChange={(e) => {
            setValue(e.value);
            searchParams.current[filter_id] = e.value;
            reloadHandler();
          }}
          options={options}
          emptyMessage="لا يوجد"
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
