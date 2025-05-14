import PropTypes from "prop-types";

//Componentes
import TableFilter from "../Table/TableFilter/TableFilter";
import { useState } from "react";
import { searchFilterRetiradaSupply } from "../../utils/SearchFilterUtil";

export default function SupplyReport({ subTitle = "", supplyDataCollection = [], filterParams, setFilterParams }) {
    const [searchFilter, setSearchFilter] = useState("");
    const supplyFieldCollection = [
        "ID",
        "Retirado por",
        "Solicitado por",
        "Setor",
        "Local",
        "Marca",
        "Modelo",
        "Qtd Solicitada",
        "Data de Retirada"
    ];

    return (
        <>
            <h2 className="subTitle">{subTitle}</h2>
            <TableFilter
                fieldCollection={supplyFieldCollection}
                dataCollection={searchFilterRetiradaSupply(supplyDataCollection, searchFilter)}
                filterType="filterDefault"
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
                filterParams={filterParams}
                setFilterParams={setFilterParams}
            />
        </>
    );
}

SupplyReport.propTypes = {
    subTitle: PropTypes.string,
    supplyDataCollection: PropTypes.array,
    filterParams: PropTypes.object,
    setFilterParams: PropTypes.func
};
