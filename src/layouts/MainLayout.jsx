import HeaderMain from "/components/HeaderMain";

export default function MainLayout({ children }) {
    return (
        <>
            <HeaderMain />
            <main>{children}</main>
        </>
    );
}