
export default function TabButton({ children, isSelected, ...rest }) {

    return (
        <li>
            <button className={isSelected ? "active" : ""} {...rest}>{children}</button>
        </li>
    );
}