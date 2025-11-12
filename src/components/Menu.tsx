import {FIRST_PAGE, SECOND_PAGE, THIRD_PAGE} from './Links';
import { useNavigate } from "react-router-dom";

export default function Menu() {
    const navigate = useNavigate()

    const handleClick = (page: string) => {
        navigate(page);
    }
    return (
        <div className="Menu">
            <ul>
                <li>
                    <a href="/">Index</a>
                </li>
                <li>
                    <a onClick={() => handleClick(FIRST_PAGE)}>{FIRST_PAGE}</a>
                </li>
                <li>
                    <a onClick={() => handleClick(SECOND_PAGE)}>{SECOND_PAGE}</a>
                </li>
                <li>
                    <a onClick={() => handleClick(THIRD_PAGE)}>{THIRD_PAGE}</a>
                </li>
                <li>
                    <a href="/unknown">Unknown</a>
                </li>
            </ul>
        </div>
    );
}
