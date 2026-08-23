import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, User, Mail, Lock } from "lucide-react";

import {
    AuthShell,
    AuthField,
    AuthPrimaryButton,
    AuthErrorBanner
} from "@/components/auth/AuthhShell";

import AILogo from "@/components/layout/AILogo";
import { useAuth } from "@/context/AuthContext";

export default function Register() {

    const { register } = useAuth();
    const nav = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();

        setErr("");
        setLoading(true);

        try {
            await register(form);
            nav("/dashboard");
        } catch (err) {
            setErr(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthShell
            headline={
                <>
                    Your resume
                    <br />
                    <em style={{ fontStyle: "italic" }}>
                        Intelligently sharpened.
                    </em>
                </>
            }
            subhead="Drop your PDF, get an ATS score, fix what's weak, and land interviews — powered by AI."
        >

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1]
                }}
            >

                <AILogo size={48} />

                <h1>Get started</h1>

                <p>
                    Free to start. No credit card required.
                </p>

                <form onSubmit={onSubmit}>

                    <AuthField
                        label="Full name"
                        value={form.name}
                        onChange={(v) =>
                            setForm({ ...form, name: v })
                        }
                        placeholder="Your name"
                        icon={User}
                    />

                    <AuthField
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(v) =>
                            setForm({ ...form, email: v })
                        }
                        placeholder="you@example.com"
                        icon={Mail}
                    />

                    <AuthField
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={(v) =>
                            setForm({ ...form, password: v })
                        }
                        placeholder="At least 8 characters"
                        icon={Lock}
                    />

                    <AuthErrorBanner>
                        {err}
                    </AuthErrorBanner>

                    <AuthPrimaryButton
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={15} />
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create account
                                <ArrowRight size={15} />
                            </>
                        )}
                    </AuthPrimaryButton>

                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Sign in
                    </Link>
                </p>

            </motion.div>

        </AuthShell>
    );
}
