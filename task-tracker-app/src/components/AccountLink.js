import {Link} from 'react-router-dom'
const AccountLink = ({text,TexttoLink,href}) =>{
    return(
        <div>
            <label>{text}</label>
            <Link to={href}>
                <label>{TexttoLink}</label>
            </Link>
        </div>
    )
}
export default AccountLink