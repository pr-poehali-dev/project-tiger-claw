import { useState } from "react";

const PASSWORD = "18759mgj8650jhgtt";
const STORAGE_KEY = "site_access";

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(STORAGE_KEY) === "1");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
          YandexGPT
        </h1>
        <form onSubmit={handleSubmit} className="bg-card/50 border border-accent/20 rounded-2xl p-8 space-y-4">
          <p className="text-sm text-muted-foreground text-center">Введите пароль для доступа</p>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Пароль"
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-background border border-accent/20 focus:border-accent/60 outline-none text-white placeholder:text-muted-foreground transition-colors"
          />
          {error && <p className="text-sm text-red-400 text-center">Неверный пароль</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-accent to-accent/80 text-black rounded-xl font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;
