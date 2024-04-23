import Navbar from "../Components/Navbar"
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-gray-100">
            <Navbar />
            {children}
        </div>
    )
}

export default layout