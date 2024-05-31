import { Link, useParams } from "react-router-dom";

export function BreadCrumbs({breadData}){
    const {id} = useParams();

    return (
        <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
            {breadData.map(item => ( 
                <div key={item.name} className="text-black opacity-50 text-xs">
                    {item.name!=="Article title"}
                  <Link to={item.name!=="Article title" ? item.link: `/blog/${id}`}>{item.name}</Link>
                  <span className="px-3">/</span>
                </div>
             ))}
        </div>
    );

}