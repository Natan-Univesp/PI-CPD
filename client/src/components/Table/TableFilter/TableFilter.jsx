import PropTypes from "prop-types";

import TableDefault from "../TableDefault/TableDefault";
import { FilterBar } from "../../FilterBar/FilterBar";
import { useModal } from "../../../Context/ModalContext";

export default function TableFilter({
   fieldCollection,
   dataCollection,
   filterType = "",
   searchFilter,
   setSearchFilter,
   filterParams,
   setFilterParams,
}) {
   const { showModal } = useModal();

   return (
      <>
         <FilterBar
            hasFilterButton={true}
            searchValue={searchFilter}
            setSearchValue={setSearchFilter}
            handleOpenFilter={() =>
               showModal({
                  modalName: filterType,
                  customStyle: {
                     maxWidth: "530px",
                  },
                  data: {
                    filterParams,
                    setFilterParams
                  }
               })
            }
         />
         <TableDefault fieldCollection={fieldCollection} dataCollection={dataCollection} />
      </>
   );
}

TableFilter.propTypes = {
   fieldCollection: PropTypes.array,
   dataCollection: PropTypes.array,
   filterType: PropTypes.string,
   searchFilter: PropTypes.string,
   setSearchFilter: PropTypes.func,
   filterParams: PropTypes.object,
   setFilterParams: PropTypes.func,
};
