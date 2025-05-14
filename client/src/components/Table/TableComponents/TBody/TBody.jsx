import PropTypes from 'prop-types';
import TCell from '../TCell/TCell';
import ButtonTable from '../../ButtonTable/ButtonTable';

export default function TBody({dataInfo, btnInfoCollection = [], fieldsExcludes = []}) {

    return(
        <tr id={dataInfo.id}>
            {Object.entries(dataInfo).map(([key, value], index) => {
                if (!fieldsExcludes.includes(key)) {
                    return (
                        <TCell
                            key={index}
                            indexValue={index}
                            fieldValue={value}
                        />
                    );
                }
            })}
            {btnInfoCollection.length > 0 && 
                <td>
                    <div className={"tableContent__btns"}>
                        {btnInfoCollection.map(btnInfo => <ButtonTable key={btnInfo.id} infoView={btnInfo.infoView} classBtn={btnInfo.className} handleAction={btnInfo.handleAction}/>)}
                    </div>
                </td>
            }
        </tr>
    )
}

TBody.propTypes = {
    dataInfo: PropTypes.object,
    btnInfoCollection: PropTypes.array,
    fieldsExcludes: PropTypes.array
}