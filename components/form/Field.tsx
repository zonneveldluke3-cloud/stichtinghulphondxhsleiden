import type { FieldDef } from "@/config/registration";
import { AlertIcon } from "@/components/ui/icons";

export function fieldId(path: string) {
  return `f-${path.replace(/\./g, "-")}`;
}

export function Field({
  def,
  path,
  value,
  error,
  onChange,
}: {
  def: FieldDef;
  path: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const id = fieldId(path);
  const errorId = `${id}-error`;

  if (def.type === "select" && def.options) {
    return (
      <div className="sm:col-span-2">
        <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
          <span id={`${id}-label`} className="text-[15px] font-semibold text-ink">
            {def.label}
            {def.required && <span className="text-court" aria-hidden> *</span>}
          </span>
          <a href="#niveaus" className="text-sm font-semibold text-court underline underline-offset-2 hover:text-ink">
            Welk niveau past bij ons?
          </a>
        </div>
        <div
          role="radiogroup"
          aria-labelledby={`${id}-label`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="grid grid-cols-3 gap-2"
        >
          {def.options.map((opt, i) => {
            const checked = value === opt.value;
            return (
              <button
                key={opt.value}
                id={i === 0 ? id : undefined}
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() => onChange(opt.value)}
                className={`rounded-xl border px-2 py-3 text-sm font-bold transition sm:text-base ${
                  checked
                    ? "border-ink bg-ink text-white"
                    : error
                      ? "border-danger bg-white text-ink hover:bg-sand"
                      : "border-ink/15 bg-white text-ink hover:border-court hover:bg-sand"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={def.fullWidth ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="mb-1.5 block text-[15px] font-semibold text-ink">
        {def.label}
        {def.required ? (
          <span className="text-court" aria-hidden> *</span>
        ) : (
          <span className="font-normal text-ink/45"> (optioneel)</span>
        )}
      </label>
      <input
        id={id}
        name={path}
        type={def.type === "select" ? "text" : def.type}
        inputMode={def.type === "tel" ? "tel" : def.type === "email" ? "email" : undefined}
        autoComplete={def.autoComplete}
        placeholder={def.placeholder}
        maxLength={def.maxLength}
        required={def.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink shadow-sm transition placeholder:text-ink/35 focus:outline-none focus:ring-4 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/15"
            : "border-ink/15 focus:border-court focus:ring-court/15"
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
