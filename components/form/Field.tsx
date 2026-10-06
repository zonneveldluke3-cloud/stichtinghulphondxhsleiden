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
        type={def.type}
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
