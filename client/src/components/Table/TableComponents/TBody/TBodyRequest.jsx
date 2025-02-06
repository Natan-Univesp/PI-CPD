import PropTypes from 'prop-types';
import TCell from '../TCell/TCell';
import ButtonTable from '../../ButtonTable/ButtonTable';

//Icones
import { FaTrash as IconReturn} from "react-icons/fa";

export default function TBodyRequest({dataInfo, customInfo = {}}) {

    return(
        <tr id={dataInfo._id}>
            {Object.entries(dataInfo).map(([key, value], index) =>
                key !== "_id" &&
                    <TCell key={index}
                           indexValue={index}
                           fieldName={key}
                           fieldValue={value}
                           customInfo={customInfo}/>
            )}
            <td className={"tableContent__btns"}>
                <ButtonTable infoView={"Retirar Suprimento"} 
                             classBtn={dataInfo.status === 2 ? "inactiveBtn" : "acceptBtn"} 
                             handleAction={() => "Produto Retirado"}/>
                <ButtonTable infoView={<IconReturn/>} 
                             classBtn={"delBtn"} 
                             handleAction={() => "Produto Retornado"}/>
            </td>
        </tr>
    )
}


TBodyRequest.propTypes = {
    dataInfo: PropTypes.object,
    customInfo: PropTypes.object
}