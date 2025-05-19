import { useState } from "react";
import { useAuth } from "@/components/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            login();
        }
    };

    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-gray-100">
            <div className="h-[45px] w-full bg-[#ff4410] text-white py-2 text-center">
                <p>
                    Demo aplikácia pre GymBeam – 2025
                </p>
            </div>

            <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md w-full max-w-lg">
                    <h2 className="text-[#ff4410] text-xl font-bold mb-6 text-left">Prihlásenie užívateľa</h2>
                    <p className="text-left pb-2">E-mail</p>
                    <input
                        type="email"
                        title="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border-2 border-black"
                    />
                    <p className="text-left pb-2">Heslo</p>
                    <input
                        type="password"
                        title="Heslo"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-6 px-4 py-2 border-2 border-black"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#ff4410] text-white font-medium text-[1.1rem] py-2 transition-colors duration-[500ms] hover:bg-[#cc3400]"
                    >
                        PRIHLÁSIŤ
                    </button>
                </form>
            </div>
        </div>
    );
}
