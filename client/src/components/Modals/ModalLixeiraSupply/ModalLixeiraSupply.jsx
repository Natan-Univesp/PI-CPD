import PropTypes from "prop-types";
import { TableTrash } from "../../Table/TableTrash/TableTrash";

export function ModalLixeiraSupply() {
    const fieldNameCollection = ["Modelo", "Marca", "Tipo", "Data de Remoção"];
    const lixeiraCollection = [
        {
            _id: 1,
            modelo: "D111",
            marca: "Samsung",
            tipo: "Toner",
            data_remocao: "01/01/2025"
        },
        {
            _id: 2,
            modelo: "TN580",
            marca: "Brother",
            tipo: "Toner",
            data_remocao: "01/01/2025"
        },
        {
            _id: 3,
            modelo: "D116",
            marca: "Samsung",
            tipo: "Toner",
            data_remocao: "01/01/2025"
        },
        {
            _id: 4,
            modelo: "D111",
            marca: "Samsung",
            tipo: "Toner",
            data_remocao: "01/01/2025"
        },
        {
            _id: 5,
            modelo: "TN580",
            marca: "Brother",
            tipo: "Toner",
            data_remocao: "01/01/2025"
        },
        {
            _id: 6,
            modelo: "D116",
            marca: "Samsung",
            tipo: "Toner",
            data_remocao: "01/01/2025"
        },
        {
            _id: 7,
            modelo: "D111",
            marca: "Samsung",
            tipo: "Toner",
            data_remocao: "01/01/2025"
        },
        {
            _id: 8,
            modelo: "TN580",
            marca: "Brother",
            tipo: "Toner",
            data_remocao: "01/01/2025"
        },
        {
            _id: 9,
            modelo: "D116",
            marca: "Samsung",
            tipo: "Toner",
            data_remocao: "01/01/2025"
        }
    ]

    return(
        <TableTrash fieldCollection={fieldNameCollection} dataCollection={lixeiraCollection}/>
    )
}