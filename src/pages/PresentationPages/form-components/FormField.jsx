import { motion } from "framer-motion";
import { itemVariants } from "../../../utils/motionVariants";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";

export default function FormField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  options,
  required = false,
  hint,
}) {
  return (
    <motion.div className="space-y-2" variants={itemVariants}>
      <label htmlFor={name} className="text-right block font-medium text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "text" && (
        <Input
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-amber-500"
          dir="rtl"
          required={required}
        />
      )}

      {type === "textarea" && (
        <textarea
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          dir="rtl"
          required={required}
        />
      )}

      {type === "select" && options && (
          <Select
            value={value}
            onValueChange={onChange}
            dir="rtl"
            required={required}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      )}

      {hint && (
        <p className="text-sm text-muted-foreground text-right">{hint}</p>
      )}
    </motion.div>
  );
}
