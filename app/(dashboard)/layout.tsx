import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-gray-50">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default layout