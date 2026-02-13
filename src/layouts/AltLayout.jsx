import HeaderAlt from "/components/HeaderAlt";

export default function AltLayout({ children }) {
    return (
        <>
            <HeaderAlt />
            <main>{children}</main>
        </>
    );
}