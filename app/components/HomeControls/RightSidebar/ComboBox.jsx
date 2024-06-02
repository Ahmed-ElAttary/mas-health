import { Dropdown } from "primereact/dropdown";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@app/home/DataProvider.jsx";
import { MultiSelect } from "primereact/multiselect";
const ComboBox = ({
  id,
  label,
  searchParams,
  reload,
  reloadHandler,
  filter_id,
  column,
  dependancy,
  autoComplete,
}) => {
  const { lookups } = useContext(DataContext);
  const [value, setValue] = useState();

  const [options, setOptions] = useState();

  const optionsHandler = () => {
    let opts = [];
    if (lookups?.current[id]) {
      const lookup = Array.isArray(lookups?.current[id])
        ? lookups?.current[id]
        : [];

      opts = lookup
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
        });
    }
    setOptions(opts);
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

    // if (multi) {
    //   setValue(
    //     searchParams.current[filter_id]?.code.map((el) => {
    //       return { name: el, code: el };
    //     })
    //   );
    //   // setValue(searchParams.current[filter_id]);
    // } else {
    setValue(searchParams.current[filter_id]);
    // }
  }, [reload]);
  return (
    <>
      <span className="p-float-label">
        {/* {multi ? (
          <MultiSelect
            value={value}
            onChange={(e) => {
              setValue(e.value);
              // console.log(e.value.map((el) => el.code));
              console.log(e.value);
              searchParams.current[filter_id] = {
                code: e.value.map((el) => el.code),
              };
              // reloadHandler(multi);
            }}
            options={options}
            emptyMessage="لا يوجد"
            optionLabel="name"
            className="w-full"
            // showClear
            filter
            maxSelectedLabels={3}
          />
        ) : ( */}
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
          filter={autoComplete}
        />
        {/* )} */}

        <label htmlFor={id}>{label}</label>
      </span>
    </>
  );
};

export default ComboBox;
