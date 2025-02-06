import PropTypes from "prop-types";
import InfoExtra from "../InfosExtras/InfoExtra";

export default function MainLayout({title, infoExtraData, customStyle = null, children}) {
    return(
        <section className={customStyle ? customStyle : ""}>
            <h1 className="mainTitle">{title}</h1>
            <InfoExtra infoBoxExtra={infoExtraData}/>
            {children}
        </section>
    )
}

MainLayout.propTypes = {
    title: PropTypes.string,
    infoExtraData: PropTypes.array,
    customStyle: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
}