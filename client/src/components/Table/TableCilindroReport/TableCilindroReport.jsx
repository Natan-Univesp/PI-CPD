import TableDefault from "../TableDefault/TableDefault";

export function TableCilindroReport() {
    const fieldNamecollection = [
        "Retirado Por", 
        "Solicitante", 
        "Setor", 
        "Local", 
        "Suprimento", 
        "Quantidade", 
        "Data de Retirada"
    ];

    const exDataCollection = [
        {
            id: 1,
            "Retirado Por": "ROBERTO",
            "Solicitante": "ESCOLA XYZ",
            "Setor": "SECRETARIA",
            "Local": "JARDIM SOL NASCENTE",
            "Suprimento": "BETA",
            "Quantidade": 1,
            "Data de Retirada": "01/02/2025"
        },
        {
            id: 2,
            "Retirado Por": "MARCOS",
            "Solicitante": "CRECHE ALEGRIA",
            "Setor": "COZINHA",
            "Local": "JARDIM LUZ",
            "Suprimento": "GAMA",
            "Quantidade": 2,
            "Data de Retirada": "05/02/2025"
        }
    ];

    return (
        <TableDefault
            fieldCollection={fieldNamecollection}
            dataCollection={exDataCollection}
        />
    );
}
