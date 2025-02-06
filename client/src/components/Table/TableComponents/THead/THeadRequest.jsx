import Proptypes from 'prop-types';

export default function THeadRequest({dataRequest, fieldName, hasActionBtn}) {
    const maxColumn = fieldName.length;
    return(
        <>
            <tr className={"tableHeader"}>
                <td colSpan={maxColumn + 1}>
                    <div className={"generalInfo__container"}>
                        <div className={"splitContainer"}>
                            <div className={"generalInfo__content"}>
                                <span>Solicitante:</span>
                                <p>{dataRequest.nome_solicitante}</p>
                            </div>
                            <div className={"generalInfo__content"}>
                                <span>Setor:</span>
                                <p>{dataRequest.setor}</p>
                            </div>
                            <div className={"generalInfo__content"}>
                                <span>Local:</span>
                                <p>{dataRequest.local}</p>
                            </div>
                            <div className={"generalInfo__content"}>
                                <span>Solicitado em:</span>
                                <p>{dataRequest.data_solicitacao}</p>
                            </div>
                        </div>
                        <div className={"splitContainer"}>
                            <button className={"generalInfo__Btn"}>Retirar Todos os Suprimentos Prontos</button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                {fieldName.map((field, index) => <th key={index}>{field}</th>)}
                {hasActionBtn && <th className={"tableContent__actionTitle"}>Ações</th>}
            </tr>
        </>
    )
}

THeadRequest.propTypes = {
    dataRequest: Proptypes.object,
    fieldName: Proptypes.array,
    hasActionBtn: Proptypes.bool
}