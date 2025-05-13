import PropTypes from 'prop-types';
import TCell from '../TCell/TCell';
import ButtonTable from '../../ButtonTable/ButtonTable';

export default function TBody({dataInfo, btnInfoCollection = [], customInfo = {}}) {
    return (
        <tr>
            {Object.entries(dataInfo).map(([key, value], index) =>
                (key !== "_id" && key !== "id") && (
                    <TCell 
                        key={index} 
                        indexValue={index} 
                        fieldName={key} 
                        fieldValue={value} 
                        customInfo={customInfo} 
                    />
                )
            )}
            {btnInfoCollection.length > 0 &&
                <td>
                    <div className="tableContent__btns">
                        {btnInfoCollection.map(btnInfo => (
                            <ButtonTable 
                                key={btnInfo.id} 
                                infoView={btnInfo.infoView} 
                                classBtn={btnInfo.className} 
                                handleAction={() => btnInfo.handleAction(dataInfo)} 
                            />
                        ))}
                    </div>
                </td>
            }
        </tr>
    );
}



TBody.propTypes = {
    dataInfo: PropTypes.object,
    btnInfoCollection: PropTypes.array,
    customInfo: PropTypes.object
}